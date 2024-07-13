import Dice1 from "@/assets/Dice/Dice-1-invert.png";
import Dice2 from "@/assets/Dice/Dice-2-invert.png";
import Dice3 from "@/assets/Dice/Dice-3-invert.png";
import Dice4 from "@/assets/Dice/Dice-4-invert.png";
import Dice5 from "@/assets/Dice/Dice-5-invert.png";
import Dice6 from "@/assets/Dice/Dice-6-invert.png";
import DiceU from "@/assets/Dice/Dice-unknown-invert.png";
import { Button } from "@/components/ui/button.tsx";
import { type ReactElement, useEffect } from "react";
import { useState } from "react";

const diceImages = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, DiceU];

interface Player {
	name: string;
	dices: number[];
}

export default function Playground(): ReactElement {
	const [turnEnd, setTurnEnd] = useState(false);
	const [currentPlayer, setCurrentPlayer] = useState(0);
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
			name: "Pierre",
			dices: [5, 4, 3],
		},
		{
			name: "Paul",
			dices: [1, 2, 3, 4],
		},
		{
			name: "Jacques",
			dices: [1, 2, 5, 6],
		},
		{
			name: "Marie",
			dices: [1, 5, 6],
		},
		{
			name: "Sophie",
			dices: [1, 4, 5, 6],
		},
		{
			name: "Alice",
			dices: [3, 4, 5, 6],
		},
	];
	const [sortedPlayers, setSortedPlayers] = useState<Player[]>(players);
	const [displayedPlayers, setDisplayedPlayers] = useState([
		players[players.length - 2],
		players[players.length - 1],
		players[0],
		players[1],
		players[2],
	]);

	useEffect(() => {
		const newSortedPlayers = [...players].sort(
			(a, b) => b.dices.length - a.dices.length,
		);
		setSortedPlayers(newSortedPlayers);
	}, [players]);

	const updateCurrentPlayer = (step: number) => {
		const totalPlayers = players.length;
		const nextPlayerIndex =
			(currentPlayer + step + totalPlayers) % totalPlayers;
		const newDisplayedPlayers = [
			players[(nextPlayerIndex - 2 + totalPlayers) % totalPlayers],
			players[(nextPlayerIndex - 1 + totalPlayers) % totalPlayers],
			players[nextPlayerIndex],
			players[(nextPlayerIndex + 1) % totalPlayers],
			players[(nextPlayerIndex + 2) % totalPlayers],
		];
		setDisplayedPlayers(newDisplayedPlayers);
		setCurrentPlayer(nextPlayerIndex);
	};

	console.log("newCurrentPlayer", currentPlayer);
	console.log(players[currentPlayer].name);
	console.log("turnEnd", turnEnd);
	console.log("players", players);
	console.log("displayedPlayers", displayedPlayers);
	return (
		<div className="relative h-screen min-w-screen flex flex-col items-center justify-center bg-background-tertiary overflow-hidden text-neutral-white">
			<div className={"flex h-[45%] w-full"}>
				{/* MENU */}
				<div className={"w-[25%] h-full p-12"}>
					<div
						className={
							"bg-background-secondary rounded-2xl size-full p-8 flex flex-col items-center"
						}
					>
						<h3 className={"font-bold"}>{"Menu"}</h3>
						<div className={"flex"}>
							<Button
								onClick={() => {
									updateCurrentPlayer(-1);
								}}
							>
								prev
							</Button>
							<h2>{currentPlayer + 1}</h2>
							<Button
								onClick={() => {
									updateCurrentPlayer(1);
								}}
							>
								next
							</Button>
						</div>

						<Button
							onClick={() => {
								setTurnEnd(!turnEnd);
							}}
						>
							Terminer tour
						</Button>
						<Button
							onClick={() => {
								window.location.href = "/";
							}}
						>
							Quitter
						</Button>
					</div>
				</div>
				{/* PLAYER BOARD */}
				<div className={"w-[50%] h-full px-8 pb-6"}>
					<div
						className={
							"bg-background-primary rounded-b-2xl size-full flex flex-col justify-center items-center space-y-4"
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
									className={
										"w-16 h-16 bg-background-secondary border-2 border-neutral-white rounded-2xl"
									}
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
				<div className={"w-[25%] h-full p-12"}>
					<div
						className={
							"relative bg-background-secondary rounded-2xl size-full overflow-hidden"
						}
					>
						<h3 className={"font-bold text-center py-4"}>Leaderboard</h3>
						{sortedPlayers.map((player, index) => (
							<div
								key={index}
								className={`flex flex-row space-x-4 items-center justify-between text-left px-12 ${
									player.name === playerName
										? "bg-orange-900 bg-opacity-20"
										: ""
								}`}
							>
								<p className={"body-default "}>{player.name}</p>
								<p className={"body-default text-left"}>
									{player.dices.length}
								</p>
							</div>
						))}
						<div
							className={
								"w-full h-[10%] absolute bottom-0 bg-orange-900 rounded-b-2xl flex items-center justify-between px-12"
							}
						>
							<p className={"body-bold-default"}>
								{players.find((player) => player.name === playerName)?.name}
							</p>
							<p className={"body-bold-default"}>
								{
									players.find((player) => player.name === playerName)?.dices
										.length
								}
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* QUICK INFOS */}
			<div className={"h-[10%] bg-background-secondary w-full items-center"} />
			{/* PLAYERS TURN, ACTIONS AND PREVIEW */}
			<div
				className={
					"h-[45%] flex overflow-hidden justify-center items-center space-x-8"
				}
			>
				{displayedPlayers.map((player, index) => (
					<div
						key={index}
						className={`flex h-[350px] rounded-2xl w-[640px] justify-center items-center flex-col ${
							players.find((p) => p.name === player.name)?.name ===
							players[currentPlayer].name
								? "bg-background-primary"
								: "bg-background-secondary scale-90"
						}`}
					>
						<h3 className={"font-bold"}>{player.name}</h3>
						<div className={"w-full h-[50%]"} />
						<div className={"flex flex-row space-x-4"}>
							{player.dices.map((dice, index) => (
								<img
									key={index}
									src={turnEnd ? diceImages[dice - 1] : DiceU}
									height={70}
									width={70}
									alt={"dice"}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
