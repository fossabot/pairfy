<template>
    <div class="wrap">
        <div class="mask">
            x
        </div>
        <div class="card">

        </div>
    </div>
</template>

<script setup>

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
    position: absolute;
    top: 100px;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("https://http2.mlstatic.com/D_NQ_NP_611714-MLA74839334020_032024-OO.jpg");
}

.card {
    max-width: 1184px;
    width: 80%;
    height: 500px;
    margin-top: 150px;
    background: #ffffff;
    position: relative;
    z-index: 10;
    border-radius: 8px;
    border: 1px solid var(--border-a);
}
</style>