// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {DeGame} from "../src/DeGame.sol";

contract Player {

    function createGameAsPlayer(DeGame game) public {
        game.createGame();
    }

    function joinAsPlayer(
        DeGame game,
        uint256 gameId
    ) public {
        game.joinGame(gameId);
    }

    function makeDiceCallAsPlayer(DeGame game, uint16 nbDice, uint8 dieValue) public {
        game.makeDiceCall(nbDice, dieValue);
    }

    function makeLiarCallAsPlayer(DeGame game) public {
        game.makeLiarCall();
    }

    function leaveAsPlayer(DeGame game) public {
        game.leaveGame();
    }

}

contract DeGameTest is Test {
    DeGame public deGame;

    function setUp() public {
        deGame = new DeGame();
        deGame.createGame();
    }

    function test_CreateGame() public {
        Player owner1 = new Player();
        Player owner2 = new Player();

        assertEq(deGame.getAvailableGames().length, 1);
        owner1.createGameAsPlayer(deGame);
        assertEq(deGame.getAvailableGames().length, 2);
        owner2.createGameAsPlayer(deGame);
        assertEq(deGame.getAvailableGames().length, 3);
    }

    function test_JoinGame() public {
        DeGame.Game memory game;
        uint256 idGame;
        Player player1 = new Player();
        Player player2 = new Player();
        Player player3 = new Player();

        idGame = deGame.getAvailableGames()[0].id;
        game = deGame.getGame(idGame);
        assertEq(game.alivePlayers.length, 1);
        player1.joinAsPlayer(deGame, idGame);
        player2.joinAsPlayer(deGame, idGame);
        player3.joinAsPlayer(deGame, idGame);
        game = deGame.getGame(idGame);
        assertEq(game.alivePlayers.length, 4);
    }

    function test_LeaveGame() public {
        Player pl = new Player();
        uint256 idGame = deGame.getAvailableGames()[0].id;
        DeGame.Game memory game;

        pl.joinAsPlayer(deGame, idGame);
        game = deGame.getGame(idGame);
        assertEq(game.alivePlayers.length, 2);
        pl.leaveAsPlayer(deGame);
        game = deGame.getGame(idGame);
        assertEq(game.alivePlayers.length, 1);
    }
}
