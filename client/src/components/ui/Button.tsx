import type { ReactElement, ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }): ReactElement => {
	return (
		<div
			className={
				"flex m-auto px-8 py-2 bg-orange-700 hover:bg-orange-500 active:bg-orange-900 focus:bg-orange-900 hover:translate-y-1.5 ease-in-out duration-150 transition-all rounded-lg shadow-lg hover:shadow-none select-none cursor-pointer items-center justify-center"
			}
		>
			{children}
		</div>
	);
};

export default Button;
