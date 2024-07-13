import Layout from "@/components/Layout.tsx";
import { Button } from "@/components/ui/button";
import HeroBannerSection from "@/pages/Home/HeroBannerSection.tsx";
import SponsorSection from "@/pages/Home/SponsorSection.tsx";

export default function Home() {
	return (
		<Layout>
			<HeroBannerSection />
			<SponsorSection />
			<a href={"/playground"} className={"flex py-24"}>
				<Button>
					<h2 className={"font-bold"}>PLAY</h2>
				</Button>
			</a>
		</Layout>
	);
}
