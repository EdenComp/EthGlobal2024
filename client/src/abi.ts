const abi = [
	{ type: "constructor", inputs: [], stateMutability: "nonpayable" },
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
		name: "eip712Domain",
		inputs: [],
		outputs: [
			{ name: "fields", type: "bytes1", internalType: "bytes1" },
			{ name: "name", type: "string", internalType: "string" },
			{ name: "version", type: "string", internalType: "string" },
			{ name: "chainId", type: "uint256", internalType: "uint256" },
			{ name: "verifyingContract", type: "address", internalType: "address" },
			{ name: "salt", type: "bytes32", internalType: "bytes32" },
			{ name: "extensions", type: "uint256[]", internalType: "uint256[]" },
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "gameIds",
		inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "games",
		inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		outputs: [
			{ name: "id", type: "uint256", internalType: "uint256" },
			{ name: "owner", type: "address", internalType: "address" },
			{ name: "turnPlayerIndex", type: "uint8", internalType: "uint8" },
			{ name: "roundNumber", type: "uint16", internalType: "uint16" },
			{ name: "turnNumber", type: "uint16", internalType: "uint16" },
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getAvailableGames",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "tuple[]",
				internalType: "struct DeGame.AvailableGame[]",
				components: [
					{ name: "id", type: "uint256", internalType: "uint256" },
					{ name: "owner", type: "address", internalType: "address" },
					{ name: "playerCount", type: "uint8", internalType: "uint8" },
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getDice",
		inputs: [
			{ name: "gameId", type: "uint256", internalType: "uint256" },
			{ name: "publicKey", type: "bytes32", internalType: "bytes32" },
			{ name: "signature", type: "bytes", internalType: "bytes" },
		],
		outputs: [{ name: "", type: "bytes[]", internalType: "bytes[]" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getGame",
		inputs: [{ name: "gameId", type: "uint256", internalType: "uint256" }],
		outputs: [
			{
				name: "",
				type: "tuple",
				internalType: "struct DeGame.Game",
				components: [
					{ name: "id", type: "uint256", internalType: "uint256" },
					{ name: "owner", type: "address", internalType: "address" },
					{
						name: "alivePlayers",
						type: "address[]",
						internalType: "address[]",
					},
					{ name: "turnPlayerIndex", type: "uint8", internalType: "uint8" },
					{ name: "roundNumber", type: "uint16", internalType: "uint16" },
					{ name: "turnNumber", type: "uint16", internalType: "uint16" },
					{
						name: "rounds",
						type: "tuple[]",
						internalType: "struct DeGame.Round[]",
						components: [
							{
								name: "turns",
								type: "tuple[]",
								internalType: "struct DeGame.Turn[]",
								components: [
									{ name: "player", type: "address", internalType: "address" },
									{ name: "nbDice", type: "uint16", internalType: "uint16" },
									{ name: "dieValue", type: "uint8", internalType: "uint8" },
								],
							},
							{ name: "liar", type: "bool", internalType: "bool" },
						],
					},
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getPlayerGame",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "tuple",
				internalType: "struct DeGame.Game",
				components: [
					{ name: "id", type: "uint256", internalType: "uint256" },
					{ name: "owner", type: "address", internalType: "address" },
					{
						name: "alivePlayers",
						type: "address[]",
						internalType: "address[]",
					},
					{ name: "turnPlayerIndex", type: "uint8", internalType: "uint8" },
					{ name: "roundNumber", type: "uint16", internalType: "uint16" },
					{ name: "turnNumber", type: "uint16", internalType: "uint16" },
					{
						name: "rounds",
						type: "tuple[]",
						internalType: "struct DeGame.Round[]",
						components: [
							{
								name: "turns",
								type: "tuple[]",
								internalType: "struct DeGame.Turn[]",
								components: [
									{ name: "player", type: "address", internalType: "address" },
									{ name: "nbDice", type: "uint16", internalType: "uint16" },
									{ name: "dieValue", type: "uint8", internalType: "uint8" },
								],
							},
							{ name: "liar", type: "bool", internalType: "bool" },
						],
					},
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "joinGame",
		inputs: [{ name: "gameId", type: "uint256", internalType: "uint256" }],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "leaveGame",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "makeDiceCall",
		inputs: [
			{ name: "nbDice", type: "uint16", internalType: "uint16" },
			{ name: "dieValue", type: "uint8", internalType: "uint8" },
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "makeLiarCall",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "playerGame",
		inputs: [{ name: "", type: "address", internalType: "address" }],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "startGame",
		inputs: [],
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
	{ type: "event", name: "EIP712DomainChanged", inputs: [], anonymous: false },
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
				name: "owner",
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
		name: "GameUpdated",
		inputs: [
			{
				name: "gameId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "playerCount",
				type: "uint8",
				indexed: false,
				internalType: "uint8",
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
			{ name: "liar", type: "bool", indexed: false, internalType: "bool" },
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
	{ type: "error", name: "ECDSAInvalidSignature", inputs: [] },
	{
		type: "error",
		name: "ECDSAInvalidSignatureLength",
		inputs: [{ name: "length", type: "uint256", internalType: "uint256" }],
	},
	{
		type: "error",
		name: "ECDSAInvalidSignatureS",
		inputs: [{ name: "s", type: "bytes32", internalType: "bytes32" }],
	},
	{ type: "error", name: "InvalidShortString", inputs: [] },
	{
		type: "error",
		name: "StringTooLong",
		inputs: [{ name: "str", type: "string", internalType: "string" }],
	},
];

export default abi;
