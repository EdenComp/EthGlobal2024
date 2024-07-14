import type { ReactElement } from "react";
import githubLogo from "@/assets/icons/logos/Github.png"
import discordLogo from "@/assets/icons/logos/Discord.png"
import telegramLogo from "@/assets/icons/logos/Telegram.png"
import twitterLogo from "@/assets/icons/logos/Twitter.png"

export default function Footer(): ReactElement {
	return (
		<footer className="items-center bg-background-primary">
			<div className={"flex h-16 w-full  main-home-container"}>
				<div className={"ml-24 w-52 h-2 flex items-center space-x-4"}>
					<a href={"https://github.com/EdenComp/EthGlobal2024"}>
						<img src={githubLogo} alt={"logo"}/>
					</a>
					<a href={"https://discord.gg/Md5qNKvT"}>
						<img src={discordLogo} alt={"logo"}/>
					</a>
					<a href={"https://t.me/+KYYwUL8FxP5jZjJk"}>
						<img src={telegramLogo} alt={"logo"}/>
					</a>
					<a href={"https://twitter.com/PoCInnovation"}>
						<img src={twitterLogo} alt={"logo"}/>
					</a>
				</div>
				<div className={"info-container flex space-x-20 items-center"}>
					<div className={"about-container text-center"}>
						<p className={"font-bold"}>About</p>
						<p><a href={"/team"}>Team</a></p>
					</div>
					<div className={"resources-container text-center"}>
						<p className={"font-bold"}><a>Resources</a></p>
						<p><a>Docs</a></p>
					</div>
					<div className={"contact-container text-center"}>
						<p className={"font-bold"}>Contact</p>
						<p><a>Contact us!</a></p>
					</div>
				</div>
			</div>
			<div className={"flex items-center justify-center"}>
				<p className={"rights-p mt-32"}>@déGame 2024. All rights reserved</p>
			</div>
		</footer>
	);
}
