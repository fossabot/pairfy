<template>
    <div class="panel">

        <div class="panel-row">
            <div class="message flex" v-if="filterEnabled" @click="clearFilter">
                <div class="flex">
                    <i class="pi pi-times" />
                </div>
                <span>Filters</span>
            </div>
        </div>

        <div class="panel-row">
            <span class="label">Condition</span>
            <span class="checkbox flex">
                <Checkbox binary trueValue="New" :falseValue="null" v-model="condition" inputId="newed" size="small" />
                <label for="newed"> New</label>
            </span>
            <span class="checkbox flex">
                <Checkbox binary trueValue="Used" :falseValue="null" v-model="condition" inputId="used" size="small" />
                <label for="used"> Used </label>
            </span>
            <span class="checkbox flex">
                <Checkbox binary trueValue="Refurbished" :falseValue="null" v-model="condition" inputId="refurbished" size="small" />
                <label for="refurbished"> Refurbished </label>
            </span>
        </div>


        <div class="panel-row">
            <span class="label">Category</span>
            <span class="checkbox flex" v-for="(item, index) in categoryList" :key="index">
                <Checkbox :value="item.name" v-model="category" inputId="category" size="small" />
                <label for="category"> {{ item.name }} </label>
            </span>
        </div>


        <div class="panel-row">
            <span class="label">Price</span>
            <span class="slider-text">{{ priceRange[0] }} – {{ priceRange[1] }} USD</span>
            <div class="slider">
                <Slider v-model="priceRange" :max="maxLimit" style="margin: 1rem 0.5rem;" range />
            </div>
        </div>

        <div class="panel-row">
            <Button label="Go" severity="secondary" variant="outlined" @click="onFilter" />
        </div>

    </div>
</template>

<script setup>
import categories from '@/assets/categories.json';
import { computed, ref, watch, inject, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { randomString } = inject('utils');

const theRoute = useRoute();

const router = useRouter();

const currentRoute = ref(null);

const unwatchRoute = watch(theRoute,
    (route) => {
        currentRoute.value = route;
    },
    { immediate: true }
);

const categoryList = ref(categories);

const maxLimit = ref(5000);

const condition = ref(false);

const priceRange = ref([0, 2000]);

const category = ref([]);

const filterEnabled = computed(() => {
    if (currentRoute.value.query.f) {
        return true
    }

    if (currentRoute.value.query.qy) {
        return true
    }

    if (currentRoute.value.query.cs) {
        return true
    }

    if (currentRoute.value.query.gte) {
        return true
    }

    if (currentRoute.value.query.lte) {
        return true
    }

    return false

})


const clearFilter = () => {
    router.push({
        search: 'search',
        ...currentRoute.value.params,
        query: {
            k: currentRoute.value.query.k,
            tag: randomString(10)
        }
    })

    condition.value = false;

    priceRange.value = [0, 2000];

    category.value = [];
}



const onFilter = () => {
    router.push({
        name: 'search',
        ...currentRoute.value.params,
        query: {
            k: currentRoute.value.query.k,
            f: true,
            cs: category.value.join(","),
            qy: condition.value || null,
            gte: priceRange.value[0],
            lte: priceRange.value[1]
        }
    })
}

onBeforeUnmount(() => {
    unwatchRoute()
})

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