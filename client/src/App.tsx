import { DynamicContextProvider, DynamicWidget, useTokenBalances } from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { useAccount, useSignMessage, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import config from './config'

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { useState } from 'react'

const queryClient = new QueryClient();

export default function App() {
	return (
		<DynamicContextProvider
			settings={{
				// Find your environment id at https://app.dynamic.xyz/dashboard/developer
				environmentId: "",
				walletConnectors: [EthereumWalletConnectors],
			}}
		>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<DynamicWagmiConnector>
						<DynamicWidget />
						<AccountInfo/>
					</DynamicWagmiConnector>
				</QueryClientProvider>
			</WagmiProvider>
		</DynamicContextProvider>
	);
};
function AccountInfo() {
	const { address, isConnected, chain } = useAccount();
	const { tokenBalances } = useTokenBalances();
	const [message, setMessage] = useState<string>("")
	const {signMessage} = useSignMessage()
	return (
		<div>
			<p>
				wagmi connected: {isConnected ? 'true' : 'false'}
			</p>
			<p>wagmi address: {address}</p>
			<p>wagmi network: {chain?.id}</p>
			<p>{tokenBalances === undefined ? "Prout" : JSON.stringify(tokenBalances[0].balance)}</p>
			<p>{message}</p>
			<input type="text" value={message} onChange={({target: {value}}) => setMessage(value)} />
			<button type="submit" onClick={() => signMessage({message})}>
				Sign
			</button>
		</div>
	);
}
