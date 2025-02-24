<template>
    <div class="button">
        <span class="cart">3</span>

        <img class="icon" src="@/assets/icons/cart.svg" alt=""> 
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    margin: auto;
    position: relative;
}

.button span {
    line-height: initial;
}

.cart {
    font-size: var(--text-size-2);
    color: var(--primary-a);
    background: transparent;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    position: absolute;
    font-weight: 700;
    display: flex;
    right: -5px;
    top: 3px;
    left: 2px;
}

.icon{
    width: 2.5rem;
}
</style>