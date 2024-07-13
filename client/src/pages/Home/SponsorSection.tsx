import ETHGlobalLogo from "@/assets/ETHGlobalLogo.png";
import IncoLogo from "@/assets/IncoLogo.png";
import type { ReactElement } from "react";

const SponsorSection = (): ReactElement => {
	return (
		<div className={"flex items-center justify-center bg-background-secondary"}>
			<div className="relative flex flex-col items-center justify-center w-[1440px] min-h-72">
				<p className={"body-large"}>Sponsored by :</p>
				<div className={"flex space-x-12"}>
					<img src={ETHGlobalLogo} className={"h-64"} />
					<img src={IncoLogo} className={"h-64"} />
				</div>
			</div>
		</div>
	);
};

export default SponsorSection;
