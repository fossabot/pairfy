<template>
    <div class="card" @click="onSelect(props.content.id)">
        <div class="image">
            <img :src="props.content.image" :style="{ ...props.style }" alt="">
        </div>

        <div class="body">
            <span class="title">{{ reduceByLength(props.content.name, 40, '') }}</span>

            <span class="price">
                <span>
                    {{
                        `$${formatPriceToUSD(applyDiscount(props.content.discount,
                            props.content.price,
                            props.content.discount_value))}`
                    }}

                </span>

                <span class="tag" v-if="props.content.discount" style="text-decoration: line-through;">
                    {{ formatPriceToUSD(props.content.price) }}
                </span>

            </span>

            <span class="rating">
                <RatingComp :rating="4" />
            </span>

        </div>
    </div>
</template>

<script setup>
import RatingComp from '@/components/RatingComp.vue';
import { useRouter, useRoute } from 'vue-router';
import { inject, ref } from 'vue';

const { formatPriceToUSD, reduceByLength, applyDiscount } = inject('utils');

const props = defineProps(['content', 'style'])

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

.card {
    overflow: hidden;
    cursor: pointer;
}

.image {
    overflow: hidden;
}

.image img {
    width: 100%;
    object-fit: cover;
    border-radius: 0px;
}

.body {
    padding: 0rem;
    display: flex;
    flex-direction: column;
    font-size: var(--text-size-1);
}

.title {
    font-size: var(--text-size-1);
    text-overflow: ellipsis;
    color: var(--text-b);
    margin-top: 0rem;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.price {
    font-size: var(--text-size-3);
    color: var(--orange-a);
    align-items: baseline;
    margin-top: 0rem;
    font-weight: 600;
    display: flex;
}

.dollar {
    margin-right: 2px;
}

.tag {
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

.rating {}
</style>