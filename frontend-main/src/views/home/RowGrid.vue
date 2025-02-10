<template>
    <div class="row">
        <div class="title flex">
            <span>{{ props.title }}</span>

            <div class="button flex">
                <i class="pi pi-arrow-right" />
            </div>
        </div>

        <div class="band flex">
            <div class="grid">
                <ItemCard v-for="(item, index) in itemList" :key="index" :content="item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ItemCard from '@/views/home/ItemCard.vue';
import { ref, computed } from 'vue';

const props = defineProps(['content', 'title'])

const maxItems = ref(7);

const itemList = computed(() => props.content.slice(0, maxItems.value));

</script>

<style lang="css" scoped>
.row {
    margin-top: 1rem;
    width: 100%;
    max-width: var(--body-a);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: var(--primary-a);
    padding: 1rem;
}

.title {
    justify-content: space-between;
    font-size: var(--text-size-3);
    color: var(--text-w);
    font-weight: 700;
    width: inherit;
}

.grid {
    text-align: center;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto;
    grid-auto-rows: auto;
    display: grid;
    gap: 0.5rem;
    margin-top: 1rem;
    border-radius: 16px;
}


.button {
    justify-content: center;
    border-radius: 999px;
    font-size: var(--text-size-1);
    font-weight: 500;
    cursor: pointer;
    background: var(--primary-a);
    color: var(--text-w);
    width: 40px;
    height: 40px;
}

@media (min-width: 768px) {}

@media (min-width: 1200px) {}
</style>