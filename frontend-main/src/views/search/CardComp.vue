<template>
    <div class="card flex">
        <div class="preview">
            <img class="image" :src="content.image" alt="">
        </div>
        <div class="content">
            <span class="brand">{{ content.brand }}</span>
            <span class="title">{{ content.title }}</span>
            <span class="discount flex" v-if="content.discount">
                {{ `- ${content.discount_value}%` }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['content'])

</script>

<style lang="css" scoped>
.card {
    margin: 0.5rem 0;
}

.preview {
    background: var(--background-b);
    overflow: hidden;
    width: 250px;
    height: 250px;
}

.image {
    width: inherit;
    height: inherit;
    object-fit: contain;
}

.content {
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-transform: capitalize;
    height: 250px;
    padding: 0.25rem 1rem;
}

.brand {
    font-size: var(--text-size-3);
    font-weight: 600;
}

.title {
    font-size: var(--text-size-2);
    cursor: pointer;
}

.title:hover {
    color: var(--blue-a);
}

.discount {
    margin-top: 0.25rem;
    background: #000000;
    font-size: var(--text-size-1);
    justify-content: center;
    color: var(--text-w);
    width: 50px;
}
</style>