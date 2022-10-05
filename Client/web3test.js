var Web3 = require('web3');
var web3 = new Web3('http://0.0.0.0:8545');

console.time("execution time");

for(i=0; i<1000; i++) {
  web3.eth.getBlockNumber()
  .then(console.log);
}
console.timeEnd("execution time");
