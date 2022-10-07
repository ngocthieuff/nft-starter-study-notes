# Event logs on the Ethereum blockchain :newspaper:

### Logging in Ethereum:

The EVM currently has 5 opcodes for emitting event logs: `LOG0`, `LOG1`, `LOG2`, `LOG3`, and `LOG4`. (https://ethervm.io/)

Each log record consists of both **topics** and **data**. 
Topics are 32-byte (256 bit) “words” that are used to describe what’s going on in an event. 

Different opcodes `(LOG0 … LOG4)` are needed to describe the number of topics that need to be included in the log record. For instance, `LOG1` includes one topic, while `LOG4` includes four topics. Therefore, the maximum number of topics that can be included in a single log record is **four**.

### Topics in Ethereum Log Records:

- The first part of a log record consists of an array of topics.
- Topics can only hold a maximum of **32 bytes** of data, if you want to try with topics larger than 32bytes of data, the topic will be hashed instead.

### Data in Ethereum Log Records:

While topics are limited to **4 * 32 bytes**, event data is not, which means it can include large or complicated data like arrays or strings.

### Emitting events:

```solidity
pragma solidity 0.8.0;

contract ExampleContract {
  event Transfer(address indexed _from, address indexed _to, uint256 _value)

  function transfer(address _to, uint256 _value) public {
    emit Transfer(msg.sender, _to, _value);
  }
}
```

Since the first 2 arguments are declared as `indexed`, they are treated like **additional topics**. 

Our final argument will `not be indexed`, which means it will be attached as **data** (instead of a separate topic).

This means we are able to search for things like “find all Transfer `logs from address 0x0000… to address 0x0000…`” or even “find all `logs to address 0x0000…`”, but not for things like “find all Transfer logs with value x”. We know this event will have **3 topics**, which means this logging operation will use the **LOG3** opcode.

<img src="https://miro.medium.com/max/1100/1*4R2msSDcT-JaSnUEPO96UA.png" />

### References: 

- [1] https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378
- [2] https://solidity-by-example.org/events/
- [3] [How to Listen To Smart Contract Events using ethers.js & node.js](https://www.youtube.com/watch?v=7GT_-jvSZIA)