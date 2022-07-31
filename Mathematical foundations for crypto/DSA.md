# Digital Signature Algorithm

### Introduction

The Digital Signature Algorithm (DSA) is a Federal Information Processing Standard for digital signatures, based on the mathematical concept of ***modular exponentiation*** and the ***discrete logarithm*** problem.
DSA is a variant of the Schnorr and ElGamal signature schemes.

### DSA vs RSA

`Public-Key Cryptography` is used to ***verify ownership*** on a blockchain.
`Digital signatures` allow you to prove your knowledge of a private key corresponding to a particular address without revealing any information about it. In other words, it is mechanism to ***determine authenticity*** of a document file.

> It can be said that ***reversing the encryption mechanism*** is digitally signed. In RSA, we use the public key for encryption and the private key for decryption. With digital signatures we do the opposite, use the private key to encrypt and use the public key to decrypt.

<img src="/assets/images/math_and_algorithm/dsa_1.jpg" alt="Digital signature" />

To **create a digital signature** you need two components, a *message*, in most cases a transaction, and the *private key*.

A **verifier** will use the *message*, the *public key*, and the *digital signature* as an input to the verification algorithm.

This algorithm will then produce a **binary output**: Either the signature is valid, or it is not. Every full node and miner on the network will verify every single transaction using this concept.

### Cryptographic Hash function
Cryptographic hash functions are a third type of cryptographic algorithm.
A message of any length taken as input, and output to a short, fixed length hash. (MD5, SHA etc.)
It is a mathematical algorithm that maps data of arbitrary size to a bit string of a fixed size (a hash) and designed to be a one-way function, that is ***infeasible to invert***. Integrity checking is the mechanism to verify if the information has not changed.
To validate the integrity, a thumbprint (also called hash or digest) of the information created. Thumbprint created by an algorithm that create a shorter bit string from an information.

<img src="/assets/images/math_and_algorithm/dsa_3.jpg" alt="Digital signature" />

Properties:

- **Non-reversibility, or one-way function**. A good hash should make it very hard to reconstruct the original password from the output or hash.
- **Diffusion, or avalanche effect**. A change in just one bit of the original password should result in change to half the bits of its hash. In other words, when a password is changed slightly, the output of enciphered text should change significantly and unpredictably.
- **Determinism**. A given password must always generate the same hash value or enciphered text.
- **Collision resistance**. It should be hard to find two different passwords that hash to the same enciphered text.
- **Non-predictable**. The hash value should not be predictable from the password.

### DSA Implementation

This algorithm will cover the process from key generation to signature verification.

#### Step 1: Key Generation

&nbsp; Pre-requisites for the key generation formulas:
&nbsp; &nbsp; `q -> prime divisor`
&nbsp; &nbsp; `p -> prime number` such that: `p-1 mod q = 0`
&nbsp; &nbsp; `g -> any integer (1<g<p)` such that: `g**q mod p = 1` and `g = h**((p-1)/q) mod p`

&nbsp; From that, we infer two results:
&nbsp;&nbsp;&nbsp; `x (private key) -> random integer such that: 0<x<q`
&nbsp;&nbsp;&nbsp; `y (public key) can be caculated as: y = g**x mod p`

&nbsp;&nbsp; Private key can be packaged as: `{p, q, g, x}`
&nbsp;&nbsp; Public key can be packaged as:&nbsp; `{p, q, g, y}`

#### Step 2: Signature Generation

1. Message is passed through a hash function to generate a `digest(h)`
2. Choose any random integer `k` such that: `0 < k < q`
3. To caculate the value of `r`:
    `(g**k mod p) mod q`
4. To caculate the value of `s`:
`[K**-1(h+x.r) mod q]`

> The signature can be packaged as: `{r, s}`

#### Step 3: Verify the signature

1. Caculate the message digest using same hash function
2. Compute the value of `w` such that:
&nbsp;&nbsp;&nbsp; `s*w mod q = 1`
3. Compute the value of `u1` as:
&nbsp;&nbsp;&nbsp; `u1 = h*w mod q`
4. Compute the value of `u2` as:
&nbsp;&nbsp;&nbsp; `u2 = r*w mod q`
5. Finally, the verification component `v`:
&nbsp;&nbsp;&nbsp; `v=[((g**u1 . y**u2) mod p) mod q]`

If `v == r`, the signature verification is successfully.
### Reference

- [Modular exponentiation algorithm](https://vnoi.info/wiki/translate/he/Number-Theory-3.md)
- [Horizen digital signatures](https://academy.horizen.io/technology/expert/digital-signatures/)
- [DSA Algorithm Explain](https://www.youtube.com/watch?v=ANsg4wIQFn4)
- [Crypto Hash function](https://komodoplatform.com/en/academy/cryptographic-hash-function/#:~:text=SHA%2D256%20is%20perhaps%20the,Satoshi%20Nakamoto's%20original%20Bitcoin%20protocol.)