import BlockscoutLogo from "@/assets/Logos/BlockscoutLogo.png";
import DynamicLogo from "@/assets/Logos/DynamicLogo.png";
import ETHGlobalLogo from "@/assets/Logos/ETHGlobalLogo.png";
import IncoLogo from "@/assets/Logos/IncoLogo.png";
import type { ReactElement } from "react";

const SponsorSection = (): ReactElement => {
	return (
		<div className={"flex items-center justify-center bg-red-50"}>
			<div className="relative flex flex-col items-center justify-center w-[1440px] min-h-80">
				<p className={"body-large"}>Sponsored by :</p>
				<div className={"flex space-x-16"}>
					<img src={ETHGlobalLogo} className={"h-48"} alt="ETHGlobal" />
					<img src={IncoLogo} className={"h-48"} alt="Inco" />
					<img src={DynamicLogo} className={"h-48"} alt="Dynamic" />
					<img src={BlockscoutLogo} className={"h-48"} alt="Blockscout" />
				</div>
			</div>
		</div>
	);
};

export default SponsorSection;
