import type { Hex } from "viem";

export function shortenHexString(hexString: Hex) {
	return `${hexString.slice(0, 6)}...${hexString.slice(-4)}`;
}
