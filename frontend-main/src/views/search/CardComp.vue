<template>
    <div class="card flex">
        <div class="preview" @click="openProduct(content.id)">
            <img class="image" :src="content.image" alt="">
        </div>
        <div class="content">
            <span class="brand">{{ content.brand }}</span>
            <span class="title" @click="openProduct(content.id)">{{ content.name }}</span>
            <span class="rating flex">
                <Rating v-model="rating" :stars="5" readonly />
                <span class="rating-value">
                    {{ content.rating }}
                </span>
                <span class="reviews">({{ content.reviews }} reviews) </span>
            </span>
    
            <span class="price">${{ formatPriceToUSD(content.price) }}</span>

            <span class="tag flex best" v-if="content.best_seller">
                Best seller
            </span>
            <span class="tag flex discount" v-if="content.discount">
                {{ `-${content.discount_value}%` }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, inject } from 'vue';

const { formatPriceToUSD } = inject('utils');

const router = useRouter();

const theRoute = useRoute();

const props = defineProps(['content'])

const rating = ref(props.content.rating);

const openProduct = (id) => {
    router.push({
        name: 'product',
        params: {
            ...theRoute.params,
            id
        },
    })

}
</script>

<style lang="css" scoped>
.card {
    padding: 1rem 0;
    border-top: 1px solid var(--border-a);
}

.preview {
    overflow: hidden;
    width: 220px;
    height: 220px;
    border-radius: 16px;
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
    height: 220px;
    padding: 0 1rem;
}

.brand {
    text-transform: capitalize;
    font-size: var(--text-size-2);
    font-weight: 600;
}

.title {
    text-transform: capitalize;
    font-size: var(--text-size-3);
    cursor: pointer;
}

.rating {
    align-items: baseline;
}

.rating-value {
    margin-left: 0.5rem;
    font-weight: 500;
    font-size: var(--text-size-1);
}

.tag {
    font-size: var(--text-size-2);
    justify-content: center;
    white-space: nowrap;
    text-align: center;
    color: var(--text-w);
    max-width: fit-content;
    display: inline-block;
    border-radius: 2px;
    padding: 4px 6px;
    margin-top: 0.5rem;
    line-height: 16px;
   
}

.price {
    font-size: var(--text-size-4);
    font-weight: 600;
    margin-top: 0.5rem;
}

.reviews {
    font-size: var(--text-size-0);
    margin-left: 0.5rem;
    font-weight: 400;
    color: var(--text-b);
}
</style>