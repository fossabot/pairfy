<template>
    <div class="card flex">
        <div class="preview">
            <img class="image" :src="content.image" alt="">
        </div>
        <div class="content">
            <span class="brand">{{ content.brand }}</span>
            <span class="title">{{ content.name }}</span>
            <span class="rating flex">
                <Rating v-model="rating" :stars="5" readonly />
                <span class="rating-value">
                    {{ content.rating }}
                </span>
                <span class="reviews">(232 reviews) </span>
            </span>

            <span class="price">${{ formatPriceToUSD(content.price) }}</span>
            <span class="tag flex best" v-if="content.best_seller">
                BEST SELLER
            </span>
            <span class="tag flex discount" v-if="content.discount">
                {{ `- ${content.discount_value}% off` }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
const { formatPriceToUSD } = inject('utils');

const rating = ref(4);

const props = defineProps(['content'])

</script>

<style lang="css" scoped>
.card {
    margin: 0.5rem 0;
}

.preview {
    background: var(--background-b);
    overflow: hidden;
    width: 220px;
    height: 220px;
}

.image {
    width: inherit;
    height: inherit;
    object-fit: contain;
}

.content {
    max-width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-transform: capitalize;
    height: 220px;
    padding: 0.25rem 1rem;
}

.brand {
    font-size: var(--text-size-2);
    font-weight: 600;
}

.title {
    font-size: var(--text-size-2);
    cursor: pointer;
    margin-top: 0.25rem;
}

.title:hover {
    color: var(--primary-a);
}

.rating {
    margin-top: 0.5rem;
    align-items: baseline;
}

.rating-value {
    margin-left: 0.25rem;
    font-weight: 600;
    font-size: var(--text-size-1);
}

.tag {
    font-size: var(--text-size-0);
    justify-content: center;
    white-space: nowrap;
    text-align: center;
    color: var(--text-w);
    max-width: fit-content;
    display: inline-block;
    line-height: 12px;
    border-radius: 2px;
    padding: 4px 6px;
    font-weight: 400;
    margin-top: 0.5rem;
}

.price {
    margin-top: 0.5rem;
    font-size: var(--text-size-4);
    font-weight: 500;
}

.reviews {
    font-size: var(--text-size-0);
    margin-left: 0.25rem;
    font-weight: 400;
    color: var(--text-b);
}
</style>