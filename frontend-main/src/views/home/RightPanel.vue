<template>
    <div class="panel">
        <div class="panel-head">


            <div class="panel-clock">
                <div class="title">
                    Blackday countdown
                </div>

                <CounterComp />
            </div>

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

.panel-head .title {
    font-size: var(--text-size-2);
    margin-bottom: 1rem;
    font-weight: 700;
}
 
.panel-clock {
    border: 1px solid var(--border-a);
    border-radius: 12px;
    padding: 1rem;
}
</style>