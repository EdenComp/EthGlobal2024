import { type ClassValue, clsx } from "clsx";
import type { Hex } from "viem";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function shortenHexString(hexString: Hex) {
	return `${hexString.slice(0, 6)}...${hexString.slice(-4)}` as Hex;
}
