<template>
    <div class="panel">
        <CounterComp />
        <ChartComp />
    </div>
</template>

<script setup>
import CounterComp from '@/views/home/CounterComp.vue';
import ChartComp from '@/views/home/ChartComp.vue';

</script>

<style lang="css" scoped>
.panel {
    transition: 0.2s;
    height: auto;
}
</style>