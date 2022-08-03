# Introduce Merke Tree & MPT data structures and their applications

Merkle Trees have long been a facet in the fields of both cryptography and computer science well before the blockchain we know and love today ever existed.

Nowadays, we are slowly starting to see them become more freequently used on-chain for the purpose of data verification.
### Merkle Tree

<img src="/assets/images/math_and_algorithm/merkle_tree_1.png" />

Merkle Trees are a **tree-like structure** where every node on the tree is represented by a value that is **the result of some cryptographic hash function**.

Merkle Trees feature 3 types of nodes, these are as follows:
**1. Leaf Nodes:**
   &nbsp;&nbsp;&nbsp;- These nodes sit at every bottom of the tree.
   &nbsp;&nbsp;&nbsp;- Their value is the result of the original data being hashed according to a specified hash function.
   *E.g: If 7 pieces of data need to be hashed, there will be 7 leaf nodes*.
**2. Parent Nodes:**
   &nbsp;&nbsp;&nbsp;- Parent nodes can sit at various levels of the tree depending on the overall tree size, but will always reside above leaf nodes.
  &nbsp;&nbsp;&nbsp;- The value of a parent node is determined by the hash of the concatenated hashes of the nodes below it, typically starting from left-to-right.
**3. Root Node:**
&nbsp;&nbsp;&nbsp;- The root node sits at the top of the tree abd us derived from the hash of the concatenated hashes of the two parent nodes that sits below it, again starting from left-to-right.
&nbsp;&nbsp;&nbsp;- There is only ever a single root node on any Merkle Tree.
&nbsp;&nbsp;&nbsp;- The root node possess the root hash.

#### How Merkle Trees Work?

<img src="/assets/images/math_and_algorithm/merkle_tree_2.jpg" />


### Patrica Merkle Trees


### Reference: 
[Using Merkle Trees for NFT Whitelists](https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9)
[Ever Wonder How Merkle Trees Work?](https://media.consensys.net/ever-wonder-how-merkle-trees-work-c2f8b7100ed3)