import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useListenForDeGameEvent,
	useReadDeGameContract,
	useWriteDeGameContract,
} from "@/hooks/degame";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Hex, numberToHex } from "viem";
import { useAccount } from "wagmi";

export type Game = {
	id: bigint;
	owner: Hex;
	playerCount: number;
};

export type DetailedGame = {
	id: bigint;
	alivePlayers: Hex[];
	owner: Hex;
	roundNumber: number;
	rounds: unknown[];
	turnNumber: number;
	turnPlayerIndex: number;
};

export default function Lobby() {
	const { address } = useAccount();
	const [availableGames, setAvailableGames] = useState<Game[]>([]);
	const { isLoading: areAvailableGamesLoading, data: rawAvailableGames } =
		useReadDeGameContract("getAvailableGames");
	const { data: playerGame, isLoading: isPlayerGameLoading } =
		useReadDeGameContract("getPlayerGame", [address]);
	const { writeDeGameContract } = useWriteDeGameContract();
	const navigate = useNavigate();

	useListenForDeGameEvent<{
		args: { gameId: bigint; owner: Hex };
	}>("GameCreated", ({ args: { gameId: id, owner } }) => {
		setAvailableGames((prev) => [...prev, { id, owner, playerCount: 1 }]);
		if (owner === address) navigate(`/playground?id=${numberToHex(id)}`);
	});

	useListenForDeGameEvent<{ args: { gameId: bigint; playerCount: number } }>(
		"GameUpdated",
		({ args: { gameId: id, playerCount } }) => {
			setAvailableGames((prev) =>
				prev.map((game) => (game.id === id ? { ...game, playerCount } : game)),
			);
		},
	);

	useEffect(() => {
		if (rawAvailableGames) setAvailableGames(rawAvailableGames as Game[]);
	}, [rawAvailableGames]);

	useEffect(() => {
		if (playerGame !== undefined) {
			console.log(playerGame);
			navigate(
				`/playground?id=${numberToHex((playerGame as DetailedGame).id)}`,
			);
		}
	}, [playerGame, navigate]);

	return (
		<div className="flex flex-col items-center gap-y-10">
			{areAvailableGamesLoading || isPlayerGameLoading ? (
				<h1>Loading...</h1>
			) : (
				<Games games={availableGames} />
			)}
			<Button
				className="w-fit"
				size="lg"
				onClick={() => {
					writeDeGameContract("createGame");
				}}
				type="button"
			>
				Create game
			</Button>
		</div>
	);
}

function Games({ games }: { games: Game[] }) {
	const { status } = useAccount();
	const { writeDeGameContractAsync } = useWriteDeGameContract();
	const navigate = useNavigate();
	return (
		<Table>
			<TableCaption>Available games.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">ID</TableHead>
					<TableHead>Owner Address</TableHead>
					<TableHead>Player Count</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{games.map(({ id, owner, playerCount }) => (
					<TableRow key={id}>
						<TableCell className="font-medium">{numberToHex(id)}</TableCell>
						<TableCell>{owner}</TableCell>
						<TableCell>{playerCount}/256</TableCell>
						<TableCell className="text-right">
							<Button
								size="lg"
								onClick={() => {
									writeDeGameContractAsync("joinGame", [id]).then(() =>
										navigate(`/playground?id=${numberToHex(id)}`),
									);
								}}
								type="button"
								disabled={status !== "connected"}
							>
								Join
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
