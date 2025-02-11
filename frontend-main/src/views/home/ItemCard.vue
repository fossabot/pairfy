<template>
    <div class="card" @click="onSelect(props.content.id)">
        <div class="image" :style="{ backgroundImage: `url(${props.content.image})`, ...props.style }">
        </div>

        <div class="body">
            <span class="title">{{ reduceByLength(props.content.name, 30) }}</span>
            <span class="rating flex">
                <Rating v-model="rating" :stars="5" readonly />
                <span class="rate">4.2</span>
                <span class="line" />
                <span>2 sold</span>
            </span>
            <span class="price flex">
                <span class="dollar">$</span>{{ formatPriceToUSD(props.content.price) }}

                <div class="tag discount" v-if="props.content.discount">
                    <span>-{{ props.content.discount_value }}%</span>
                </div>
            </span>

            <div class="shipping flex green">
                <span>Free shipping</span>
            </div>

        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { formatPriceToUSD, reduceByLength } = inject('utils');

const props = defineProps(['content', 'style'])

const theRoute = useRoute();

const router = useRouter();

const rating = ref(4);

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
::v-deep(.p-rating-icon) {
    width: 10px !important;
    height: 10px !important;
}

.card {
    background: var(--background-a);
    overflow: hidden;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0px;
}

.body {
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    font-size: var(--text-size-1);
}

.title {
    font-size: var(--text-size-1);
    margin-top: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.price {
    font-size: var(--text-size-3);
    margin-top: 0.25rem;
    color: var(--text-a);
    font-weight: 600;
}

.shipping {
    font-size: var(--text-size-0);
    margin-top: 0.25rem;
    font-weight: 400;
}

.dollar {
    margin-right: 2px;
}

.tag {
    font-size: var(--text-size-0);
    white-space: nowrap;
    text-align: center;
    color: var(--text-w);
    max-width: fit-content;
    display: inline-block;
    border-radius: 0px;
    margin-left: 0.5rem;
    line-height: 14px;
    padding: 4px 4px;
}

.rating {
    font-size: var(--text-size-0);
    margin-top: 0.25rem;
    color: var(--text-b);
}

.line {
    background: #979797;
    display: inline-block;
    height: 10px;
    width: 1px;
    margin: 0 5px;
}

.rate {
    margin-left: 5px;
}

.image {
    border-radius: 0px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: 50%;
}
</style>