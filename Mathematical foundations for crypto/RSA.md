# RSA Algorithm

### Introduction

The algorithm was published in the 70’s by Ron <strong>R</strong>ivest, Adi <strong>S</strong>hamir, and Leonard <strong>A</strong>dleman. RSA is public-key (asymmetric) cryptosystem that is widely used for secure data transmission.

### How does it work?

<img src="/assets/images/math_and_algorithm/rsa_1.png" alt="RSA illustration" />

Did you see two tuples of numbers (5, 14) and (11, 14)?
One is a public key for encryption and another is a private key for decryption. We will find out the origin of the two tuples later.

Obviously, we will not pass through the whole message "Hello" initially, the message has to be converted to something. Assume that message is converted to some value like "2".

<img src="/assets/images/math_and_algorithm/rsa_2.png" alt="RSA illustration" />

### Reference

- [Medium-How-does-RSA-work](https://medium.com/hackernoon/how-does-rsa-work-f44918df914b)
