# RSA Algorithm

### Introduction

The algorithm was published in the 70’s by Ron **R**ivest, Adi **S"**hamir, and Leonard **A**dleman. RSA is public-key (asymmetric) cryptosystem that is widely used for secure data transmission.

### How does it work?

<img src="/assets/images/math_and_algorithm/rsa_1.png" alt="RSA illustration" />

Did you see two tuples of numbers (5, 14) and (11, 14)?
One is a public key for encryption and another is a private key for decryption. We will find out the origin of the two tuples later.

Obviously, we will not pass through the whole message "Hello" initially, the message has to be converted to something. Assume that message is converted to some value like "2".

<img src="/assets/images/math_and_algorithm/rsa_2.png" alt="RSA illustration" />

<details>
    <summary>Euler's totient function</summary>
    Euler’s Totient function Φ (n) for an input n is the count of numbers in {1, 2, 3, …, n} that are relatively prime to n, i.e., the numbers whose GCD (Greatest Common Divisor) with n is 1.

Example:
&nbsp;  &nbsp;  &nbsp;``Φ(5) = 4``
&nbsp;  &nbsp;  &nbsp;``gcd(1, 5) is 1, gcd(2, 5) is 1,``
&nbsp;  &nbsp;  &nbsp;``gcd(3, 5) is 1 and gcd(4, 5) is 1``

$$ \varphi(N)= n∗ \prod (1−\dfrac{1}{p})$$

eg: ``ϕ(6)=6∗(1−1/2)∗(1−1/3)=2``
</details>

### How to get encryption/decrption key pair?

- Pick two prime numbers , I will pick 2 and 7 , lets call them `P` and `Q`
``P = 2 and Q = 7``

- Multiply `P` and `Q` , and that becomes the modulus:
``N = P * Q = 14``

- Call $\varphi(14)$ is L, hence `L = 6`

- Now we will discover how to get encryption (public) key:
&nbsp; There are some rules for choosing public key:
&nbsp; - **It's got to between `1` and `L (6)`**
&nbsp;&nbsp;&nbsp; In this case, value is in `[2, 3, 4, 5]`
&nbsp; - **Coprime with `L(6)` and the `Modulus(14)`**
&nbsp;&nbsp;&nbsp; Hence, the answer is `5`.

- The next one, we will come to decryption part:
&nbsp;&nbsp; We will call it `D`, `D` has to follow one rule and this is it:
<img src="/assets/images/math_and_algorithm/rsa_3.png" alt="RSA illustration" />

<details>
    <summary>Modular multiplicative inverse</summary>
    Given two integers ‘a’ and ‘m‘, find modular multiplicative inverse of ‘a’ under modulo ‘m’.
The modular multiplicative inverse is an integer ‘x’ such that.
$$a x ≅ 1 (mod m)$$

Xét số nguyên dương `m`. Xét các số nguyên trên modulo `m` (từ `0` đến `m−1`).

Với một số nguyên `a`, ta gọi nghịch đảo modulo `m` (modular multiplicative inverse) của `a` là `a−1` là số nguyên thoả mãn:
$$a∗a^{−1}≡1(mod m)$$
Ta cần chú ý rằng không phải lúc nào `a−1` cũng tồn tại. Ví dụ, với `m=4`, `a=2`, ta không thể tìm được `a−1` thoả mãn đẳng thức trên.
Có thể chứng minh rằng `a−1` luôn luôn tồn tại nếu `gcd(a,m)=1`.

Tính nghịch đảo modulo bằng a^b % c

Khi gcd(a,m)=1, theo định lý Euler, ta có:

aphi(m)≡1(modm).

Với Phi hàm Euler đã được giải thích ở bài viết Số học 4.

Trong trường hợp m là số nguyên tố, phi(m)=m−1, nên ta có:

am−1≡1(modm).

Nhân cả 2 vế với a−1, ta được:

Với m bất kỳ, aphi(m)−1≡a−1(modm),
Với m nguyên tố, a^m−2≡a−1(modm).
Như vậy, ta có thể dùng thuật toán Tính a^b % c bằng chia để trị để tính nghịch đảo modulo với độ phức tạp O(logm).
</details>

We can use some code for finding range of D:
<img src="/assets/images/math_and_algorithm/rsa_4.png" alt="RSA illustration" />

But `4 ** D % 14 = 2 <---Decrypted message`

So let’s do a little list comprehension to see if the rule works:
<img src="/assets/images/math_and_algorithm/rsa_5.png" alt="RSA illustration" />

### Reference

- [Medium-How-does-RSA-work](https://medium.com/hackernoon/how-does-rsa-work-f44918df914b)
- [Modular-inverse](https://vnoi.info/wiki/algo/math/modular-inverse.md)
