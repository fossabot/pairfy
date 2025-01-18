<template>
    <div class="panel">

        <div class="panel-row">
            <span class="label">Price</span>
            <InputNumber v-model="price" inputId="mile" suffix=" USD" fluid />
            <Slider v-model="price" style="margin: 1rem 0.5rem;" :max="maxLimit"/>
        </div>




    </div>
</template>

<script setup>
import { ref } from 'vue';

const maxLimit = ref(10000);

const price = ref(0);



</script>

<style lang="css" scoped>

.panel {
    width: 400px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.panel-row{
    display: flex;
    flex-direction: column;
}

.label{
    font-size: var(--text-size-1);
    font-weight: 700;
    margin-bottom: 0.25rem;
}

</style>