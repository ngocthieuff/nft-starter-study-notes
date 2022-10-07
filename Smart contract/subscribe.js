const Web3 = require('web3');
const web3 = new Web3('wss://goerli.infura.io/ws/v3/c1f511c8b9ed45f095ef00b69e87b758');

web3.eth.subscribe("logs", {
  address: '0x88B4C3C672a2388C41Dfd4C7D5526f73a1a4B375',
  topics: ['0x0738f4da267a110d810e6e89fc59e46be6de0c37b1d5cd559b267dc3688e74e0']
}, (error, result) => {
  if(error) {
    console.error(error);
  } else {
    console.log(result);
  }
});