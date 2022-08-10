# Ethereum Tour

### What is Ethereum?

In the Ethereum universe, there is a single, canonical computer (called the *Ethereum Virtual Machine*, or EVM) whose state everyone on the Ethereum network agrees on. 
Everyone who participates in the Ethereum network (every Ethereum node) keeps a copy of the state of this computer.

#### Blockchain in Ethereum vs Bitcoin:

Both bitcoin and Ethereum use Blockchain as a distributed database.
However, bitcoin uses Blockchain to store transaction data while Ethereum ***uses Blockchain to execute code*** on it. 

Bitcoin Blockchain keeps records of payments while Ethereum Blockchain ***keeps records of a computer program***.

#### From that...

Like the mechanism we read in blockchain, any participant can broadcast a request for this computer to perform arbitrary computation. Whenever such a request is broadcast, other participants on the network verify, validate, and carry out ("execute") the computation. This execution causes a state change in the EVM, which is committed and propagated throughout the entire network.

Requests for computation are called transaction requests; the record of all transactions and the EVM's present state gets stored on the blockchain, which in turn is stored and agreed upon by all nodes.

### What is Cryptocurrency?

A cryptocurrency is a medium of exchange secured by a blockchain-based ledger.

<sub>A medium of exchange is anything widely accepted as payment for goods and services, and a ledger is a data store that keeps track of transactions. Blockchain technology allows users to make transactions on the ledger without reliance upon a trusted third party to maintain the ledger.</sub>

### What is Ether?

Ether (ETH) is the cryptocurrency used for many things on the Ethereum network.

The ether cryptocurrency supports a pricing mechanism for Ethereum's computing power. 
<sub> When users want to make a transaction, they must pay ether to have their transaction recognized on the blockchain. These usage costs are known as gas fees, and the gas fee depends on the amount of computing power required to execute the transaction and the network-wide demand for computing power at the time.</sub>

Therefore, even if a malicious dapp submitted an infinite loop, the transaction would eventually run out of ether and terminate, allowing the network to return to normal.

### References:
- [Intro to Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/)