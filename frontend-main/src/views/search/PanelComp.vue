<template>
    <div class="panel">

        <div class="panel-item">
            <span class="label">Price</span>
            <InputText v-model.number="value" :max="maxLimit" />
            <Slider v-model="value" class="w-full" />
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

const maxLimit = ref(100000);

const value = ref(0);


</script>

<style lang="css" scoped>

.panel {
    width: 400px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.panel-item{
    display: flex;
    flex-direction: column;
}

.label{
    font-size: var(--text-size-2);
    font-weight: 600;
}

</style>