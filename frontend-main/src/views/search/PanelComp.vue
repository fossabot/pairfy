<template>
    <div class="panel">

        <div class="panel-row">
            <span class="label">Category</span>
            <span class="checkbox flex" v-for="(item, index) in categoryList" :key="index">
                <Checkbox v-model="newed" inputId="new" name="new" value="new" size="small" />
                <label for="new"> {{ item.name }} </label>
            </span>
        </div>

        <div class="panel-row">
            <span class="label">Condition</span>
            <span class="checkbox flex">
                <Checkbox v-model="newed" inputId="new" name="new" value="new" size="small" />
                <label for="new"> New </label>
            </span>
            <span class="checkbox flex">
                <Checkbox v-model="used" inputId="used" name="used" value="used" size="small" />
                <label for="used"> Used </label>
            </span>
        </div>

        <div class="panel-row">
            <span class="label">Price</span>
            <InputNumber v-model="price" inputId="mile" suffix=" USD" fluid />
            <div class="slider">
                <Slider v-model="price" :max="maxLimit" style="margin: 1rem 0.5rem;" />
            </div>
        </div>




        <div class="panel-row">
            <Button label="Go" severity="secondary" variant="outlined" />
        </div>

    </div>
</template>

<script setup>
import categories from '@/assets/categories.json';
import { ref } from 'vue';

const categoryList = ref(categories);

const maxLimit = ref(10000);

const price = ref(0);

const newed = ref(false)

const used = ref(false)

</script>

<style lang="css" scoped>
label {
    font-size: var(--text-size-0);
    margin-left: 0.5rem;
}

.panel {
    width: 400px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.panel-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.label {
    font-size: var(--text-size-1);
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.checkbox {
    margin-top: 0.5rem;
}

.button {
    padding: 0.75rem;
    background: transparent;
    border: 1px solid var(--border-a);
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
}
</style>