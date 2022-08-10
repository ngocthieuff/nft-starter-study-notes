# Blockchain Introduction

### What is Blockchain?

<img src="/assets/images/blockchain_concept/blc.png">

<p style="font-size: 25px; color: gray">Blockchain = Block + Chain = listOf(block)</p>

With example of transferring money, in **block**, we write the information like:
- Who is transferring the money to whom?
- The amount associated with that transaction.
- Some other pieces of information like the signature.

```go
public class Block {
  public String data;
  public String hash;
  ...
}
```
And these blocks are connected through a chain to form a blockchain.

#### How these blocks are connected?
The hash of the current block is dependent on the hash of the previous block.

<img src="/assets/images/blockchain_concept/blc1.png">
H2 is created from the combination of the H1 and I2. Similarly, H3 is created from the combination of the H2 and I3 and so on.

### Definition in more depth:

The blockchain is a **distributed** and **decentralized** ledger that **stores data** such as transactions, and that is publicly **shared across all the nodes** of its network.

#### Ledger:

The ledger is the main record holder which holds the list of the block.

#### How does the blockchain works?

<img src="/assets/images/blockchain_concept/how_does_blockchain_work.png">

#### How the blockchain is secure?

<img src="/assets/images/blockchain_concept/blc_security.png">

### References:

- [What Is Blockchain? Simplest Introduction To The Blockchain](https://medium.com/mindorks/what-is-blockchain-simplest-introduction-to-the-blockchain-764a468e1575)