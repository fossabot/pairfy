<template>
    <div class="card">
        <img src="@/assets/ad/panel.png" alt="">
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.card {
    border: 1px solid var(--border-a);
    background: var(--background-w);
    box-sizing: border-box;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 1rem;
}

.card img{
    object-fit: cover; 
}
</style>