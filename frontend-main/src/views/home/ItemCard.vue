<template>
    <div class="p-product" @click="onSelect(props.data.id)">
        <div class="p-product-image">
            <img :src="props.data.image" :style="{ ...props.style }" alt="">
        </div>

        <div class="p-product-body">
            <span class="p-product-title">{{ reduceByLength(props.data.name, 40, '') }}</span>

            <span class="p-product-price">
                <span>
                    {{
                        `$${formatPriceToUSD(applyDiscount(props.data.discount,
                            props.data.price,
                            props.data.discount_value))}`
                    }}

                </span>

                <span class="p-product-tag" v-if="props.data.discount" style="text-decoration: line-through;">
                    {{ formatPriceToUSD(props.data.price) }}
                </span>

            </span>

            <span class="p-product-rating">
                <RatingComp :rating="4" />
            </span>

        </div>
    </div>
</template>

<script setup>
import RatingComp from '@/components/RatingComp.vue';
import { useRouter, useRoute } from 'vue-router';
import { inject } from 'vue';

const { formatPriceToUSD, reduceByLength, applyDiscount } = inject('utils');

const props = defineProps(['data', 'style'])

const theRoute = useRoute();

const router = useRouter();

const onSelect = (id) => {
    router.push({
        name: 'product',
        params: {
            ...theRoute.params,
            id
        }

    })
}
</script>

<style lang="css" scoped>
span {
    line-height: 1.5rem;
}

.p-product {
    overflow: hidden;
    cursor: pointer;
}

.p-product-image {
    overflow: hidden;
}

.p-product-image img {
    width: 100%;
    object-fit: cover;
    border-radius: 0px;
}

.p-product-body {
    padding: 0rem;
    display: flex;
    flex-direction: column;
    font-size: var(--text-size-1);
}

.p-product-title {
    font-size: var(--text-size-1);
    text-overflow: ellipsis;
    color: var(--text-b);
    margin-top: 0rem;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.p-product-price {
    font-size: var(--text-size-3);
    color: var(--orange-a);
    align-items: baseline;
    margin-top: 0rem;
    font-weight: 600;
    display: flex;
}


.p-product-tag {
    font-size: var(--text-size-1);
    background: transparent;
    max-width: fit-content;
    display: inline-block;
    color: var(--text-b);
    white-space: nowrap;
    margin-left: 0.5rem;
    text-align: center;
    font-weight: 400;
}

.p-product-rating {

}
</style>