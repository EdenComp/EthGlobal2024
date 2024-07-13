import Dice1 from "@/assets/Dice/Dice-1.png";
import Dice2 from "@/assets/Dice/Dice-2.png";
import Dice3 from "@/assets/Dice/Dice-3.png";
import Dice4 from "@/assets/Dice/Dice-4.png";
import Dice5 from "@/assets/Dice/Dice-5.png";
import Dice6 from "@/assets/Dice/Dice-6.png";
import DiceU from "@/assets/Dice/Dice-unknown.png";
import GobeletClosed from "@/assets/Gobelet/Gobelet-closed.png";
import GobeletOpen from "@/assets/Gobelet/Gobelet-open.png";
import Button from "@/components/ui/Button.tsx";
import type { ReactElement } from "react";
import { useState } from "react";

interface Opponent {
	name: string;
	dices: number[];
}

const cardPositions = [
	{
		positions: "right-full top-12",
		size: 0.8,
	},
	{
		positions: "left-8",
		size: 1,
	},
	{
		positions: "bottom-0",
		size: 1.2,
	},
	{
		positions: "right-8",
		size: 1,
	},
	{
		positions: "left-full top-12",
		size: 0.8,
	},
];

const diceImages = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, DiceU];

export default function Playground() {
	const [gameEnd, setGameEnd] = useState(false);

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
		{
			name: "Thibaud",
			dices: [6, 5, 6, 1],
		},
	];
	const [currentPlayer, setCurrentPlayer] = useState(0);

	return (
		<div className="relative h-screen w-screen flex flex-col items-center justify-center bg-background-tertiary overflow-x-hidden">
			<div className={"flex h-[50%] w-full"}>
				{/* MENU */}
				<div className={"w-[25%] h-full p-8"}>
					<div className={"bg-neutral-grey_1 rounded-2xl size-full p-8"}></div>
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
								<img src={DiceU} height={100} width={100} />
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
									/>
								))}
						</div>
					</div>
				</div>
				{/* PLAYERS LEADERBOARD */}
				<div className={"w-[25%] h-full p-8"}>
					<div className={"bg-neutral-grey_1 rounded-2xl size-full p-8"}></div>
				</div>
			</div>
			{/* QUICK INFOS */}
			<div className={"h-[10%] bg-neutral-grey_1 w-full items-center"}></div>
			{/* PLAYERS TURN, ACTIONS AND PREVIEW */}
			<div
				className={
					"h-[40%] w-full flex overflow-hidden justify-center items-center space-x-8"
				}
			>
				{players.map((player, index) => (
					<div
						key={index}
						className={"flex bg-neutral-grey_1 h-80 rounded-2xl w-[640px]"}
					>
						<h2>{player.name}</h2>
					</div>
				))}
			</div>
		</div>
	);
}
