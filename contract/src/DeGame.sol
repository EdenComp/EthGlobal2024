// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "fhevm/abstracts/EIP712WithModifier.sol";
import "fhevm/lib/TFHE.sol";

contract DeGame is EIP712WithModifier {
    struct Turn {
        address player;
        uint16 nbDice;
        uint8 dieValue;
    }

    struct Round {
        Turn[] turns;
        bool liar;
    }

    struct Game {
        uint256 id;
        address owner;
        address[] alivePlayers;
        uint8 turnPlayerIndex;
        uint16 roundNumber;
        uint16 turnNumber;
        Round[] rounds;
    }

    struct AvailableGame {
        uint256 id;
        address owner;
        uint8 playerCount;
    }

    event GameCreated(uint256 gameId, address owner);
    event GameUpdated(uint256 gameId, uint8 playerCount);
    event GameStarted(uint256 gameId);
    event TurnStarted(uint256 gameId);
    event DiceCallMade(uint256 gameId, address player, uint16 nbDice, uint8 dieValue);
    event LiarCallMade(uint256 gameId, address player, uint16 nbDice, uint8 dieValue, bool liar);
    event TurnEnded(uint256 gameId, address loser);
    event GameEnded(uint256 gameId, address winner);

    uint public constant DICE_NUMBER = 3;

    uint256[] public gameIds;
    mapping(uint256 => Game) public games;
    mapping(address => uint256) public playerGame;

    uint256 private nonce = 0;
    mapping(address => euint8[]) private playerDice;

    constructor() EIP712WithModifier("DeGame", "1") {}

    function getAvailableGames() public view returns (AvailableGame[] memory) {
        AvailableGame[] memory availableGames = new AvailableGame[](gameIds.length);
        uint index = 0;

        for (uint i = 0; i < gameIds.length; i++) {
            Game memory game = games[gameIds[i]];
            if (game.roundNumber == 0) {
                availableGames[index] = AvailableGame(game.id, game.owner, uint8(game.alivePlayers.length));
                index++;
            }
        }
        return availableGames;
    }

    function getGame(uint256 gameId) public view returns (Game memory) {
        return games[gameId];
    }

    function getPlayerGame(address addr) public view returns (Game memory) {
        return games[playerGame[addr]];
    }

    function getDice(uint256 gameId, bytes32 publicKey, bytes calldata signature) public view onlySignedPublicKey(publicKey, signature) returns (bytes[] memory) {
        Game storage game = games[gameId];
        require(game.owner != address(0), "Game does not exist");
        require(game.roundNumber > 0, "Game did not start");
        require(game.alivePlayers.length > 1, "Game ended");
        require(playerDice[msg.sender].length > 0, "You are not in the game");

        bytes[] memory dice = new bytes[](playerDice[msg.sender].length);
        for (uint i = 0; i < playerDice[msg.sender].length; i++) {
            dice[i] = TFHE.reencrypt(playerDice[msg.sender][i], publicKey);
        }
        return dice;
    }

    function createGame() public {
        require(playerGame[msg.sender] == 0, "You are already in a game");

        uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce++)));
        gameIds.push(id);
        games[id].id = id;
        games[id].owner = msg.sender;
        games[id].alivePlayers.push(msg.sender);
        playerGame[msg.sender] = id;

        emit GameCreated(id, msg.sender);
    }

    function joinGame(uint256 gameId) public {
        require(playerGame[msg.sender] == 0, "You are already in a game");
        Game storage game = games[gameId];
        require(game.owner != address(0), "Game does not exist");
        require(game.roundNumber == 0, "Game already started");
        require(playerDice[msg.sender].length == 0, "Already joined");

        game.alivePlayers.push(msg.sender);
        playerGame[msg.sender] = game.id;

        emit GameUpdated(game.id, uint8(game.alivePlayers.length));
    }

    function leaveGame() public inGame {
        // TODO: Can leave a game that has started?
        require(playerGame[msg.sender] != 0, "You are not in a game");

        Game storage game = games[playerGame[msg.sender]];
        require(game.roundNumber == 0, "Game already started");
        require(game.owner != msg.sender, "The owner cannot leave the game");
        require(game.roundNumber == 0, "The game has already started");

        delete playerGame[msg.sender];
        for (uint8 i = 0; i < game.alivePlayers.length; i++) {
            if (game.alivePlayers[i] == msg.sender) {
                removePlayer(game, i);
                break;
            }
        }
        emit GameUpdated(game.id, uint8(game.alivePlayers.length));
    }

    function startGame() public inGame {
        Game storage game = games[playerGame[msg.sender]];
        require(game.owner == msg.sender, "Only the owner can start the game");
        require(game.roundNumber == 0, "Game already started");
        require(game.alivePlayers.length > 1, "Not enough players");

        for (uint8 i = 0; i < game.alivePlayers.length; i++) {
            playerDice[game.alivePlayers[i]] = new euint8[](DICE_NUMBER);
        }

        emit GameStarted(game.id);
        startTurn(game);
    }

    function makeDiceCall(uint16 nbDice, uint8 dieValue) public inGame turnBased {
        Game storage game = games[playerGame[msg.sender]];
        require(dieValue >= 1 && dieValue <= 6, "Die value must be between 1 and 6");
        require(nbDice > 0, "Number of dice must be greater than 0");

        Round storage lastRound = game.rounds[game.rounds.length - 1];
        if (game.turnNumber > 0) {
            Turn storage lastTurn = lastRound.turns[game.turnNumber - 1];
            require(nbDice > lastTurn.nbDice || dieValue > lastTurn.dieValue, "You must increase the number of dice or the die value");
        }

        game.rounds[game.roundNumber - 1].turns[game.turnNumber - 1] = Turn(msg.sender, nbDice, dieValue);
        game.turnNumber += 1;
        game.turnPlayerIndex = uint8((game.turnPlayerIndex + 1) % game.alivePlayers.length);
        emit DiceCallMade(game.id, msg.sender, nbDice, dieValue);
    }

    function makeLiarCall() public inGame turnBased {
        Game storage game = games[playerGame[msg.sender]];
        require (game.turnNumber > 0, "You must make a dice call first");

        Turn storage lastTurn = game.rounds[game.roundNumber - 1].turns[game.turnNumber - 1];
        bool liar = isLiar(game, lastTurn.nbDice, lastTurn.dieValue);
        game.rounds[game.roundNumber - 1].liar = liar;

        emit LiarCallMade(game.id, msg.sender, lastTurn.nbDice, lastTurn.dieValue, liar);
        endTurn(game, liar);
    }

    function isLiar(Game storage game, uint16 nbDice, uint16 dieValue) private view returns (bool) {
        uint16 count = 0;
        for (uint8 i = 0; i < game.alivePlayers.length && count < nbDice; i++) {
            uint8 playerDiceCount = uint8(playerDice[game.alivePlayers[i]].length);
            for (uint j = 0; j < playerDiceCount && count < nbDice; j++) {
                uint8 currentDieValue = uint8(TFHE.decrypt(playerDice[game.alivePlayers[i]][j]));
                if (currentDieValue == dieValue) {
                    count++;
                }
            }
        }
        return count < nbDice;
    }

    function getNextPlayer(Game storage game) private view returns (uint8) {
        uint16 index = uint16(game.turnPlayerIndex + 1);
        return uint8(index % game.alivePlayers.length);
    }

    function getPreviousPlayer(Game storage game) private view returns (uint8) {
        uint16 index = uint16(game.turnPlayerIndex + game.alivePlayers.length - 1);
        return uint8(index % game.alivePlayers.length);
    }

    modifier inGame() {
        require(playerGame[msg.sender] != 0, "You are not in a game");
        _;
    }

    modifier turnBased() {
        Game storage game = games[playerGame[msg.sender]];
        require(game.roundNumber > 0, "Game not started");
        require(game.alivePlayers.length > 1, "Game ended");
        // TODO: Specific time to play
        require(game.alivePlayers[game.turnPlayerIndex] == msg.sender, "Not your turn");
        _;
    }

    function startTurn(Game storage game) private {
        game.roundNumber += 1;
        game.turnNumber = 0;

        for (uint8 i = 0; i < game.alivePlayers.length; i++) {
            for (uint j = 0; j < playerDice[game.alivePlayers[i]].length; j++) {
                playerDice[game.alivePlayers[i]][j] = TFHE.add(TFHE.rem(TFHE.randEuint8(), 6), TFHE.asEuint8(1));
            }
        }

        emit TurnStarted(game.id);
    }

    function endTurn(Game storage game, bool liar) private {
        uint8 loserPlayerIndex = liar ? getPreviousPlayer(game) : game.turnPlayerIndex;
        bool eliminated = playerDice[game.alivePlayers[loserPlayerIndex]].length == 0;

        emit TurnEnded(game.id, game.alivePlayers[loserPlayerIndex]);
        playerDice[game.alivePlayers[loserPlayerIndex]].pop();
        if (eliminated) {
            delete playerGame[game.alivePlayers[loserPlayerIndex]];
            removePlayer(game, loserPlayerIndex);
            game.turnPlayerIndex = uint8(loserPlayerIndex % game.alivePlayers.length);
        } else if (liar) {
            game.turnPlayerIndex = loserPlayerIndex;
        }

        if (game.alivePlayers.length > 1) {
            startTurn(game);
        } else {
            emit GameEnded(game.id, game.alivePlayers[0]);
            delete playerGame[game.alivePlayers[0]];
        }
    }

    function removePlayer(Game storage game, uint8 index) private {
        for (uint i = index; i < game.alivePlayers.length-1; i++) {
            game.alivePlayers[i] = game.alivePlayers[i + 1];
        }
        game.alivePlayers.pop();
    }

    function bytesToBytes32(bytes calldata b) private pure returns (bytes32) {
        bytes32 out;

        for (uint i = 0; i < 32; i++) {
            out |= bytes32(b[i] & 0xFF) >> (i * 8);
        }
        return out;
    }
}
