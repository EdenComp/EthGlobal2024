import Layout from "@/components/Layout.tsx";
import Button from "@/components/ui/Button";
import HeroBannerSection from "@/pages/Home/HeroBannerSection.tsx";
import ProjectPresentation from "@/pages/Home/ProjectPresentation.tsx";
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
