import type { ReactElement } from "react";

const SectionTemplate = (): ReactElement => {
	return (
		<div className={"flex items-center justify-center bg-orange-100"}>
			<div className="relative flex items-center justify-center w-[1440px] bg-orange-500 min-h-72">
				<h1>Section</h1>
			</div>
		</div>
	);
};

export default SectionTemplate;
