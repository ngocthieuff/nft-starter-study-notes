const Web3 = require('web3');
const web3 = new Web3('wss://goerli.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758');

web3.eth.subscribe("logs", {
  address: '0x54D0E189e44B08187d6208C720D5Cb2F5a15fFB8',
  topics: ['0x0738f4da267a110d810e6e89fc59e46be6de0c37b1d5cd559b267dc3688e74e0']
}, (error, result) => {
  if(error) {
    console.error(error);
  } else {
    console.log(result);
  }
}).on("connected", function(subscriptionId){
    console.log('SubID: ',subscriptionId);
})
.on('data', function(event){
    console.log('Event:', event); 
    console.log(event.transactionHash);
    //Write send mail here!
})
.on('changed', function(event){
    // remove event from local database
})
.on('error', function(error, receipt) { 
    console.log('Error:', error, receipt);
});

// data hext to text
// you can see that on Logs() tab at https://goerli.etherscan.io/tx/0x96ecc821a9f4a1799ab510d18bb86fc2094b6607ded1686cc707b8485df96c4c#eventlog

// deploy contract using goerli, and you must be use wss of goerli url

// contract sample:

// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract Event {
//     // Event declaration
//     // Up to 3 parameters can be indexed.
//     // Indexed parameters helps you filter the logs by the indexed parameter
//     event Log(address indexed sender, string message);
//     event AnotherLog();
//     event LotsOfDataLog(string message, string message1, string message2, string message3, string message4);

//     function test() public {
//         emit Log(msg.sender, "Hello World!");
//         emit Log(msg.sender, "Hello EVM!");
//         emit AnotherLog();
//         emit LotsOfDataLog('1111','2222','kkkkk', 'hello', 'hihihi');
//     }
// }
