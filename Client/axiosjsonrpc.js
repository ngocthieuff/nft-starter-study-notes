const axios = require('axios');

try {
  const response = axios.post('http://0.0.0.0:8545', {
    jsonrpc: '2.0',
    method: 'eth_accounts',
    data: JSON.stringify({"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}),
  
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  }).then((error, response, body) => console.log('response: '+ JSON.stringify(response)));
} catch(error) {
  console.error(error)
}

