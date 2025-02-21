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

            <div class="price flex">
                <span> ${{ formatPriceToUSD(content.price) }} </span>
                <TagComp v-if="content.discount" :tag="`-${content.discount_value}% OFF`" type="discount" />
            </div>


            <TagComp v-if="content.best_seller" tag="Best seller" type="contrast" />
           
            <div class="shipping flex">
                <span>Free shipping</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import TagComp from '@/components/TagComp.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, inject } from 'vue';


const { formatPriceToUSD } = inject('utils');

const router = useRouter();

const theRoute = useRoute();

const props = defineProps(['content'])

const rating = ref(4 || props.content.rating);

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
    font-size: var(--text-size-1);
    font-weight: 600;
}

.title {
    margin-top: 0.5rem;
    text-transform: capitalize;
    font-size: var(--text-size-2);
    cursor: pointer;
}

.rating {
    margin-top: 0.25rem;
    align-items: baseline;
}

.rating-value {
    font-size: var(--text-size-1);
    margin-left: 0.5rem;
    font-weight: 500;
}

.price {
    font-size: var(--text-size-4);
    margin-top: 0.25rem;
    font-weight: 500;
}

.price span {
    margin-right: 0.25rem;
}

.reviews {
    font-size: var(--text-size-0);
    margin-left: 0.5rem;
    font-weight: 400;
    color: var(--text-b);
}

.shipping {
    font-size: var(--text-size-1);
    color: var(--green-a);
    margin-top: 0rem;
    font-weight: 500;
}

</style>