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

const diceImages = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, DiceU];

const OpponentsBoard = ({
	opponent,
	end,
}: { opponent: Opponent; end: boolean }): ReactElement => {
	return (
		<div className={"relative size-full"}>
			<h3
				className={
					"absolute top-0 left-1/2 -translate-x-[50%] text-neutral-white font-bold"
				}
			>
				{opponent.name}
			</h3>
			<div className="absolute bottom-4 inset-x-0 flex items-end justify-center mx-auto space-x-4 ">
				<img src={GobeletClosed} className={"w-24"} />
				{opponent.dices.map((dice, index) => (
					<div className={"size-16 mb-4"}>
						{end ? (
							<img
								key={index}
								src={diceImages[dice - 1]}
								alt={`Dice ${dice}`}
							/>
						) : (
							<img key={index} src={DiceU} alt={`Dice Unknown`} />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default function Playground() {
	const [gameEnd, setGameEnd] = useState(false);
	const player = {
		name: "aTom.Inc",
		dices: [2, 6, 4, 4, 3],
	};
	const op1 = {
		name: "Gontrant",
		dices: [2, 1, 3, 2, 6],
	};
	const op2 = {
		name: "Sylvain",
		dices: [3, 2, 5, 4, 2],
	};
	const op3 = {
		name: "Jean",
		dices: [1, 4, 1, 6, 2],
	};

	return (
		<div className="relative h-screen w-screen flex items-center justify-center bg-background-tertiary">
			<a href="/" className="absolute top-2 left-2">
				<Button>{"<"}</Button>
			</a>
			<div
				onClick={() => setGameEnd(!gameEnd)}
				className="absolute top-2 left-24"
			>
				<Button>{"Reveal"}</Button>
			</div>
			<div
				onClick={() => setGameEnd(!gameEnd)}
				className="absolute top-2 left-56"
			>
				<Button>{"Rotate"}</Button>
			</div>
			<div
				className={
					"absolute top-0 w-[650px] h-[350px] rounded-b-2xl border-x-2 border-b-8 border-neutral-white bg-background-primary"
				}
			></div>
			<div
				className={
					"absolute left-8 w-[650px] h-[300px] bg-opacity-20 -translate-y-12"
				}
			>
				<OpponentsBoard opponent={op1} end={gameEnd} />
			</div>

			<div
				className={
					"absolute right-8 w-[650px] h-[300px]  bg-opacity-20 -translate-y-12"
				}
			>
				<OpponentsBoard opponent={op3} end={gameEnd} />
			</div>
			<div className="absolute bottom-0 h-2/5 w-full bg-opacity-20">
				<h2
					className={
						"absolute top-0 left-1/2 -translate-x-[50%] text-neutral-white font-bold"
					}
				>
					{player.name}
				</h2>
				<div className="absolute bottom-0 inset-x-0 flex items-end justify-center mx-auto space-x-6 ">
					<img src={GobeletClosed} className={"w-36"} />
					{player.dices.map((dice, index) => (
						<div className={"size-28 mb-6"}>
							<img
								key={index}
								src={diceImages[dice - 1]}
								alt={`Dice ${dice}`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
