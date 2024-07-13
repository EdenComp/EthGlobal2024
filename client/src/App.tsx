import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
	DynamicContextProvider,
	DynamicWidget,
	mergeNetworks,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import config from "./config";

const queryClient = new QueryClient();

const chains = [
	{
		blockExplorerUrls: ["https://explorer.testnet.inco.org/"],
		chainId: 9090,
		chainName: "Inco Gentry Testnet",
		iconUrls: [
			"https://docs.inco.org/~gitbook/image?url=https%3A%2F%2F2921198789-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fb3FC48Xiy8fSq6XARds8%252Ficon%252FQlrBRTtastb5mRQNLhpk%252Fsymbol_brand.png%3Falt%3Dmedia%26token%3D79eebbe3-7881-4b26-bafc-13325a6c080d&width=32&dpr=4&quality=100&sign=428413e3&sv=1",
		],
		name: "Inco",
		nativeCurrency: {
			decimals: 18,
			name: "Inco",
			symbol: "INCO",
		},
		networkId: 9090,
		rpcUrls: ["https://testnet.inco.org"],
		vanityName: "Inco Gentry Testnet",
	},
];

// useWatchContractEvent({
// 	address: import.meta.env.VITE_DEGAME_CONTRACT_ADDRESS,
// 	abi,
// 	eventName: 'Transfer',
// 	onLogs(logs: unknown) {
// 		console.log('New logs!', logs)
// 	}
// })

export default function App() {
	return (
		<DynamicContextProvider
			settings={{
				// Find your environment id at https://app.dynamic.xyz/dashboard/developer
				environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
				walletConnectors: [EthereumWalletConnectors],
				overrides: {
					evmNetworks: (networks) => mergeNetworks(chains, networks),
				},
			}}
		>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<DynamicWagmiConnector>
						<DynamicWidget />
					</DynamicWagmiConnector>
				</QueryClientProvider>
			</WagmiProvider>
		</DynamicContextProvider>
	);
}
