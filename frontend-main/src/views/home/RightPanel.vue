<template>
    <div class="panel">
        <div class="panel-head">

            <div class="title">
                Blackday countdown
            </div>

            <CounterComp />

        </div>
    </div>
</template>

<script setup>

import CounterComp from '@/views/home/CounterComp.vue';

</script>

<style lang="css" scoped>
.panel {
    background: var(--background-b);
    border-radius: 12px;
    transition: 0.2s;
    padding: 1rem;
    height: 100%;
}

.panel-head .title {
    font-size: var(--text-size-2);
    font-weight: 700;
}
</style>