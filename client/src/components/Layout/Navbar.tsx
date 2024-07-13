import DiceLogo from "@/assets/DiceLogo.png";
import SignIn from "@/components/Layout/SignIn.tsx";
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
		{
			name: "Contact",
			route: "/contact",
		},
	];
	return (
		<header className="sticky top-0 z-50 flex h-20 w-full select-none justify-center bg-background-primary px-4">
			<div className={"z-40 flex items-center justify-between w-[1440px]"}>
				<div
					className={"body-default flex space-x-8 max-lg:hidden items-center"}
				>
					<img src={DiceLogo} className={"h-10"} />
					{links.map((link) => (
						<a
							key={link.route}
							href={link.route}
							className="hover:text-text-1 text-lg transition-all hover:translate-y-1 hover:text-orange-800"
						>
							<p className="text-neutral-white">{link.name}</p>
						</a>
					))}
				</div>
				<SignIn />
			</div>
		</header>
	);
}
