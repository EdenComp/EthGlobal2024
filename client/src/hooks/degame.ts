import abi from "@/abi";
import config from "@/config";
import { readContract } from "@wagmi/core";
import type { Log } from "viem";
import {
	useReadContract,
	useWatchContractEvent,
	useWriteContract,
} from "wagmi";

export const useListenForDeGameEvent = <T>(
	eventName: string,
	callback: (event: Log & T) => void,
) =>
	useWatchContractEvent({
		abi,
		address: import.meta.env.VITE_DEGAME_CONTRACT_ADDRESS,
		eventName,
		onLogs: (logs) => {
			// @ts-ignore
			for (const log of logs) callback(log);
		},
	});

export const useReadDeGameContract = (
	functionName: string,
	args: unknown[] = [],
) =>
	useReadContract({
		abi,
		address: import.meta.env.VITE_DEGAME_CONTRACT_ADDRESS,
		functionName,
		args,
	});

export const useWriteDeGameContract = () => {
	const { writeContract, writeContractAsync, ...data } = useWriteContract();
	const variables = {
		abi,
		address: import.meta.env.VITE_DEGAME_CONTRACT_ADDRESS,
	};

	return {
		writeDeGameContract: (functionName: string, args: unknown[] = []) =>
			writeContract({
				functionName,
				args,
				...variables,
			}),
		writeDeGameContractAsync: (functionName: string, args: unknown[] = []) =>
			writeContractAsync({
				functionName,
				args,
				...variables,
			}),
		...data,
	};
};

export const readDeGameContract = async (
	functionName: string,
	args: unknown[] = [],
) =>
	readContract(config, {
		abi,
		address: import.meta.env.VITE_DEGAME_CONTRACT_ADDRESS,
		functionName,
		args,
	});
