import { http, type Chain } from "viem";
import { createConfig } from "wagmi";

export default createConfig({
	chains: [
		{
			id: 9090,
			name: "Inco",
			nativeCurrency: {
				name: "Inco",
				symbol: "INCO",
				decimals: 18,
			},
			rpcUrls: {
				default: { http: ["https://testnet.inco.org"] },
			},
			blockExplorers: {
				default: {
					url: "https://explorer.testnet.inco.org/",
					name: "Inco's blockscout",
				},
			},
		} as const satisfies Chain,
	],
	multiInjectedProviderDiscovery: false,
	transports: {
		[9090]: http(),
	},
});

