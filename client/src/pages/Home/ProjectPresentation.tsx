import testIcon from "@/assets/icons/CircleIcon.svg";
import type { ReactElement } from "react";

const ProjectPresentation = (): ReactElement => {
	const cards = [
		{
			title: "INCO",
			description:
				"Inco is the universal confidentiality layer of web3, powered by FHE and secured by Ethereum, enabling the development of next frontier decentralized applications (dApps), providing confidentiality to existing blockchains, and breaking down the final barrier to Web3 adoption at scale.",
			icon: testIcon,
		},
		{
			title: "ETHGlobal",
			description:
				"This app was built during the ETHGlobal Brussels 2024 hackathon",
			icon: testIcon,
		},
		{
			title: "titre",
			description: "description",
			icon: testIcon,
		},
	];
	return (
		<div className={"flex items-center justify-center"}>
			<div className="relative flex flex-col items-center justify-center w-[1440px] min-h-72 py-20">
				<h3 className={"text-orange-700"}>A Decentralized Multiplayer Game</h3>
				<p className={"body-large mb-16"}>
					Join the community and play with your friends
				</p>
				<div className={"flex flex-row space-x-12"}>
					{cards.map((card, index) => (
						<div
							key={index}
							className={
								"group py-16 px-8 border-orange-800 border rounded-2xl flex flex-col items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-neutral-grey_2 transition-all bg-background-primary hover:bg-orange-900"
							}
						>
							<img src={card.icon} height={50} width={50} />
							<div
								className={"flex flex-col items-center justify-center mt-8 "}
							>
								<h3>{card.title}</h3>
								<p className={"body-small w-72 text-center pt-4"}>
									{card.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectPresentation;
