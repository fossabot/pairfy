<template>
    <div class="grid-container">
        <div class="grid-item">

        </div>
        <div class="grid-item">
         <CounterComp/>
        </div>
    </div>
</template>

<script setup>
import CounterComp from './CounterComp.vue';


</script>

<style scoped>
.grid-container {
    width: 100%;
    max-width: var(--body-a);
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem 0;
    gap: 1rem;
}

.grid-item {
    background: var(--background-b);
    align-items: center;
    display: flex;
    padding: 1rem;
    width: 100%;
}


/* Medium and above: side-by-side */
@media (min-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr 1fr;
        /* 2 columns */
    }
}
</style>