const abi = [
	{
		type: "function",
		name: "DICE_NUMBER",
		inputs: [],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "createGame",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "games",
		inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		outputs: [
			{ name: "id", type: "uint256", internalType: "uint256" },
			{ name: "owner", type: "address", internalType: "address" },
			{ name: "turnPlayerIndex", type: "uint8", internalType: "uint8" },
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getAvailableGames",
		inputs: [],
		outputs: [{ name: "", type: "uint256[]", internalType: "uint256[]" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "joinGame",
		inputs: [
			{ name: "gameId", type: "uint256", internalType: "uint256" },
			{ name: "publicKey", type: "bytes", internalType: "bytes" },
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "makeDiceCall",
		inputs: [
			{ name: "gameId", type: "uint256", internalType: "uint256" },
			{ name: "nbDice", type: "uint16", internalType: "uint16" },
			{ name: "dieValue", type: "uint8", internalType: "uint8" },
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "makeLiarCall",
		inputs: [{ name: "gameId", type: "uint256", internalType: "uint256" }],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "startGame",
		inputs: [{ name: "gameId", type: "uint256", internalType: "uint256" }],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "DiceCallMade",
		inputs: [
			{
				name: "gameId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "player",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "nbDice",
				type: "uint16",
				indexed: false,
				internalType: "uint16",
			},
			{
				name: "dieValue",
				type: "uint8",
				indexed: false,
				internalType: "uint8",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "GameCreated",
		inputs: [
			{
				name: "gameId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "creator",
				type: "address",
				indexed: false,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "GameEnded",
		inputs: [
			{
				name: "gameId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "winner",
				type: "address",
				indexed: false,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "GameStarted",
		inputs: [
			{
				name: "gameId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "LiarCallMade",
		inputs: [
			{
				name: "gameId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "player",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "nbDice",
				type: "uint16",
				indexed: false,
				internalType: "uint16",
			},
			{
				name: "dieValue",
				type: "uint8",
				indexed: false,
				internalType: "uint8",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "TurnEnded",
		inputs: [
			{
				name: "gameId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "loser",
				type: "address",
				indexed: false,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "TurnStarted",
		inputs: [
			{
				name: "gameId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
];

export default abi;
