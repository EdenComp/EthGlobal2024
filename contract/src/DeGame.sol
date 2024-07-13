// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "fhevm/lib/Impl.sol";
import "fhevm/lib/TFHE.sol";

contract DeGame {
    uint public constant DICE_NUMBER = 3;

    struct Turn {
        address player;
        uint16 nbDice;
        uint8 dieValue;
    }

    struct Round {
        Turn[] turns;
    }

    struct Game {
        uint256 id;
        address owner;
        address[] alivePlayers;
        uint8 turnPlayerIndex;
        Round[] rounds;
    }

    event GameStarted(uint256 gameId);
    event TurnStarted(uint256 gameId);
    event DiceCallMade(uint256 gameId, address player, uint16 nbDice, uint8 dieValue);
    event LiarCallMade(uint256 gameId, address player, uint16 nbDice, uint8 dieValue);
    event TurnEnded(uint256 gameId, address loser);
    event GameEnded(uint256 gameId, address winner);

    uint256 private nonce = 0;
    mapping(uint256 => Game) public games;
    mapping(uint256 => mapping(address => euint8[])) private playerDice;
    mapping(address => bytes32) private publicKeys;

    function createGame(bytes calldata publicKey) public returns (uint256) {
        uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce++)));
        games[id].owner = msg.sender;
        games[id].alivePlayers.push(msg.sender);
        playerDice[id][msg.sender] = new euint8[](DICE_NUMBER);
        publicKeys[msg.sender] = bytesToBytes32(publicKey);

        return id;
    }

    function joinGame(uint256 gameId, bytes calldata publicKey) public {
        Game storage game = games[gameId];
        require(game.owner != address(0), "Game does not exist");
        require(game.rounds.length == 0, "Game already started");
        require(playerDice[game.id][msg.sender].length == 0, "Already joined");
        game.alivePlayers.push(msg.sender);
        playerDice[game.id][msg.sender] = new euint8[](DICE_NUMBER);
        publicKeys[msg.sender] = bytesToBytes32(publicKey);
    }

    function startGame(uint256 gameId) public {
        Game storage game = games[gameId];
        require(game.owner != address(0), "Game does not exist");
        require(game.owner == msg.sender, "Only the owner can start the game");
        require(game.rounds.length == 0, "Game already started");
        require(game.alivePlayers.length > 1, "Not enough players");

        emit GameStarted(game.id);
        startTurn(game);
    }

    function makeDiceCall(uint256 gameId, uint16 nbDice, uint8 dieValue) public turnBased(gameId) {
        Game storage game = games[gameId];
        require(dieValue >= 1 && dieValue <= 6, "Die value must be between 1 and 6");
        require(nbDice > 0, "Number of dice must be greater than 0");

        Round storage lastRound = game.rounds[game.rounds.length - 1];
        Turn storage lastTurn = lastRound.turns[lastRound.turns.length - 1];
        require(nbDice > lastTurn.nbDice || dieValue > lastTurn.dieValue, "You must increase the number of dice or the die value");

        lastRound.turns.push(Turn(msg.sender, nbDice, dieValue));
        game.turnPlayerIndex = uint8((game.turnPlayerIndex + 1) % game.alivePlayers.length);
        emit DiceCallMade(game.id, msg.sender, nbDice, dieValue);
    }

    function makeLiarCall(uint256 gameId) public turnBased(gameId) {
        Game storage game = games[gameId];
        Round storage lastRound = game.rounds[game.rounds.length - 1];
        Turn storage lastTurn = lastRound.turns[lastRound.turns.length - 1];

        endTurn(game, isLiar(game, lastTurn.nbDice, lastTurn.dieValue));
        emit LiarCallMade(game.id, msg.sender, lastTurn.nbDice, lastTurn.dieValue);
    }

    function isLiar(Game storage game, uint16 nbDice, uint16 dieValue) private view returns (bool) {
        uint16 count = 0;
        for (uint8 i = 0; i < game.alivePlayers.length && count < nbDice; i++) {
            uint8 playerDiceCount = uint8(playerDice[game.id][game.alivePlayers[i]].length);
            for (uint j = 0; j < playerDiceCount && count < nbDice; j++) {
                uint8 currentDieValue = uint8(TFHE.decrypt(playerDice[game.id][game.alivePlayers[i]][j]));
                if (currentDieValue == dieValue) {
                    count++;
                }
            }
        }
        return count < nbDice;
    }

    function getNextPlayer(Game storage game) private view returns (uint8) {
        // TODO: Can be enhanced?
        uint16 index = uint16(game.turnPlayerIndex + 1);
        return uint8(index % game.alivePlayers.length);
    }

    function getPreviousPlayer(Game storage game) private view returns (uint8) {
        // TODO: Can be enhanced?
        uint16 index = uint16(game.turnPlayerIndex + game.alivePlayers.length - 1);
        return uint8(index % game.alivePlayers.length);
    }

    modifier turnBased(uint256 gameId) {
        Game storage game = games[gameId];
        require(game.owner != address(0), "Game does not exist");
        require(game.rounds.length > 0, "Game not started");
        require(game.alivePlayers.length > 1, "Game ended");
        require(game.alivePlayers[game.turnPlayerIndex] == msg.sender, "Not your turn");
        _;
    }

    function startTurn(Game storage game) private {
        game.rounds.push();
        for (uint8 i = 0; i < game.alivePlayers.length; i++) {
            uint8 playerDiceCount = uint8(playerDice[game.id][game.alivePlayers[i]].length);
            for (uint j = 0; j < playerDiceCount; j++) {
                euint8 dieValue = TFHE.add(TFHE.randEuint8(6), 1);
                playerDice[game.id][game.alivePlayers[i]][j] = dieValue;
                Impl.reencrypt(euint8.unwrap(dieValue), publicKeys[game.alivePlayers[i]]);
            }
        }

        emit TurnStarted(game.id);
    }

    function endTurn(Game storage game, bool liar) private {
        uint8 loserPlayerIndex = liar ? getPreviousPlayer(game) : game.turnPlayerIndex;
        bool eliminated = playerDice[game.id][game.alivePlayers[loserPlayerIndex]].length == 0;

        emit TurnEnded(game.id, game.alivePlayers[loserPlayerIndex]);
        playerDice[game.id][game.alivePlayers[loserPlayerIndex]].pop();
        if (eliminated) {
            removePlayer(game, loserPlayerIndex);
            game.turnPlayerIndex = uint8(loserPlayerIndex % game.alivePlayers.length);
        } else if (liar) {
            game.turnPlayerIndex = loserPlayerIndex;
        }

        if (game.alivePlayers.length > 1) {
            startTurn(game);
        } else {
            emit GameEnded(game.id, game.alivePlayers[0]);
        }
    }

    function removePlayer(Game storage game, uint8 index) private {
        for (uint i = index; i < game.alivePlayers.length-1; i++){
            game.alivePlayers[i] = game.alivePlayers[i + 1];
        }
        delete game.alivePlayers[game.alivePlayers.length - 1];
    }

    function bytesToBytes32(bytes calldata b) private pure returns (bytes32) {
        bytes32 out;

        for (uint i = 0; i < 32; i++) {
            out |= bytes32(b[i] & 0xFF) >> (i * 8);
        }
        return out;
    }
}
