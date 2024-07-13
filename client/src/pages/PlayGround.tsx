import Dice1 from "@/assets/Dice/Dice-1.png";
import Dice2 from "@/assets/Dice/Dice-2.png";
import Dice3 from "@/assets/Dice/Dice-3.png";
import Dice4 from "@/assets/Dice/Dice-4.png";
import Dice5 from "@/assets/Dice/Dice-5.png";
import Dice6 from "@/assets/Dice/Dice-6.png";
import DiceU from "@/assets/Dice/Dice-unknown.png";
import Button from "@/components/ui/Button.tsx";
import type { ReactElement } from "react";
import { useState } from "react";
import { Simulate } from "react-dom/test-utils";
import play = Simulate.play;

const diceImages = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, DiceU];

interface Opponent {
	name: string;
	dices: number[];
}

export default function Playground(): ReactElement {
	const playerName = "aTom.Inc";
	const players = [
		{
			name: "aTom.Inc",
			dices: [2, 6, 4, 4, 3],
		},
		{
			name: "Gontrant",
			dices: [2, 1, 6],
		},
		{
			name: "Sylvain",
			dices: [3, 2],
		},
		{
			name: "Jean",
			dices: [1, 4, 1, 6, 2],
		},
	];
	const [displayedPlayers, setDisplayedPlayers] = useState([
		players[players.length - 2],
		players[players.length - 1],
		players[0],
		players[1],
		players[2],
	]);
	const [currentPlayer, setCurrentPlayer] = useState(0);

	const updateCurrentPlayer = (i: number) => {
		setCurrentPlayer((prev) => (prev + i + players.length) % players.length);
		const newDisplayedPlayers = [];
		if (i > 0) {
			for (let j = 1; j < 5; j++) {
				newDisplayedPlayers.push(
					players[(currentPlayer + j + 1) % players.length],
				);
			}
			newDisplayedPlayers.push(players[currentPlayer]);
		}
		setDisplayedPlayers(newDisplayedPlayers);
	};

	return (
		<div className="relative h-screen min-w-screen flex flex-col items-center justify-center bg-background-tertiary overflow-hidden">
			<div className={"flex h-[50%] w-full"}>
				{/* MENU */}
				<div className={"w-[25%] h-full p-8"}>
					<div
						className={
							"bg-neutral-grey_1 rounded-2xl size-full p-8 flex flex-col items-center"
						}
					>
						<Button
							onClick={() => {
								updateCurrentPlayer(1);
							}}
						>
							{"Suivant"}
						</Button>
						<h3>{currentPlayer + 1}</h3>
						<Button
							onClick={() => {
								updateCurrentPlayer(-1);
							}}
						>
							{"Précédent"}
						</Button>
					</div>
				</div>
				{/* PLAYER BOARD */}
				<div className={"w-[50%] h-full p-8"}>
					<div
						className={
							"bg-neutral-white rounded-2xl size-full flex flex-col justify-center items-center space-y-4"
						}
					>
						<h2 className={"font-bold"}>
							{players.find((player) => player.name === playerName)?.name}
						</h2>
						<div
							className={
								"h-[40%] w-full flex flex-row items-center justify-around"
							}
						>
							<div className={"flex space-x-8 text-center"}>
								<img
									src={DiceU}
									height={100}
									width={100}
									alt={"unknown dice"}
								/>
								<h1 className={"font-bold"}>x</h1>
								<input
									type="number"
									className={"w-16 h-16 bg-[#eeeeee] rounded-2xl"}
									style={{
										fontSize: "3rem",
										textAlign: "center",
										width: "6rem",
										height: "6rem",
									}}
								/>
							</div>
							<div className={"flex flex-col space-y-4"}>
								<Button>
									<p className={"body-bold-large"}>Menteur</p>
								</Button>
								<Button>
									<p className={"body-bold-large px-2.5"}>Valider</p>
								</Button>
							</div>
						</div>
						<div className={"flex flex-row space-x-4"}>
							{players
								.find((player) => player.name === playerName)
								?.dices.map((dice, index) => (
									<img
										key={index}
										src={diceImages[dice - 1]}
										height={100}
										width={100}
										alt={"dice"}
									/>
								))}
						</div>
					</div>
				</div>
				{/* PLAYERS LEADERBOARD */}
				<div className={"w-[25%] h-full p-8"}>
					<div className={"bg-neutral-grey_1 rounded-2xl size-full p-8"} />
				</div>
			</div>
			{/* QUICK INFOS */}
			<div className={"h-[10%] bg-neutral-grey_1 w-full items-center"} />
			{/* PLAYERS TURN, ACTIONS AND PREVIEW */}
			<div
				className={
					"h-[40%] flex overflow-hidden justify-center items-center space-x-8"
				}
			>
				{displayedPlayers.map((player, index) => (
					<div
						key={index}
						className={`flex bg-neutral-grey_1 h-80 rounded-2xl w-[640px] justify-center items-center ${
							players.find((p) => p.name === player.name)?.name ===
							players[currentPlayer].name
								? "bg-neutral-white"
								: ""
						}`}
					>
						<h2>{player.name}</h2>
					</div>
				))}
			</div>
		</div>
	);
}
