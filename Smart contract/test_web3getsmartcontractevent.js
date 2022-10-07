// https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4xMzsKCmNvbnRyYWN0IEV2ZW50IHsKICAgIC8vIEV2ZW50IGRlY2xhcmF0aW9uCiAgICAvLyBVcCB0byAzIHBhcmFtZXRlcnMgY2FuIGJlIGluZGV4ZWQuCiAgICAvLyBJbmRleGVkIHBhcmFtZXRlcnMgaGVscHMgeW91IGZpbHRlciB0aGUgbG9ncyBieSB0aGUgaW5kZXhlZCBwYXJhbWV0ZXIKICAgIGV2ZW50IExvZyhhZGRyZXNzIGluZGV4ZWQgc2VuZGVyLCBzdHJpbmcgbWVzc2FnZSk7CiAgICBldmVudCBBbm90aGVyTG9nKCk7CgogICAgZnVuY3Rpb24gdGVzdCgpIHB1YmxpYyB7CiAgICAgICAgZW1pdCBMb2cobXNnLnNlbmRlciwgIkhlbGxvIFdvcmxkISIpOwogICAgICAgIGVtaXQgTG9nKG1zZy5zZW5kZXIsICJIZWxsbyBFVk0hIik7CiAgICAgICAgZW1pdCBBbm90aGVyTG9nKCk7CiAgICB9Cn0K&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js
const Web3 = require('web3');
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

const web3 = new Web3('wss://mainnet.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758');
const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';
const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS); 

function execute() {
  // let options = {
  //     filter: {
  //       sender: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'    //Only get events where transfer value was 1000 or 1337
  //     },
  // };

  myContract.events.Log()
  .on('data', event => console.log('event', event))
  .on('changed', changed => console.log('changed', changed))
  .on('error', err => console.log ('error', err.message, err.stack))
  .on('connected', str => console.log('str', str))
}

execute();
