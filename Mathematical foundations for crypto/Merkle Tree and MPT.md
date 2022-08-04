# Introduce Merke Tree & MPT data structures and their applications

> In a blockchain, each transaction has an **id**.

The transaction id is formed from various bits of information, such as the timestamp, address, info on the transaction etc.

The first block in the blockchain is called the **genesis block**. The genesis block has its own hash value. As you move up the blockchain and keep on adding blocks, **each one has a hash of the other**.

``Transaction Id 1 + Transaction Id 2(Transaction Id 1) + Transaction Id 3(Transaction Id 1 & Transaction Id 2).
``


Also known as the binary hash tree- this tree was patented by Ralph Merkle in 1979. **The tree is mainly used in distributed ledger systems to verify the contents of a block** (transaction).

Think of an art gallery. The gallery has hired an art fraud detective to scan the paintings and make sure every single one of them is legitimate. Of course, there were signs and clues to help them do this, but they usually follow a process(look over the painting, feel the painting etc.) Eventually, they weed out the fake paintings and make sure the gallery is as authentic as possible.

The Merkle tree as presented in bitcoins white paper, works in fundamentally the same way. **This tree makes sure each transaction is secure and verifies the transactions so the block can be put up on the blockchain**.

This is why the Merkle tree is important. It is a **verification tree**, that keeps the entire blockchain and transaction process secure.
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

PATRICIA MERKLE TREES
### Patricia Merkle Trees

- Sibling Node: a group of nodes with the same parent

- Branch node: a node with at least one child

<img src="/assets/images/math_and_algorithm/mpt_1.gif" />

######But wait! It seems the Merkle tree is really good, so why does Ethereum use this one too?

Before we learned that you are able to send one branch at a time to dim down the computational storage, but technically this branch, as well as the whole tree still is there. You just don’t need to send it. Now, we need to compress it to save room! :)

This is where the nifty Patricia tree comes in! It is a compressed trie, that cuts out the repeated data, as well as excess that isn’t needed.

But how do you identify which ones to cut out?
Well, each node that has two child nodes remains the same. But, ***if a node only has one child node, they are compressed***. This is done by combining the child node and the parent node- to make one. The formal way of calling this is “radix two.” Each parent can have two children.

Let’s compare this to Genghis Khan and his infamous way of cutting down people coming into the camp when there were too many.

Just like the Patricia Trie, he is getting rid of excess(don’t do this, he was really brutal, because, he was Genghis Khan)

<img src="/assets/images/math_and_algorithm/mpt_2.jpeg" />

His condition was that *if you are taller than the cart, you will be made “shorter”* (He killed them). This happened after he invaded a camp, and instead of looting in the raid, he halted the slaughter to kill all the soldiers first and then go for the loot. This left a lot of people to adopt into his camp, and a lot of mouths to feed. So, he compressed the civilians.

The Patricia trie does the same by merging nodes. This makes sure to compress the entire tree so it's more manageable. But wait, I mentioned autocomplete, didn’t I? And besides, who determines which nodes go where?

Like I mentioned above, each string has a bit number.

<img src="/assets/images/math_and_algorithm/mpt_3.png" />

I will have patricia tree like this below:

<img src="/assets/images/math_and_algorithm/mpt_4.png" />

- Mainly used in the ***backend*** of a block to ***verify the transaction***.

- **Patricia Trie**: Cuts out repeated nodes and compresses nodes with only one child node

- **Merkle Tree**: Makes it easier to verify transactions as you only need to send the root node, and you can verify one branch at a time.

#### MPT Structure

<img src="/assets/images/math_and_algorithm/mpt_6.png" />

MPT is actually a Patricia Trie which is easy to store key-value data set and has the feature of Merkle Tree.

<img src="/assets/images/math_and_algorithm/mpt_5.jpg" />

In MPT, there are 3 kinds of nodes: Leaf Node, Branch Node and Extension Node.
- **Leaf node** stores the value itself or the pointer that points to the value.
  
- **Branch node** has function of router.
<sub><sup>For example, the figure above has 16 characters [0…f] in total and each character is mapped to one pointer referencing to an independent child node. It’s rapid to locate the correct subtree to continue when searching for a key.</sup></sub>

- **Extension node** is a space-saving router node which merges the parent node that has only one child node with its child node.
<sub><sup>For another example, key ADGHJ is composed of 4 branch nodes and 1 leaf node, where A, D, G, H are branch nodes. However, by involving the concept of extension node we can merge ADGH into 1 extension node, plus 1 leaf node J to save space.<sup></sub>

#### Application

MPT is widely used in Ethereum. Transaction lists, receipt lists, state of the world and contract data are all organized by MPT. To be brief, **all key-value data are basically organized by MPT**.

Taking the state of the world as an instance, it is represented as a key-value set structure. The key is account address and the value is a 4-tuple value: [nonce, balance, storageRoot, codeHash](the specific meaning of each field could refer to Ethereum yellow paper). In Ethereum, the state of the world stores status message of all accounts among the whole network for a certain moment. The status of accounts may change when transactions occur or smart contracts are running. MPT is employed to help generate new hash value with less calculation during status changing. Furthermore, account status from untrusted source can be swiftly verified as long as reliable root hash is present. In addition, MPT is essentially a Patricia Trie, so account status can be quickly searched by address. Thanks to MPT, Ethereum node is able to only store transaction list root hash, receipt list root hash, world state root hash and contract data root hash in block header, and store or transfer the detail data information and block header separately, making a lightweight node possible.

In summary, MPT has unique advantages in storage of key-value data, such as search-in-ease, incremental root hash calculation as well as zero-knowledge proof support.

#### Implementation
##### A basic key-value mapping

Ethereum’s Merkle Patricia Trie is essentially a **key-value mapping** that provides the following standard methods:

```type Trie interface {
  // methods as a basic key-value mapping
  Get(key []byte) ([]byte, bool) {
  Put(key []byte, value []byte)
  Del(key []byte, value []byte) bool
}
```


##### Verify Data Integrity

> What is merkle patricia trie different from a standard mapping?
Well, merkle patricia trie allows us to verify data integrity.

One can compute the Merkle Root Hash of the trie with the Hash function, such that if any key-value pair was updated, the merkle root hash of the trie would be different; if two Tries have the idential key-value pairs, they should have the same merkle root hash.

```
type Trie interface {
  // compute the merkle root hash for verifying data integrity
  Hash() []byte
}
```

Read more at [zhangchiqing/merkle-patricia-trie](https://github.com/zhangchiqing/merkle-patricia-trie)
### Reference: 
- [Using Merkle Trees for NFT Whitelists](https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9)
- [Ever Wonder How Merkle Trees Work?](https://media.consensys.net/ever-wonder-how-merkle-trees-work-c2f8b7100ed3)
- [Trie Wikipedia](https://en.wikipedia.org/wiki/Trie)
- [Compressing Radix Trees Without (Too Many) Tears](https://medium.com/basecs/compressing-radix-trees-without-too-many-tears-a2e658adb9a0)
- [Not the trees you plant in the ground; Patricia-Merkle trees](https://medium.com/@ariba.rajput.business/not-the-trees-you-plant-in-the-ground-patricia-merkle-trees-9689648c06d4)
- [Ethereum Merkle Patricia Trie Explained](https://medium.com/@chiqing/merkle-patricia-trie-explained-ae3ac6a7e123)