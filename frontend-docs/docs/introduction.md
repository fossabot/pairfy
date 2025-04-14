# Introduction

Pairfy is a decentralized application for trading physical products. It uses the Cardano blockchain network as a transactional and procedural layer.
Each purchase of a product is managed by a separate smart contract which contains a state machine login page that ensures secure and efficient trading.

Cardano's E-UTXO model provides atomic and deterministic security for transactions and contract state changes.
Using a Cardano smart contract provides the benefit of being able to use **_ADA_** as a form of payment, and even any **_stablecoin_** and **_native asset_**.

#### Differential factors

- High transparency, community-governed.
- Use of smart contract throughout the trade.
- Liquidity pool to return fees to users in the form of discounts.
- Use of Cardano Network – Midnight Network.
- Any member of the community can be a seller.
- Community repository of products and templates.
- Seller incentive program.
- Open-source development.

#### Competitive factors

It's important to consider the competition compared to traditional marketplace platforms.
Pairfy has a very important differentiating factor, its ADA liquidity pool which is fueled by sales fees and ADA generated through staking.
This helps leverage product prices, reducing them by 10% to 25% from traditional market prices.

_Example_

Although the price of ADAUSD may fluctuate depending on the time you read this, 
the price is bullish in the long term, so for this example 1 ADA = 1 USD will be used.

If the liquidity pool reaches 1.000.000 ADA this liquidity can be
divided by 100 ADA (discount per order).

```md
discount_per_order = 100 ADA

1_000_000 ADA / discount_per_order = 10_000 discounts

Beneficiaries: 10_000 users
```

This means that 10,000 buy orders will have a discount of 100 ADA.
Which for products over $100 represents a pretty substantial discount. 
A very generous discount is a good incentive to encourage traditional market buyers to migrate to the Cardano ecosystem.


_Here's another example with an iPhone:_


```md
discount_per_order = 200 ADA

500_000 ADA / discount_per_order = 2_500 discounts

Original Iphone 17 price = 1000USD
Price with discount applied = 800USD

Beneficiaries: 2_500 users 

```


The community can vote to set the pool cap and the `discount_per_order` value.



## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
