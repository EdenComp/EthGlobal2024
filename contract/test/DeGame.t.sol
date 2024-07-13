// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {DeGame} from "../src/DeGame.sol";

contract Player {
    function joinAsPlayer(
        DeGame game,
        uint256 gameId,
        bytes calldata publicKey
    ) public {
        game.joinGame(gameId, publicKey);
    }
}

contract DeGameTest is Test {
    DeGame public deGame;

    function setUp() public {
        deGame = new DeGame();
        deGame.createGame();
    }

    function test_CreateGame() public {
        assertEq(deGame.getAvailableGames().length, 1);
        deGame.createGame();
        assertEq(deGame.getAvailableGames().length, 2);
        deGame.createGame();
        assertEq(deGame.getAvailableGames().length, 3);
    }

    function test_JoinGame() public {
        DeGame.Game memory game;
        uint256 idGame;
        Player player1 = new Player();
        Player player2 = new Player();
        Player player3 = new Player();

        idGame = deGame.getAvailableGames()[0];
        game = deGame.getGame(idGame);
        assertEq(game.alivePlayers.length, 1);
        player1.joinAsPlayer(deGame, idGame, "7afWWaYpFwnJtfFEH5iog4wc3ySaGbbX");
        player2.joinAsPlayer(deGame, idGame, "iNaoc7zGopJEX7Rar6VUbYHYatvq3DJv");
        player3.joinAsPlayer(deGame, idGame, "vj9B68HkdgGenGPmGLo2yVmfzXaBw7xP");
        game = deGame.getGame(idGame);
        assertEq(game.alivePlayers.length, 4);
    }

    function test_JoinNonExistentGame() public {
        // TODO
    }

    function test_JoinAlreadyJoinedGame() public {
        // TODO
    }

    function test_StartGame() public {
        DeGame.Game memory game;
        Player ply1 = new Player();
        Player ply2 = new Player();
        uint256 idGame = deGame.getAvailableGames()[0];

        ply1.joinAsPlayer(deGame, idGame, "7afWWaYpFwnJtfFEH5iog4wc3ySaGbbX");
        ply2.joinAsPlayer(deGame, idGame, "iNaoc7zGopJEX7Rar6VUbYHYatvq3DJv");
        game = deGame.getGame(idGame);
        assertEq(game.rounds.length, 0);
        deGame.startGame(idGame);
        assertEq(game.rounds.length, 1);
    }

    function test_StartGameInsufficientPlayers() public {
        // TODO: fix problem with vm.expectRevert();
        // deGame.startGame(deGame.getAvailableGames()[0]);
    }
}
