<template>
    <div class="ProductCard" @click="onSelect(props.data.id)">
        <div class="ProductCard-image">
            <img :src="props.data.image" :style="{ ...props.style }" alt="">
        </div>

        <div class="ProductCard-body">
            <span class="ProductCard-title">{{ `${truncateByWords(props.data.name, 20)}...` }}</span>

            <span class="ProductCard-rating">
                <RatingComp :rating="4" />
                <span>(1562)</span>
            </span>

            <span class="ProductCard-price">
                <small>$</small>
                <span>{{ formatUSD(props.data.discount ? props.data.discount_value : props.data.price) }}</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import { truncateByWords, formatUSD } from '~/utils/utils'

const props = defineProps(['data', 'style'])

const route = useRoute();

const router = useRouter();

const onSelect = (id) => {
    router.push({
        name: 'p',
        params: {
            ...route.params,
            id
        }

    })
}
</script>

<style lang="css" scoped>
.ProductCard {
    padding: 1rem;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    border-radius: var(--radius-b);
    transition: transform 0.2s ease;
    background: var(--background-a);
    border: 1px solid var(--border-a);
}

.ProductCard-image {
    overflow: hidden;
    width: 200px;
    height: 200px;
}

.ProductCard-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
    border-radius: var(--radius-a);
}

.ProductCard-body {
    padding: 0rem;
    display: flex;
    flex-direction: column;
    font-size: var(--text-size-1);
}

.ProductCard-title {
    margin-top: 0rem;
    font-weight: 500;
    overflow: hidden;
    line-height: 1.5;
    color: var(--text-a);
    text-overflow: ellipsis;
    font-size: var(--text-size-1);
}

.ProductCard-price {
    font-size: var(--text-size-5);
    align-items: center;
    margin-top: 0.25rem;
    font-weight: 500;
    display: flex;
}

.ProductCard-price small {
    font-size: var(--text-size-0);
    margin-bottom: 8px;
    margin-right: 2px;
}

.ProductCard-rating {
    display: flex;
    align-items: center;
    font-size: var(--text-size-1);
}

.ProductCard-rating span {
    font-size: var(--text-size-0);
    color: var(--text-b);
    margin-left: 0.25rem;
    font-weight: 400;
    line-height: 0;
}
</style>