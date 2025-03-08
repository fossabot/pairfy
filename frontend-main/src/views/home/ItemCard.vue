<template>
    <div class="card" @click="onSelect(props.content.id)">
        <div class="image" >
            <img :src="props.content.image" :style="{ ...props.style }" alt="" >
        </div>

        <div class="body">
            <span class="title">{{ reduceByLength(props.content.name, 40, '') }}</span> 

            <span class="price flex">
                <span class="dollar">$</span>
                
                {{ formatPriceToUSD(props.content.price) }}

                <div class="tag" v-if="props.content.discount">
                    <span>-{{ props.content.discount_value }}% OFF</span>
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
    overflow: hidden;
    cursor: pointer;
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
    font-weight: 600;
}

.price {
    font-size: var(--text-size-3);
    color: var(--text-a);
    margin-top: 0.5rem;
    font-weight: 400;
}

.dollar {
    margin-right: 2px;
}

.tag {
    font-size: var(--text-size-1);
    max-width: fit-content;
    display: inline-block;
    color: var(--green-a);
    margin-left: 0.25rem;
    white-space: nowrap;
    text-align: center;
    border-radius: 0px;
    line-height: 14px;
    font-weight: 500;
    padding: 4px 4px;
}

.image {
    overflow: hidden;
}

.image img{
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
}
</style>