<template>
    <section class="banner">
        <div class="overlay">
            <!-- Header -->
            <div class="banner-header">
                <div class="left">
                    <h1><span class="bold">Cardano </span>
                        <span class="light">native marketplace</span>
                    </h1>
                    <ul class="features">
                        <li>✔ Community-governed</li>
                        <li>✔ Native asset payments</li> 
                        <li>✔ Midnight network</li>
                        <li>✔ Free shipping</li>
                    </ul>
                   
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
                    <h2>Discount pool</h2>
                    <div class="cards" style="font-size: var(--text-size-3); font-weight: 600;">
                          1.000.000 ADA
                    </div>
                </div>
                <div class="category">
                    <h2>Discount Countdown</h2>
                    <div class="cards" style="font-size: var(--text-size-3); font-weight: 600;">
                          13d : 15h : 52m
                    </div>
                </div>
                <div class="category">
                    <h2>Benefited users</h2>
                    <div class="cards" style="font-size: var(--text-size-3); font-weight: 600;">
                          2000 wallets
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
    color: var(--text-w);
    width: 100%;
    overflow: hidden;
    max-width: var(--body-a);
    border-radius: var(--radius-a);
}

.overlay {
    padding: 2rem;
    background-image: url('https://img.freepik.com/free-photo/couple-enjoying-online-order-they-received_23-2148455108.jpg');
    background-repeat: no-repeat;
    background-position-x: right;
}

.banner-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto 2rem auto;
    max-width: var(--body-a);
}

.left {
    max-width: 600px;
}

.left h1 {
    font-size: 26px;
    margin-bottom: 1rem;
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
    font-size: var(--text-size-3);
    margin-bottom: 6px;
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
    font-size: var(--text-size-4);
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