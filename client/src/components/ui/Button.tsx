import type { MouseEventHandler, ReactElement, ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

const Button = ({ children, onClick }: ButtonProps): ReactElement => {
	return (
		<div
			onClick={onClick}
			className={
				"flex m-auto px-8 py-2 bg-orange-800 text-neutral-white hover:bg-orange-600 active:bg-orange-900 focus:bg-orange-900 hover:translate-y-1.5 ease-in-out duration-150 transition-all rounded-lg shadow-lg hover:shadow-none select-none cursor-pointer items-center justify-center"
			}
		>
			{children}
		</div>
	);
};

export default Button;
