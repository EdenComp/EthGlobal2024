import Layout from "@/components/Layout.tsx";
import { Button } from "@/components/ui/button";
import type { ReactElement } from "react";

const TeamCard = ({
	profile,
	index,
}: { profile: any; index: number }): ReactElement => {
	return (
		<button
			onClick={() => window.open(profile.link, "_blank")}
			className="focus:outline-none group"
			type="button"
			key={index}
		>
			<div
				key={index}
				className="border rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition duration-300 ease-in-out transform group-hover:-translate-y-2 group-hover:scale-105 border-border-1 group-hover:border-orange-800 active:border-border-3 bg-background-2 shadow-interactive-1 group-hover:shadow-interactive-2 active:shadow-interactive-3"
			>
				<img
					alt={profile.name}
					className="w-full h-64 object-cover object-center"
					src={profile.photo}
				/>
				<div className="p-6 z-auto bg-background-secondary group-hover:bg-orange-900 transition duration-300 ease-in-out">
					<p className="text-orange-700 group-hover:text-neutral-white body-bold-large">
						{profile.name}
					</p>
					<p className="mb-4 text-neutral-white body-small">{profile.role}</p>
					<p className="text-text-2 text-opacity-70 body-default">
						{profile.description}
					</p>
				</div>
			</div>
		</button>
	);
};

export default function Team() {
	const profiles = [
		{
			photo: "https://avatars.githubusercontent.com/u/33784129?v=4",
			name: "Florian Lauch",
			role: "Fullstack Engineer",
			description: "Visionary leader with a passion for innovation.",
			link: "https://github.com/EdenComp",
		},
		{
			photo: "https://avatars.githubusercontent.com/u/54242096?v=4",
			name: "Dorian Moy",
			role: "Fullstack Engineer",
			description: "Technology enthusiast and problem solver.",
			link: "https://github.com/Croos3r",
		},
		{
			photo: "https://avatars.githubusercontent.com/u/91875715?v=4",
			name: "Tom Bariteau-Peter",
			role: "Fullstack Engineer",
			description: "Creative mind with an eye for beautiful design.",
			link: "https://github.com/Tomi-Tom",
		},
		{
			photo: "https://avatars.githubusercontent.com/u/95973236?v=4",
			name: "Mohammed JBILOU",
			role: "Fullstack Engineer",
			description: "Technology enthusiast and problem solver.",
			link: "https://github.com/Molaryy",
		},
	];
	return (
		<Layout>
			<div className="container px-4">
				<div className="mt-12 text-center">
					<h2 className="text-text-1 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Meet Our Team
					</h2>
					<p className="mt-3 text-text-2">
						We&apos;re a passionate team dedicated to building amazing products.
					</p>
				</div>
				<div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{profiles.map((profile, index) => (
						<TeamCard key={index} profile={profile} index={index} />
					))}
				</div>
			</div>
			<a href={"/playground"} className={"flex py-24"}>
				<Button>
					<h2 className={"font-bold"}>PLAY</h2>
				</Button>
			</a>
		</Layout>
	);
}
