<template>
    <div class="card" @click="onSelect(props.content.id)">
        <div class="image">
            <img :src="props.content.image" :style="{ ...props.style }" alt="">
        </div>

        <div class="body">
            <span class="title">{{ reduceByLength(props.content.name, 40, '') }}</span>

            <span class="price">
                <span class="dollar">$</span>

                {{ formatPriceToUSD(props.content.price) }}

                <div class="tag" v-if="props.content.discount">
                    <span style="text-decoration: line-through;">$24</span>
                </div>
            </span>

            <span class="rating">
                <RatingComp :rating="4"/>
            </span>

        </div>
    </div>
</template>

<script setup>
import RatingComp from '@/components/RatingComp.vue';
import { useRouter, useRoute } from 'vue-router';
import { inject, ref } from 'vue';

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
    margin-top: 0rem;
    overflow: hidden;
    font-weight: 400;
    height: 23px;
}

.price {
    display: flex;
    align-items: baseline;
    font-size: var(--text-size-3);
    color: var(--primary-a);
    margin-top: 0rem;
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
    white-space: nowrap;
    margin-left: 0.5rem;
    text-align: center;
    font-weight: 400;
}
</style>