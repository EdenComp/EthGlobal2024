import bgImage from "@/assets/web3Home.jpg";
import type { ReactElement } from "react";

const HeroBannerSection = (): ReactElement => {
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
						"flex flex-col w-full h-1/2 bg-opacity-20 bg-neutral-grey_1 rounded-3xl backdrop-blur-2xl items-center justify-center border-t border-neutral-white"
					}
				>
					<h1 className={"text-9xl"}>DéGame</h1>
					<p>A terrible Décentralized Dice Game</p>
				</div>
			</div>
		</div>
	);
};

export default HeroBannerSection;
