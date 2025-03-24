<template>
    <div class="panel">
        <CounterComp />
        <AdComp />
    </div>
</template>

<script setup>
import CounterComp from '@/views/home/CounterComp.vue';
import AdComp from '@/views/home/AdComp.vue';

</script>

<style lang="css" scoped>
.panel {
    transition: 0.2s;
    height: auto;
}
</style>