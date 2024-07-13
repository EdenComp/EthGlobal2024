import Layout from "@/components/Layout.tsx";
import Button from "@/components/ui/Button";
import HeroBannerSection from "@/pages/Home/HeroBannerSection.tsx";
import SponsorSection from "@/pages/Home/SponsorSection.tsx";

export default function Home() {
	return (
		<Layout>
			<HeroBannerSection />
			<SponsorSection />
			<a href={"/playground"} className={"flex pt-8 pb-24"}>
				<Button>
					<h2>JOUER</h2>
				</Button>
			</a>
		</Layout>
	);
}
