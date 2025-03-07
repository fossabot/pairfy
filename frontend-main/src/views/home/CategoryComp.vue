<template>
    <div class="panel">

        <div class="panel-item flex" v-for="item, index in categoryList" :key="index">

            <div class="image flex">
                <template v-if="index == 0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                </template>

                <template v-if="index == 1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </template>
            </div>

            <div class="label">
                {{ item.name }}
            </div>
        </div>

    </div>
</template>

<script setup>
import categories from '@/assets/categories.json';
import icon0 from '@/assets/icons/0.svg';
import { ref } from 'vue';

const categoryList = ref(categories)

</script>

<style lang="css" scoped>
.panel {
    background: var(--primary-a);
    padding: 1rem 0.5rem;
    border-radius: 12px;
    height: 100%;

}

.panel-item {
    font-size: var(--text-size-0);
    color: var(--text-w);
    border-radius: 6px;
    padding: 0.5rem;
    cursor: pointer;

}

.panel-item:hover {
    background: rgba(255, 255, 255, 1);
    color: var(--text-a);
}

.label {
    margin-left: 0.5rem;
}

.image svg {
    width: var(--text-size-3);
}
</style>