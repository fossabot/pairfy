<template>
    <div class="panel">

        <div class="panel-row">
            <span class="label">Price</span>
            <InputText v-model.number="price" :max="maxLimit" />
            <Slider v-model="price" />
        </div>




    </div>
</template>

<script setup>
import { ref } from 'vue';

const maxLimit = ref(100000);

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
    font-size: var(--text-size-2);
    font-weight: 600;
}

</style>