# Solidity

### Memory vs. Storage



- Storage holds data between function calls. It is like a computer hard drive. State variables are storage data. These state variables reside in the smart contract data section on the blockchain. Writing variables into storage is very expensive because **each node that runs the transaction has to do the same operation**, it makes the transaction more expensive and causes the blockchain bigger.

- Memory is a temporary place to store data, like RAM. Function args and local variables in functions are memory data. (if the function is external, args will be stored in the stack (calldata)) Ethereum virtual machine has limited space for memory so values stored here are **erased between function calls**.
