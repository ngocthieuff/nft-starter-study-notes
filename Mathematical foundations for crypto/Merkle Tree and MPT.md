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

#### What is Trie?

In computer science, a trie, also called digital tree or prefix tree, is a type of k-ary search tree, a tree data structure used for locating specific keys from within a set.

<img src="/assets/images/math_and_algorithm/merkle_tree_3.png" />

#### Hardcore (trie) compression

Imagine that we have a standard trie that represents a group of keys: ["deck", "did", "doe", "dog", "doge", "dogs"]
Remember that it's not really an array of strings that we're dealing with here - each of these strings have values, so it's more like a hash/dictionary, where each key has a value:
{
    "deck": some values,
    ...
    "dogs": some values
}
In the illustration shown below, we’ve transformed those keys into a standard trie.
<img src="/assets/images/math_and_algorithm/merkle_tree_4.jpeg" />

The first thing that we’ll notice when we look at this trie is that there are two keys for which we have ***redundant nodes*** as well as a ***redundant chain of edges***.

A **redundant** node is one that takes up an undue amount of space because it only has **one child node of its own**. We’ll see that for the key "deck", the node for the character "e" is redudant, because it only has a single child node, but we still have to initialize an entire node, with all of its pointers, as a result.

Similarly, the edges that connect the key "did" are **redundant**, as they connect redundant nodes that don’t really all need to be initialized, since they each **have only one child node of their own**.

######This is where compression comes in. 

We can compress our trie so that we neither repeat ourselves, nor use up more space than is necessary. A **compressed trie** is one that has been compacted down to save space.

<img src="/assets/images/math_and_algorithm/merkle_tree_5.jpeg" />

The result is: 
<img src="/assets/images/math_and_algorithm/merkle_tree_6.jpeg" />

#### Radix trees

> The idea of “trie compression” is a concept that is well-known enough to warrant its own name. Compressed tries are also known as radix trees, radix tries, or compact prefix trees. (I know, I know, first it was “tries”, now we’re back to “trees”, I don’t know why no one can agree on what to call anything!)

<img src="/assets/images/math_and_algorithm/merkle_tree_7.jpeg" alt="A compressed trie is also known as a radix tree" />

All of these terms really just refer to one thing: a space-optimized version of a standard trie. Unlike regular tries, the references/edges/pointers of a radix tree can hold a sequence of a string, and not just a single character element.

<img src="/assets/images/math_and_algorithm/merkle_tree_8.jpeg" />

Remember that a single node in a trie contains ***an array with references***, and ***a value***.

<img src="/assets/images/math_and_algorithm/merkle_tree_9.jpeg" />

Since we now know how to write and represent these key value pairs in radix tree format, we can draw out what that radix tree would look like.

<img src="/assets/images/math_and_algorithm/merkle_tree_10.jpeg" />

#### Back to bit and byte basics

What does the radix have to do with the tree?

> In order to understand the radix of a tree, we must understand how tries are read by our machines. In radix trees, keys are read in bits, or binary digits. **They are compared r bits at a time, where 2 to the power of r is the radix of the tree**.

A trie’s keys could be read and processed a byte at a time, half a byte at a time, or two bits at a time. 

However, there is **one particular type of radix tree** that processes keys in a really interesting way, called a **PATRICIA** tree.

### Patricia Tree

The PATRICIA tree was created in 1968 by Donald R. Morrison, who coined the acronym based on an algorithm he created for **retrieving information** efficiently from tries;

PATRICIA stands for “Practical Algorithm To Retrieve Information Coded In Alphanumeric”.

<img src="/assets/images/math_and_algorithm/merkle_tree_11.jpeg" />

The reason that PATRICIA trees are so interesting are because of the way that they process keys. 
And, as we’ve learned, the way that key are processed are tied directly to the radix of a radix tree.

Since the radix of a PATRICIA tree is 2, we know that r must be equal to 1, since 2¹ = 2. Thus, a **PATRICIA tree processes its keys one bit at a time**.

<img src="/assets/images/math_and_algorithm/merkle_tree_12.jpeg" />

Because a PATRICIA tree reads its keys in streams of bits, comparing 1 bit at a time, the entire tree is built up to represent binary digits. If you remember learning about binary search trees, you remember that a binary tree can only have two children, with the value of the left node being less than the value of the right node. So, in a binary radix tree, the right node is always used to represent binary digits (or bits) of 1, and the left node is used to represent bits of 0.

Because of this, each node in a PATRICIA tree has a 2-way branch, making this particular type of radix tree a binary radix tree. This is more obvious with an example, so let’s look at one now.

> dog: &nbsp; 01100100 01101111 01100111
doge: 01100100 01101111 01100111 **0**1100101
dogs: 01100100 01101111 01100111 011**1**0011
<img src="/assets/images/math_and_algorithm/merkle_tree_13.jpeg" />
<img src="/assets/images/math_and_algorithm/merkle_tree_14.jpeg" />



### Reference: 
- [Using Merkle Trees for NFT Whitelists](https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9)
- [Ever Wonder How Merkle Trees Work?](https://media.consensys.net/ever-wonder-how-merkle-trees-work-c2f8b7100ed3)
- [Trie Wikipedia](https://en.wikipedia.org/wiki/Trie)
- [Compressing Radix Trees Without (Too Many) Tears](https://medium.com/basecs/compressing-radix-trees-without-too-many-tears-a2e658adb9a0)