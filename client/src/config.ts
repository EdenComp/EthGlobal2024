import { createConfig } from 'wagmi'
import { mainnet, sepolia } from 'viem/chains'
import { http } from 'viem'

export default createConfig({
	chains: [mainnet, sepolia],
	multiInjectedProviderDiscovery: false,
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
});
