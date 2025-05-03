<template>
    <section class="banner">
        <div class="overlay">
            <!-- Header -->
            <div class="banner-header">
                <div class="left">
                    <h1><span class="bold">Cardano</span>
                        <span class="light">Marketplace</span>
                    </h1>
                    <ul class="features">
                        <li>✔ Community-governed</li> 
                        <li>✔ Stablecoin payments</li>
                        <li>✔ Free shipping</li>
                    </ul>
                    <button class="shop-button">Shop now</button>
                </div>
                <div class="right">
                    <p><strong>5M+</strong> Factory direct supply</p>
                    <p><strong>10</strong> Local warehouses worldwide</p>
                    <p><strong>20M+</strong> Value dropshipping items</p>
                    <p><strong>24H</strong> Personalized sourcing service</p>
                </div>
            </div>

            <!-- Product Sections -->
            <div class="products">
                <div class="category">
                    <h2>Liquidity for discounts</h2>
                    <div class="cards">
                        <ProductCard img="eyelashes.png" title="$1.04 each, ≥3 pcs" />
                        <ProductCard img="earring.png" title="$1.00 each, ≥3 pcs" />
                    </div>
                </div>
                <div class="category">
                    <h2>Fast delivery</h2>
                    <div class="cards">
                        <ProductCard img="dji.png" title="$0.99 Ships in 2 days" oldPrice="$1.23" />
                        <ProductCard img="brass.png" title="$0.99 Ships in 2 days" oldPrice="$1.71" />
                    </div>
                </div>
                <div class="category">
                    <h2>Buy again</h2>
                    <div class="cards">
                        <ProductCard img="meete.png" title="$4.24 each, ≥3 pcs" />
                        <ProductCard img="laser.png" title="$63.88" oldPrice="$68.88" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>
.banner {
    background: var(--primary-a);
    border-radius: 12px;
    color: var(--text-w);
    width: 100%;
    max-width: var(--body-a);
    padding: 1rem;
}

.overlay {
    padding: 40px 20px;
}

.banner-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto 40px auto;
}

.left {
    max-width: 600px;
}

.left h1 {
    font-size: 32px;
    margin-bottom: 15px;
}

.left .bold {
    font-weight: bold;
}

.left .light {
    font-weight: 300;
}

.features {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
}

.features li {
    margin-bottom: 6px;
    font-size: 14px;
}

.shop-button {
    background: white;
    color: black;
    padding: 10px 20px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.shop-button:hover {
    background: #f0f0f0;
}

.right {
    text-align: right;
    font-size: 14px;
    max-width: 400px;
    margin-top: 20px;
}

.right p {
    margin: 6px 0;
}

.products {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    background: white;
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
    color: black;
    border-radius: 10px;
}

.category {
    flex: 1 1 300px;
}

.category h2 {
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: bold;
}

.cards {
    display: flex;
    gap: 16px;
}

.product-card {
    width: 48%;
}

.product-card img {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.product-card .title {
    font-size: 14px;
    font-weight: 600;
    margin-top: 8px;
}

.product-card .old {
    font-size: 12px;
    color: gray;
    text-decoration: line-through;
}

@media (max-width: 768px) {
    .banner-header {
        flex-direction: column;
        gap: 20px;
    }

    .right {
        text-align: left;
    }

    .cards {
        flex-direction: column;
    }

    .product-card {
        width: 100%;
    }
}
</style>