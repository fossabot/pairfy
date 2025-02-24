<template>
    <div class="button">
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

.icon{
    width: 1.5rem;
} 
</style>