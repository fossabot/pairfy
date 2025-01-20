<template>
    <div class="card flex">
        <div class="preview">
            <img class="image" :src="content.image" alt="">
        </div>
        <div class="content">
            <span class="brand">{{ content.brand }}</span>
            <span class="title">{{ content.title }}</span>
            <span class="rating flex">
                <Rating v-model="rating" :stars="5" readonly />
                <span class="rating-value">
                    4.32
                </span>
                <span class="reviews">(232 reviews) </span>
            </span>

            <span class="price">${{ formatPriceToUSD(content.price) }}</span>
            <span class="tag flex best">
                BEST SELLER
            </span>
            <span class="tag flex discount" v-if="content.discount">
                {{ `- ${content.discount_value}%` }}
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
    width: 250px;
    height: 250px;
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
    height: 250px;
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
    color: var(--text-w);
    max-width: 50px;
    white-space: nowrap;
}

.tag.discount {
    background: var(--primary-a);
    margin-top: 0.5rem;

}

.tag.best {
    margin-top: 0.5rem;
    max-width: 90px;
    font-weight: 400;
    background: var(--text-a);
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