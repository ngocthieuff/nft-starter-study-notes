# Private Networks

:smiling_imp: An Ethereum network is private if the nodes are not connected to the main network.

### 1. Prerequisites:

- [Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth) installation
- [Geth fundamentals](https://geth.ethereum.org/docs/getting-started)

### 2. Private Networks:

:dancers: A private network is **composed of multiple Ethereum nodes** that can **only connect to each other**.

:walking: In order to run multiple nodes locally, **each one** requires a **separate data directory** (`--datadir`).

The nodes must also *know about each other* :couple_with_heart: and *be able to exchange information* :open_hands:, *share an initial state* :cupid: and a *common consensus algorithm* :ok_woman:. 

### 3. Choosing A Network ID:

- Ethereum Mainnet has Network ID = 1.

- Providing a network ID that is not already being used by an existing network or testnet means the nodes using that network ID can only connect to each other, creating a private network.

 ```console
    geth --networkid 12345
 ```

### 4. Choosing A Consensus Algorithm:

#### a. Ethash:

Geth’s `PoW` algorithm, Ethhash, is a system that allows open participation by anyone willing to dedicate resources to mining.

As such, PoW is a poor choice for private networks with few miners.

#### b. Clique:

Clique consensus is a `PoA` system where new blocks can be created by authorized ‘signers’ only.

The initial set of authorized signers is configured in the genesis block.

Clique is strongly recommended for private testnets because `PoA` is far less resource-intensive than `PoW`.

### 5. Creating The Genesis Block:

:sparkles: Every blockchain starts with a genesis block.

The genesis block is configured using a `genesis.json` file whose path must be provided to Geth on start-up.

When creating a genesis block, a few initial parameters for the private blockchain must be defined:

- `config`: Ethereum platform features enabled at launch
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enabling and disabling features once the blockchain is running requires scheduling a hard fork.

- `gasLimit`: Initial block gas limit
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This impacts how much EVM computation can happen within a single block. 
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The block gas limit can be adjusted after launch using the `--miner.gastarget` command-line flag.

- `alloc`: Initial allocation of ether
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>This determines how much ether is available to the addresses listed in the genesis block. Additional ether can be created through mining as the chain progresses.</sub>


### References

- [Private Networks](https://geth.ethereum.org/docs/interface/private-network)