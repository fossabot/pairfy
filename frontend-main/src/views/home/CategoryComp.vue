<template>
    <div class="panel">

        <div class="panel-item flex" v-for="item, index in categoryList" :key="index">
            <div class="icon">
                <i class="pi pi-user" />
            </div>
            <div class="label">
                {{ item.name }}
            </div>
        </div>

    </div>
</template>

<script setup>
import categories from '@/assets/categories.json';
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

.panel-item:hover{
    background: rgba(255,255,255, 1);
    color: var(--text-a);
}

.label {
    margin-left: 0.5rem;
}

</style>