import Layout from "@/components/Layout.tsx";
import { Button } from "@/components/ui/button";
import GamePresentationSection from "@/pages/Home/GamePresentationSection.tsx";
import HeroBannerSection from "@/pages/Home/HeroBannerSection.tsx";
import SponsorSection from "@/pages/Home/SponsorSection.tsx";

export default function Home() {
	return (
		<Layout>
			<HeroBannerSection />
			<SponsorSection />
			<GamePresentationSection />
			<a href={"/lobby"} className={"flex py-24 justify-center"}>
				<Button variant={"light"} size={"lg"}>
					<h2 className={"font-bold p-4"}>PLAY</h2>
				</Button>
			</a>
		</Layout>
	);
}
