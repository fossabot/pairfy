<template>
    <div class="panel">

        <div class="panel-row">
            <div class="message flex">
                <div class="flex">
                    <i class="pi pi-times" />
                </div>
                <span>Filters</span>
            </div>
        </div>

        <div class="panel-row">
            <span class="label">Category</span>
            <span class="checkbox flex" v-for="(item, index) in categoryList" :key="index">
                <Checkbox :value="item.name" v-model="selectedCategories" inputId="category" size="small" />
                <label for="category"> {{ item.name }} </label>
            </span>
        </div>

        <div class="panel-row">
            <span class="label">Condition</span>
            <span class="checkbox flex" v-for="(item, index) in conditionList" :key="index">
                <Checkbox :value="item.label" v-model="selectedCondition" inputId="condition" size="small" />
                <label for="condition"> {{ item.label }} </label>
            </span>
        </div>

        <div class="panel-row">
            <span class="label">Price</span>
            <span class="slider-text">${{ priceRange[0] }} – {{ priceRange[1] }}+</span>
            <div class="slider">
                <Slider v-model="priceRange" :max="maxLimit" style="margin: 1rem 0.5rem;" range />
            </div>
        </div>


        <div class="panel-row">
            <Button label="Go" severity="secondary" variant="outlined" />
        </div>

    </div>
</template>

<script setup>
import categories from '@/assets/categories.json';
import { computed, ref } from 'vue';

const categoryList = ref(categories);

const conditionList = ref([{
    label: "New",
    value: false
},
{
    label: "Used",
    value: false
}
]);

const maxLimit = ref(5000);

const price = ref(0);

const priceRange = ref([0, 2000]);

const selectedCategories = ref([]);

const selectedCondition = ref([]);

const used = ref(false)

</script>

<style lang="css" scoped>
label {
    font-size: var(--text-size-0);
    margin-left: 0.5rem;
    color: var(--text-b);
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
    margin-top: 1rem;
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

.slider-text {
    font-size: var(--text-size-1);
    font-weight: 500;
}

.message {
    font-size: var(--text-size-0);
    width: fit-content;
    border: 1px solid var(--border-a);
    padding: 0.5rem;
    border-radius: 8px;
    font-weight: 500;
    padding-left: 0;
}

.message div {
    cursor: pointer;
    padding: 0.5rem;
}

.message i {
    font-size: inherit;
}
</style>