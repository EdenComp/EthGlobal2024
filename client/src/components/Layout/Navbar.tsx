import DiceLogo from "@/assets/Logos/DGLogo.png";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import type { ReactElement } from "react";

export default function Navbar(): ReactElement {
	const links = [
		{
			name: "Home",
			route: "/",
		},
		{
			name: "Project",
			route: "/project",
		},
		{
			name: "Team",
			route: "/team",
		},
	];
	return (
		<header className="sticky top-0 z-50 flex h-20 w-full select-none justify-center px-4 bg-white">
			<div className={"z-40 flex items-center justify-between w-[1440px]"}>
				<div
					className={"body-default flex space-x-8 max-lg:hidden items-center"}
				>
					<img src={DiceLogo} className={"h-16"} alt="dice" />
					{links.map((link) => (
						<a
							key={link.route}
							href={link.route}
							className="hover:text-text-1 text-lg transition-all hover:tranrose-y-1 hover:text-orange-800"
						>
							<p className="text-neutral-white">{link.name}</p>
						</a>
					))}
				</div>
				<DynamicWidget />
			</div>
		</header>
	);
}
