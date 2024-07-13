import { Button } from "@/components/ui/button";
import {
	useListenForDeGameEvent,
	useReadDeGameContract,
	useWriteDeGameContract,
} from "@/hooks/degame";
import { shortenHexString } from "@/utils";
import { useEffect, useState } from "react";
import { numberToHex } from "viem";
import { useSwitchChain } from "wagmi";

export default function Lobby() {
	const [availableGameIds, setAvailableGameIds] = useState<bigint[]>([]);
	const [gameId, setGameId] = useState<number>();
	const { writeDeGameContractAsync } = useWriteDeGameContract();
	useListenForDeGameEvent<{ args: { creator: string; gameId: bigint } }>(
		"GameCreated",
		(log) =>
			setAvailableGameIds((prev) => [
				...prev,
				// @ts-ignore
				log.args.gameId,
			]),
	);
	const {
		data: availableGames,
		isLoading: areAvailableGamesLoading,
		isSuccess: areAvailableGamesSuccess,
	} = useReadDeGameContract("getAvailableGames");
	useEffect(() => {
		if (
			availableGames &&
			Array.isArray(availableGames) &&
			availableGames.every((v) => typeof v === "bigint")
		)
			setAvailableGameIds(availableGames);
	}, [availableGames]);
	const { switchChainAsync } = useSwitchChain();
	useEffect(() => {
		switchChainAsync({ chainId: 9090 });
	}, [switchChainAsync]);

	return (
		<>
			<h1>
				{`Contract : ${shortenHexString(import.meta.env.VITE_DEGAME_CONTRACT_ADDRESS)}`}
			</h1>
			{areAvailableGamesLoading ? (
				<h1>Loading available games...</h1>
			) : areAvailableGamesSuccess ? (
				<p>
					{availableGameIds
						.map((id) => shortenHexString(numberToHex(id)))
						.join(", ") || "No available games"}
				</p>
			) : (
				<h1>An error occurred during available games loading</h1>
			)}
			<Button
				onClick={async () => {
					console.log(
						"createGame:",
						await writeDeGameContractAsync("createGame"),
					);
				}}
			>
				Create Game
			</Button>
			<input
				type="number"
				value={gameId}
				onChange={({ target: { valueAsNumber } }) =>
					setGameId(Number.isNaN(valueAsNumber) ? undefined : valueAsNumber)
				}
			/>
			<Button
				onClick={async () => {
					await writeDeGameContractAsync("joinGame", [BigInt(gameId ?? 0)]);
				}}
				disabled={gameId === undefined}
			>
				Join Game
			</Button>
		</>
	);
}
