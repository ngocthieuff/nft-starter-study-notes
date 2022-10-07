const ethers = require('ethers');
const ABI = [
	{
		"anonymous": false,
		"inputs": [],
		"name": "AnotherLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "Log",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "test",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const address = '0xd9145CCE52D386f254917e481eB44e9943F39138';
const url = "wss://mainnet.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758";

const provider = new ethers.providers.WebSocketProvider(url);

const contract = new ethers.Contract(address, ABI, provider);

async function main() {
  console.log('main');
  contract.on('AnotherLog', (res) => console.log(res));
}

main();