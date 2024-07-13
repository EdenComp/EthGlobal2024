import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { createConfig } from "wagmi";

export default createConfig({
	chains: [mainnet, sepolia],
	multiInjectedProviderDiscovery: false,
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
});
