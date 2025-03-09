<template>
    <div class="panel">
        <div class="panel-head">
            <CounterComp />
        </div>
    </div>
</template>

<script setup>

import CounterComp from '@/views/home/CounterComp.vue';

</script>

<style lang="css" scoped>
.panel {
    background: var(--background-a);
    transition: 0.2s;
    height: 100%;
}
</style>