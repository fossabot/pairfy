<template>
    <div class="card" @click="onSelect(props.content.id)">
        <div class="image">
            <img :src="props.content.image" :style="{ ...props.style }" alt="">
        </div>

        <div class="body">
            <span class="title">{{ `${reduceByLength(props.content.name, 40, '')}...` }}</span>

            <span class="price flex">
                <span class="dollar">$</span>

                {{ formatPriceToUSD(props.content.price) }}

                <div class="tag" v-if="props.content.discount">
                    <span>-{{ props.content.discount_value }}%</span>
                </div>
            </span>

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
.card {
    background: var(--background-a);
    box-shadow: var(--shadow-b);
    overflow: hidden;
    cursor: pointer;
    padding: 1rem;
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
    margin-top: 0.25rem;
    overflow: hidden;
    font-weight: 400;
}

.price {
    font-size: var(--text-size-3);
    color: var(--primary-a);
    margin-top: 0.25rem;
    font-weight: 600;
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
    margin-left: 0.5rem;
    white-space: nowrap;
    text-align: center;
    border-radius: 0px;
    line-height: 14px;
    font-weight: 500;
    padding: 4px 4px;
}
</style>