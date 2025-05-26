<template>
    <div class="ProductCard" :style="{ animationDelay: `${index * 100}ms` }" @click="onSelect(data.id)">
        <div class="ProductCard-image">
            <LoadingComp v-if="loading" :size="32" :borderWidth="3"/>
            <img v-show="!loading" :src="data.image" :alt="data.name" @load="loading = false" />
        </div>

        <div class="ProductCard-body">
            <span class="ProductCard-title">{{ truncateByWords(data.name, 15) }}...</span>

            <span class="ProductCard-rating">
                <RatingComp :rating="4" />
                <span>(1562)</span>
            </span>

            <span class="ProductCard-price">
                <small>$</small>
                <span>{{ formatUSD(data.discount ? data.discount_value : data.price) }}</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import { truncateByWords, formatUSD } from '~/utils/utils'

const props = defineProps({
    data: Object,
    index: Number
})

const loading = ref(true)
const router = useRouter()
const route = useRoute()

const onSelect = (id) => {
    router.push({
        name: 'p',
        params: { ...route.params, id }
    })
}
</script>

<style scoped>
.ProductCard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    border-radius: var(--radius-b);
    background: var(--background-a);
    border: 1px solid var(--border-a);
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background: #f3f3f3;
}

.loader {
    width: 28px;
    height: 28px;
    border: 3px solid #ccc;
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.ProductCard-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    position: relative;
    overflow: hidden;
}

.ProductCard-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.ProductCard-body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    font-size: var(--text-size-1);
}

.ProductCard-title {
    font-weight: 400;
    color: var(--text-a);
    font-size: var(--text-size-1);
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ProductCard-price {
    display: flex;
    align-items: center;
    font-weight: 500;
    margin-top: 0.25rem;
    font-size: var(--text-size-5);
}

.ProductCard-price small {
    font-size: var(--text-size-0);
    margin-right: 2px;
    margin-bottom: 8px;
}

.ProductCard-rating {
    display: flex;
    align-items: center;
    font-size: var(--text-size-1);
    margin-top: 0.25rem;
}

.ProductCard-rating span {
    font-size: var(--text-size-0);
    color: var(--text-b);
    margin-left: 0.25rem;
    line-height: normal; 
    font-weight: 400;
}
</style>