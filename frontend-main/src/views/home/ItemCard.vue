<template>
    <div class="card">
        <img :src="props.content.image" :alt="props.content.alt" >

        <div class="body">
            <span class="title">{{ reduceByLength(props.content.title, 30) }}</span>
            <span class="price flex">
                <span class="dollar">$</span>{{ formatPriceToUSD(props.content.price) }}

                <div class="tag" v-if="props.content.discount">
                    <span>SAVE {{ props.content.discount_value }}%</span>
                </div>
            </span>

            <div class="shipping flex green">
                <span>Free shipping</span>
            </div>

        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps(['content'])

const { formatPriceToUSD, reduceByLength } = inject('utils');



</script>

<style lang="css" scoped>
.card {
    overflow: hidden;
    cursor: pointer;
}

.card img {
    width: 100%;
    object-fit: contain;
    border-radius: 16px;
    background: var(--background-b);
}

.body {
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    font-size: var(--text-size-1);
}

.title{
    font-size: var(--text-size-1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.price {
    font-size: var(--text-size-3);
    margin-top: 0.25rem;
    color: var(--text-a);
    font-weight: 500;
}


.shipping {
    font-weight: 500;
    margin-top: 0.25rem;
}

.dollar {
    font-size: var(--text-size-1);
    margin-right: 2px;
}

.tag {
    margin-left: 0.5rem;
    text-align: center;
    border-radius: 2px;
    color: var(--text-w);
    font-weight: 500;
    font-size: var(--text-size-0);
    background: #000000;
    padding: 0 0.25rem;
}
</style>