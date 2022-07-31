# Digital Signature Algorithm

### Introduction

The Digital Signature Algorithm (DSA) is a Federal Information Processing Standard for digital signatures, based on the mathematical concept of ***modular exponentiation*** and the ***discrete logarithm*** problem.
DSA is a variant of the Schnorr and ElGamal signature schemes.

### DSA vs RSA

`Public-Key Cryptography` is used to ***verify ownership*** on a blockchain.
`Digital signatures` allow you to prove your knowledge of a private key corresponding to a particular address without revealing any information about it.

<img src="/assets/images/math_and_algorithm/dsa_1.jpg" alt="Digital signature" />

To **create a digital signature** you need two components, a *message*, in most cases a transaction, and the *private key*.

A **verifier** will use the *message*, the *public key*, and the *digital signature* as an input to the verification algorithm.

This algorithm will then produce a **binary output**: Either the signature is valid, or it is not. Every full node and miner on the network will verify every single transaction using this concept.

### Reference:
- [Modular exponentiation algorithm](https://vnoi.info/wiki/translate/he/Number-Theory-3.md)
- [Horizen digital signatures](https://academy.horizen.io/technology/expert/digital-signatures/)