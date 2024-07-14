import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-red-950 dark:focus-visible:ring-red-300",
	{
		variants: {
			variant: {
				default:
					"bg-red-900 text-red-50 hover:bg-red-900/90 dark:bg-red-50 dark:text-red-900 dark:hover:bg-red-50/90",
				destructive:
					"bg-red-500 text-red-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
				outline:
					"border border-red-200 bg-white hover:bg-red-100 hover:text-red-900 dark:border-red-800 dark:bg-red-950 dark:hover:bg-red-800 dark:hover:text-red-50",
				secondary:
					"bg-red-100 text-red-900 hover:bg-red-100/80 dark:bg-red-800 dark:text-red-50 dark:hover:bg-red-800/80",
				ghost:
					"hover:bg-red-100 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-50",
				link: "text-red-900 underline-offset-4 hover:underline dark:text-red-50",
				light:
					"bg-red-50 text-red-900 hover:bg-red-100 dark:bg-red-800 dark:text-red-50 dark:hover:bg-red-800",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
