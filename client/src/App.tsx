import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
	DynamicContextProvider,
	DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/404.tsx";
import Home from "@/pages/Home.tsx";
import Playground from "@/pages/PlayGround.tsx";
import Team from "@/pages/Team.tsx";
import { Route, Routes } from "react-router-dom";
import { WagmiProvider } from "wagmi";

import config from "@/config";
import Lobby from "@/pages/Lobby";

const queryClient = new QueryClient();

export default function App() {
	return (

		<DynamicContextProvider
			settings={{
				environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
				walletConnectors: [EthereumWalletConnectors],
				overrides: {
					evmNetworks: [
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
					],
				},
			}}
		>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<DynamicWagmiConnector>
						<DynamicWidget />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/lobby" element={<Lobby />} />
							<Route path="/team" element={<Team />} />
							<Route path="/playground" element={<Playground />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</DynamicWagmiConnector>
				</QueryClientProvider>
			</WagmiProvider>
		</DynamicContextProvider>
	);
}
