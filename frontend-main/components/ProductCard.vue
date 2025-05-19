<template>
    <div class="p-product" @click="onSelect(props.data.id)">
        <div class="p-product-image">
            <img :src="props.data.image" :style="{ ...props.style }" alt="">
        </div>

        <div class="p-product-body">
            <span class="p-product-title">{{ `${truncateByWords(props.data.name, 10)}...` }}</span>

            <span class="p-product-rating flex">
                <RatingComp :rating="4" />
            </span>

            <span class="p-product-price">
                <span>

                </span>

                <span class="p-product-last" v-if="props.data.discount">
                    {{ props.data.price }}
                </span>

            </span>


        </div>
    </div>
</template>

<script setup>
import { truncateByWords } from '~/utils/utils'

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
span {
    line-height: 1.5rem;
}

.p-product {
    display: flex;
    cursor: pointer;
    overflow: hidden;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease;
    background: var(--background-a);
}

.p-product-image {
    overflow: hidden;
    width: 200px;
    height: 200px;
}

.p-product-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
    border-radius: var(--radius-a);

}

.p-product-body {
    padding: 0rem;
    display: flex;
    flex-direction: column;
    font-size: var(--text-size-1);
}

.p-product-title {
    font-size: var(--text-size-1);
    color: var(--text-a);
    margin-top: 0rem;
    font-weight: 500;
    overflow: hidden;

    text-overflow: ellipsis;
}

.p-product-price {
    font-size: var(--text-size-4);
    align-items: baseline;
    font-weight: 600;
    display: flex;
}


.p-product-last {
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

.p-product-rating {}

.p-product-rating span {
    color: var(--text-b);
    margin-left: 0.5rem;
    font-weight: 500;
}
</style>