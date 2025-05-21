<template>
    <div class="Banner">
        <div class="Banner-body">
            <div class="overlay">

                <!-- Header -->
                <div class="Banner-header">
                    <div class="Banner-header-left">
                        <h1>
                            Buy and sell <span class="light"> on the Cardano</span> <span class="light">market</span>
                        </h1>
                        <ul class="features">
                            <li>✔ Community-governed</li>
                            <li>✔ Native asset payments</li>
                            <li>✔ Midnight network</li>
                            <li>✔ Free shipping</li>
                        </ul>
                    </div>

                    <div class="Banner-header-right">
                        <p><strong>5M+</strong> Factory direct supply</p>
                        <p><strong>10</strong> Local warehouses worldwide</p>
                        <p><strong>20M+</strong> Value dropshipping items</p>
                        <p><strong>24H</strong> Personalized sourcing service</p>
                    </div>
                </div>

                <!-- Cards Sections -->
                <div class="Banner-cards">
                    <div class="box">
                        <h2>Discount pool</h2>
                        <div class="cards">834.372 ADA / 53%</div>
                    </div>
                    <div class="box">
                        <h2>Discount airdrop</h2>
                        <div class="cards">43 days left</div>
                    </div>
                    <div class="box">
                        <h2>Benefited users</h2>
                        <div class="cards">1753 wallets</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.Banner {
    justify-content: center;
    display: flex;
    width: 100%;
}

.Banner-body {
    width: 100%;
    margin-top: 12rem;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    max-width: var(--body-a);
    border-radius: var(--radius-c);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.08);
}

.overlay {
    color: var(--text-w);
    padding: 2rem;
}

.Banner-header {
    gap: 2rem;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    align-items: flex-start;
    justify-content: space-between;

}

.Banner-header-left h1 {
    margin: 0;
    margin-bottom: 1rem;
    font-size: var(--text-size-9);
}

.bold {
    font-weight: 700;
}

.light {
    font-weight: 400;
}

.features {
    padding: 0;
    list-style: none;
    text-align: left;
    margin: 2rem 0 0;
    font-size: var(--text-size-4);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

}

.features li {
    margin-bottom: 1rem;
}

.Banner-header-right {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    font-size: var(--text-size-4);
    text-align: right;
}

.Banner-header-right strong {
    font-size: var(--text-size-4);
}

.Banner-cards {
    gap: 2rem;
    display: flex;
    flex-wrap: wrap;
}

.box {
    flex: 1;
    min-width: 200px;
}

.box h2 {
    font-size: var(--text-size-5);
    margin-bottom: 0.75rem;
    margin-bottom: 0.5rem;
}

.cards {
    padding: 1rem;
    font-size: var(--text-size-4);
    border-radius: var(--radius-f);
    background: rgba(255,255,255,0.1);
}
</style>