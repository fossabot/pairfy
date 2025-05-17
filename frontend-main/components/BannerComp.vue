<template>
    <div class="banner-wrapper">
        <section class="banner">
            <div class="overlay">

                <!-- Header -->
                <div class="banner-header">
                    <div class="header-left">
                        <h1>
                            <span class="bold">Cardano</span>
                            <span class="light">native marketplace</span>
                        </h1>
                        <ul class="features">
                            <li>✔ Community-governed</li>
                            <li>✔ Native asset payments</li>
                            <li>✔ Midnight network</li>
                            <li>✔ Free shipping</li>
                        </ul>
                    </div>

                    <div class="header-right">
                        <p><strong>5M+</strong> Factory direct supply</p>
                        <p><strong>10</strong> Local warehouses worldwide</p>
                        <p><strong>20M+</strong> Value dropshipping items</p>
                        <p><strong>24H</strong> Personalized sourcing service</p>
                    </div>
                </div>

                <!-- Product Sections -->
                <div class="product-sections">
                    <div class="category">
                        <h2>Discount pool</h2>
                        <div class="cards">1.000.000 ADA / 53%</div>
                    </div>
                    <div class="category">
                        <h2>Discount airdrop</h2>
                        <div class="cards">43 days left</div>
                    </div>
                    <div class="category">
                        <h2>Benefited users</h2>
                        <div class="cards">2000 wallets</div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.banner-wrapper {
    justify-content: center;
    display: flex;
    width: 100%;
}

.banner {
    width: 100%;
    padding: 1rem;
    position: relative;
    border-radius: 1rem;
    box-sizing: border-box;
    max-width: var(--body-a);
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.1);
}

.overlay {
    background: rgba(0, 0, 0, 0.4);
    color: var(--text-w);
    border-radius: 1rem;
    padding: 2rem;
}

.banner-header {
    gap: 2rem;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    align-items: flex-start;
    justify-content: space-between;

}

.header-left h1 {
    font-size: var(--text-size-8);
    /* 48px */
    margin-bottom: 1rem;
    margin: 0;
}

.bold {
    font-weight: 700;
}

.light {
    opacity: 0.85;
    font-weight: 300;
    margin-left: 0.5rem;
}

.features {
    padding: 0;
    list-style: none;
    text-align: left;
    margin: 1rem 0 0;
    font-size: var(--text-size-3);
}

.features li {
    margin-bottom: 0.75rem;
}

.header-right {
    font-size: var(--text-size-3);
    /* 18px */
}

.header-right strong {
    font-size: var(--text-size-4);
    /* 20px */
}

.product-sections {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}

.category {
    flex: 1;
    min-width: 200px;
}

.category h2 {
    font-size: var(--text-size-5);
    /* 24px */
    margin-bottom: 0.5rem;
    margin-bottom: 0.75rem;
}

.cards {
    background: var(--card-bg, #ffffff20);
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: var(--text-size-4);
    /* 20px */
    backdrop-filter: blur(4px);
}
</style>