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

#### Minting Ether:

Minting is the process in which new ether gets created on the Ethereum ledger.
<sub>The underlying Ethereum protocol creates the new ether, and it is not possible for a user to create ether.</sub>

Ether is minted when a new block is created on the Ethereum blockchain.

#### Burning Ether:

As well as creating ether through block rewards, ether can **get destroyed** by a process called 'burning'. When ether gets burned, it gets *removed from circulation permanently*.

#### Denominations:

| Denomination | Value in ether | Common Usage              |
|--------------|----------------|---------------------------|
| Wei          | 10^-18         | Technical implementations |
| Gwei         | 10^-9          | Human-readable gas fees   |

### What is a Smart Contract?

A "smart contract" is simply a program that runs on the Ethereum blockchain.
 
<p style="font-size: 20px; color: gray">Smart Contract = Code (function) + Data (state)
<span style="font-size: 17px; color: gray">resides at address on Ethereum blockchain</span></p>

Smart contracts are a type of <ins>Ethereum account</ins>. This means they have a balance and they can send transactions over the network. 
However they're not controlled by a user, instead they are deployed to the network and run as programmed.

User accounts can then interact with a smart contract by submitting transactions that *execute a function* defined on the smart contract. 
Smart contracts can define rules, like a regular contract, and automatically enforce them via the code. Smart contracts cannot be deleted by default, and interactions with them are irreversible.

#### A digital vending machine:

To get a snack from a vending machine:

```solidity
money + snack selection = snack dispensed
```

A smart contract, like a vending machine, has logic programmed into it.

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

### Let's come to DAPPs:

A **d**ecentralized **app**lication (dapp) is an application built on a decentralized network that combines a smart contract and a frontend user interface. 

<p style="font-size: 20px; color: gray">Dapp = Smart Contract + Frontend UI

<sub>As mentioned in the previous section, on Ethereum, smart contracts are accessible and transparent – like open APIs – so your dapp can even include a smart contract that someone else has written.</sub>

- **Decentralized** - dapps operate on Ethereum, an open public decentralized platform where no one person or group has control
- **Deterministic** - dapps perform the same function irrespective of the environment in which they get executed
- **Turing complete** - dapps can perform any action given the required resources
- **Isolated** - dapps are executed in a virtual environment known as Ethereum Virtual Machine so that if the smart contract has a bug, it won’t hamper the normal functioning of the blockchain network


### References:
- [Intro to Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/)