# Decentralized Exchange :collision:

### 1. Liquidity Pool:

A liquidity pool is a smart contract where tokens are locked for the purpose of providing liquidity

<img src="/assets/images/dex/lqp.png" />

### Automated Market Maker (AMM):

An automated market maker (AMM) is a type of decentralized exchange (DEX) protocol that relies on a mathematical formula to price assets.

<sub>
The term order book refers to an electronic list of buy and sell orders for a specific security or financial instrument organized by price level.
</sub>

Instead of using an order book like a traditional exchange, assets are priced according to a pricing algorithm.

This formula can vary with each protocol.

With @Uniswap, they use ``x*y=k``
where:
``x`` is the amount of one token in the liquidity pool
``y`` is the amount of the other
``k`` is a fixed constant (the pool’s total liquidity)

### References:

[1] - [Understanding the Technology Behind Decentralized Exchanges](https://finance.yahoo.com/news/understanding-technology-behind-decentralized-exchanges-125000147.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAANev8Ak0QtFG3yKLIKl1Nz6x-_HFXFRVorcpPvm1SY9N2YRP8v8RmpwcMfS5jARYmRALO61gORy7vXGAMnN8q6EhsTDTfJpW64kM8aHiv5YwwXU50E3KZPk0rdvPLbwMgTznhfDHUw-9ISX99nSnciILpAQiHQGasqiqet2-LnRT)
[2] - [Liquidity pool](https://capital.com/liquidity-pool-definition)
[3] - [What is an Automated Market Maker? (Liquidity Pool Algorithm)](https://www.youtube.com/watch?v=1PbZMudPP5E)
[4] - [Binance What Is an Automated Market Maker (AMM)?](https://academy.binance.com/en/articles/what-is-an-automated-market-maker-amm)
[5] - [Impermanent Loss? Hiểu rõ về “Tổn thất tạm thời” khi cung cấp thanh khoản cho các AMM](https://cryptogo.net/impermanent-loss-hieu-ro-ve-ton-that-tam-thoi-khi-cung-cap-thanh-khoan-cho-cac-amm/#:~:text=Loss%20l%C3%A0%20g%C3%AC%3F-,Impermanent%20Loss%20hay%20t%E1%BB%95n%20th%E1%BA%A5t%20t%E1%BA%A1m%20th%E1%BB%9Di%20ngh%C4%A9a%20l%C3%A0%20s%E1%BB%B1,th%E1%BB%8B%20tr%C6%B0%E1%BB%9Dng%20bi%E1%BA%BFn%20%C4%91%E1%BB%99ng%20m%E1%BA%A1nh.)