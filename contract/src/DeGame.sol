// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract DeGame {
    uint public constant DICE_NUMBER = 3;

    struct Turn {
        address player;
        uint16 nbDice;
        uint16 dieValue;
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

    uint256 private nonce = 0;
    mapping(uint256 => Game) public games;
    mapping(uint256 => mapping(address => uint8[])) private playerDice;

    function createGame() public returns (uint256) {
        uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce++)));
        games[id].owner = msg.sender;
        games[id].alivePlayers.push(msg.sender);
        playerDice[id][msg.sender] = new uint8[](DICE_NUMBER);

        return id;
    }

    function joinGame(uint256 gameId) public {
        Game storage game = games[gameId];
        require(game.owner != address(0), "Game does not exist");
        require(game.rounds.length == 0, "Game already started");
        require(playerDice[game.id][msg.sender].length == 0, "Already joined");
        game.alivePlayers.push(msg.sender);
        playerDice[game.id][msg.sender] = new uint8[](DICE_NUMBER);
    }

    function startGame(uint256 gameId) public {
        Game storage game = games[gameId];
        require(game.owner != address(0), "Game does not exist");
        require(game.owner == msg.sender, "Only the owner can start the game");
        require(game.rounds.length == 0, "Game already started");
        require(game.alivePlayers.length > 1, "Not enough players");

        startTurn(game);
    }

    function makeDiceCall(uint256 gameId, uint16 nbDice, uint8 dieValue) public {
        Game storage game = games[gameId];
        ensureCanPlay(game);
        require(dieValue >= 1 && dieValue <= 6, "Die value must be between 1 and 6");
        require(nbDice > 0, "Number of dice must be greater than 0");

        Round storage lastRound = game.rounds[game.rounds.length - 1];
        Turn storage lastTurn = lastRound.turns[lastRound.turns.length - 1];
        require(nbDice > lastTurn.nbDice || dieValue > lastTurn.dieValue, "You must increase the number of dice or the die value");

        lastRound.turns.push(Turn(msg.sender, nbDice, dieValue));
        game.turnPlayerIndex = uint8((game.turnPlayerIndex + 1) % game.alivePlayers.length);
    }

    function makeLiarCall(uint256 gameId) public {
        Game storage game = games[gameId];
        ensureCanPlay(game);

        Round storage lastRound = game.rounds[game.rounds.length - 1];
        Turn storage lastTurn = lastRound.turns[lastRound.turns.length - 1];

        endTurn(game, isLiar(game, lastTurn.nbDice, lastTurn.dieValue));
    }

    function isLiar(Game storage game, uint16 nbDice, uint16 dieValue) private view returns (bool) {
        uint16 count = 0;
        for (uint8 i = 0; i < game.alivePlayers.length && count < nbDice; i++) {
            for (uint j = 0; j < DICE_NUMBER && count < nbDice; j++) {
                if (playerDice[game.id][game.alivePlayers[i]][j] == dieValue) {
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

    function ensureCanPlay(Game storage game) private view {
        require(game.owner != address(0), "Game does not exist");
        require(game.rounds.length > 0, "Game not started");
        require(game.alivePlayers.length > 1, "Game ended");
        require(game.alivePlayers[game.turnPlayerIndex] == msg.sender, "Not your turn");
    }

    function startTurn(Game storage game) private {
        game.rounds.push();
        // TODO: Implement Inco random
        for (uint8 i = 0; i < game.alivePlayers.length; i++) {
            for (uint j = 0; j < DICE_NUMBER; j++) {
                playerDice[game.id][game.alivePlayers[i]][j] = 1;
            }
        }
    }

    function endTurn(Game storage game, bool liar) private {
        uint8 loserPlayerIndex = liar ? getPreviousPlayer(game) : game.turnPlayerIndex;
        bool eliminated = playerDice[game.id][game.alivePlayers[loserPlayerIndex]].length == 0;

        playerDice[game.id][game.alivePlayers[loserPlayerIndex]].pop();
        if (eliminated) {
            game.alivePlayers[loserPlayerIndex] = game.alivePlayers[game.alivePlayers.length - 1];
            game.alivePlayers.pop();
            game.turnPlayerIndex = uint8(loserPlayerIndex % game.alivePlayers.length);
        } else if (liar) {
            game.turnPlayerIndex = loserPlayerIndex;
        }

        if (game.alivePlayers.length > 1) {
            startTurn(game);
        } else {
            // TODO: Submit win event
        }
    }
}
