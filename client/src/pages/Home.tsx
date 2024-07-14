import Layout from "@/components/Layout.tsx";
import { Button } from "@/components/ui/button";
import GamePresentationSection from "@/pages/Home/GamePresentationSection.tsx";
import HeroBannerSection from "@/pages/Home/HeroBannerSection.tsx";
import SponsorSection from "@/pages/Home/SponsorSection.tsx";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

export default function Home() {
	const { isConnected } = useAccount();
	const navigate = useNavigate();
	return (
		<Layout>
			<HeroBannerSection />
			<SponsorSection />
			<GamePresentationSection />
			<Button
				variant={"light"}
				size={"xl"}
				onClick={() => {
					navigate(isConnected ? "/lobby" : "/");
				}}
			>
				<h2 className={"font-bold p-4"}>PLAY</h2>
			</Button>
		</Layout>
	);
}
