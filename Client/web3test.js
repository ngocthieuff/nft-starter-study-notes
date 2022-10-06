var Web3 = require('web3');
var web3 = new Web3('http://0.0.0.0:8545');

async function execute() {
console.time("execution time");

for(i=0; i<20000; i++) {
 const resp = await web3.eth.getBlockNumber();
 //console.log(resp);
}
console.timeEnd("execution time");
}

execute();