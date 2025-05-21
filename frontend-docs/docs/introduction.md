# Introduction

Pairfy is a decentralized application for trading physical products.
It is a community-governed e-commerce that uses blockchain technology and artificial intelligence to generate a comprehensive value exchange ecosystem.

The trade between the seller and the buyer is managed by smart contracts or individual Plutus scripts.
Using a Cardano smart-contract allows to use **_ADA_**, **_stablecoin_** and **_native asset_** as a form of payment for the products.
In addition, the implementation of other innovative and deterministic trading logics.

#### Differential factors

- Community-governed with chain vote.
- The **liquidity pool** to reduce the price of products.
- Use of Cardano Network – Midnight Network.
- Each trade is an isolated smart-contract.
- Any member of the community can be a seller.
- Community repository of products and templates.
- Seller incentive program.
- Open-source development.
- Integration of AI models.
- Product search by AI vectorized semantics.

#### Competitive factors

Pairfy's most competitive factor is its discount liquidity pool which is fueled by trade fees and ADA generated through staking.
This helps leverage product prices, reducing them by 10% to 25% from traditional market prices.

_Example_

::: tip
Although the price of ADA / USD may fluctuate depending on when this is read the long-term trend is considered bullish. For the purposes of this example the reference value of **1 ADA = 1 USD** will be used.
:::


If the liquidity pool reaches 1.000.000 ADA this liquidity can be
divided by 100 ADA as a form of discount for each buy order.

```md
buy_order_discount = 100 ADA

1_000_000 ADA / buy_order_discount = 10_000 discounts

Beneficiaries: 10.000 users
```

This means that 10,000 buy orders will have a discount of 100 ADA.
Which for products over $200 represents a pretty substantial discount. 
A very generous discount is a good incentive to encourage traditional market buyers to migrate to the Cardano ecosystem.


Here's another example with an iPhone:


```md
buy_order_discount = 200 ADA

500_000 ADA / buy_order_discount = 2_500 discounts

Original Iphone 17 price = 1000USD
Price with discount applied = 800USD

Beneficiaries: 2.500 users 

```


The community can vote to set the pool cap and the `buy_order_discount` value.

You can also vote on other proposals that emerge from the ongoing discussion and the broader 
context of the project's development, guided by the constitutional principles that shape its direction.


#### Paradigm revolution

Using Turing-complete smart contracts enables high levels of innovation that dwarf traditional and centralized applications.
Applications that are currently Web 2 will eventually be replaced by Web 3.
Even large tech companies will have to adapt to this change or else disappear.
The open source community is a giant.
It allows for the distribution of value based on merit and opportunity, enables transparency, and highlights the power of community governance.
Closed source, telemetry, private data collection, will pass.

#### Licenses

You can fork the official repository to create a better commercial version of Pairfy, but you are obligated to share your improvements with the Cardano open-source community and the wider community, all under the GPLv3 license.

If you want to make a closed fork as a black box and not share your improvements with the open-source community, then you can opt for a commercial license.

This is to punish the abusive and greedy behavior of corporations that take code from open-source developers who are driven by passion
[READ](https://en.wikipedia.org/wiki/Halloween_documents).

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
