const request = require('request');

// User and password specified like so: node index.js username password.
let options = {
    url: "http://0.0.0.0:8545",
    method: "post",
    headers:
    { 
     "content-type": "text/plain"
    },
    body: JSON.stringify({"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1})
};
console.time("execution time");

for(i=0; i<1000; i++) {
request(options, (error, response, body) => {
    if (error) {
        console.error('An error has occurred: ', error);
    } else {
      console.log('Post successful: body: ', body);
    }
})
  if(i==999) {
    console.timeEnd("execution time");
    console.log('999');
  }
}
;