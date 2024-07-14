import twoDices from "@/assets/videos/twoDices.mp4";
import type { ReactElement } from "react";

const GamePresentationSection = (): ReactElement => {
	return (
		<div className={"flex items-center justify-center"}>
			<div className="relative flex items-center justify-center w-[1440px] min-h-72 my-24">
				<video className="VideoTag h-[500px] rounded-2xl" autoPlay loop muted>
					<source src={twoDices} type="video/mp4" />
				</video>
				<div className={"flex flex-col px-24"}>
					<h2 className={"font-semibold text-red-600 pb-16"}>
						DéGame : A Liar's Dice on chain
					</h2>
					<p className={"body-default"}>
						The game of Liar's Dice is a game of deception and cunning. Players
						compete to be the last one standing by making bids on the number of
						dice on the table. The game is played in rounds, with each player
						rolling their dice in secret and making a bid based on the total
						number of dice they believe are on the table. The next player can
						either raise the bid or call the previous player a liar. If the bid
						is called, all players reveal their dice and the loser loses a die.
						The game continues until only one player remains. DéGame brings this
						classic game to the blockchain, allowing players to compete against
						each other for real cryptocurrency. Players can stake their tokens
						and compete in tournaments to win big prizes. Enter the world of
						Decentralized Liar's Dice on the blockchain: where bluff meets
						blockchain, and trust is coded into every roll.
					</p>
				</div>
			</div>
		</div>
	);
};

export default GamePresentationSection;
