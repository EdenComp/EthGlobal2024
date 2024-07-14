import bgImage from "@/assets/web3Home.jpg";
import type { ReactElement } from "react";
import {useEffect, useState} from "react";
import diceImage from "@/assets/dice-home.jpg";
import "./Home.css";

const HeroBannerSection = (): ReactElement => {
	const [isOnDie, setIsOnDie] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsOnDie((prev) => !prev);
		}, 3000);

		return () => clearInterval(interval);
	}, [isOnDie]);

	return (
		<div
			className="relative flex items-center justify-center w-screen h-[800px] bg-cover bg-center"
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<div
				className={
					"absolute h-1/2 w-full bottom-0 bg-gradient-to-t from-background-secondary z-20"
				}
			/>
			<div className={"flex items-center justify-center w-[1440px] h-full"}>
				<div
					className={
						"flex flex-col w-full h-1/2 bg-opacity-20 bg-neutral-grey_1 rounded-3xl backdrop-blur-2xl items-center justify-center border-t border-neutral-white space-y-8"
					}
				>
					<div className={"flex flex-row items-center title-container"}>
						{isOnDie == false ?
							<h1 className={"text-9xl font-semibold title transition-opacity ease-in-out"}>DéGame</h1>
							: <>
								<img src={diceImage} alt={"dice home image"} className={"w-32 ml-9 image-dice transition-transform"}/>
								<h1 className={"text-9xl font-semibold"}>Game</h1>
							</>
						}
					</div>
					<p>
						Enter the world of Decentralized Liar's Dice on the blockchain:
						where bluff meets blockchain, and trust is coded into every roll.
					</p>
				</div>
			</div>
		</div>
	);
};

export default HeroBannerSection;
