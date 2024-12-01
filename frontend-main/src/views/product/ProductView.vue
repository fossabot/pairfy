<template>
    <div class="wrap">
        <div class="mask">
            x
        </div>
        <div class="card">
            <div class="card-left">
                1
            </div>
            <div class="card-right">
                <BuyModule />
            </div>
        </div>
    </div>
</template>

<script setup>
import BuyModule from "@/views/product/BuyModule.vue"
</script>

<style lang="css" scoped>
.wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--background-b);
}

.mask {
    height: 300px;
    width: inherit;
    position: relative;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("https://http2.mlstatic.com/D_NQ_NP_611714-MLA74839334020_032024-OO.jpg");
}

.card {
    max-width: 1184px;
    width: 80%;
    height: auto;
    margin-top: -150px;
    background: #ffffff;
    position: relative;
    z-index: 10;
    border-radius: 20px;
    border: 1px solid var(--border-a);
    display: grid;
    grid-template-columns: 70% 30%;
    padding: 1rem;
    box-sizing: border-box;
}

.card-left {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.card-right {
    min-height: 100vh;
}
</style>