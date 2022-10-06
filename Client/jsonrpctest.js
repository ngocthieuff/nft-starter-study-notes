const request = require('request');

async function execute() {
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

    for(i=0; i<20000; i++) {
        const response = await doRequest(options)
        // console.log(response);
    }
    console.timeEnd("execution time");
}


function doRequest(options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error)
                console.error('An error has occurred: ', error);
            } else {
                resolve(body)
            }
        })
    })
}

execute()