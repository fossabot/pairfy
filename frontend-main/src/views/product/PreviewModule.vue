<template>
    <div class="preview">
        <Skeleton v-if="!getProductData" width="100%" height="100%" />

        <div v-if="getProductData">
            <div class="preview-top">
                {{ getProductData.quality }} | +5 sold
            </div>


            <div class="preview-name">
                {{ getProductData.name }}
            </div>

            <div class="preview-rating">
                <Rating v-model="productRating" :stars="5" readonly />

            </div>
            <Divider />

            <div class="preview-price flex">
                <div>$</div>
                <span>
                    {{ formatCurrency(applyDiscount(getProductData.discount, getProductData.price,
                        getProductData.discount_value)) }}
                </span>
            </div>

            <div class="preview-discount" v-if="getProductData.discount">
                <Tag :value="`- ${getProductData.discount_value}%`" severity="contrast" />

                <Tag :value="`$${getProductData.price}`" severity="secondary"
                    style="text-decoration: line-through; margin-left: 1rem;" />
            </div>

            <div class="preview-variants">
                Color: <label>{{ getProductData.color_name }}</label>

                <div :style="{ backgroundColor: `#${getProductData.color}` }" />
            </div>

            <div class="preview-about">About this product</div>
            <ul class="preview-bullet">
                <li v-for="item in bulletList" :key="item">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';
import { inject, computed, ref } from 'vue';

const { formatCurrency, applyDiscount } = inject('utils')

const { getProductData } = productAPI();

const bulletList = computed(() => {
    const strings = getProductData.value.bullet_list.split(",");

    return strings.sort((a, b) => a.length - b.length);
});

const productRating = ref(4);
</script>

<style lang="css" scoped>
.preview {
    min-height: 400px;
    padding: 1rem;
}

.preview-name {
    font-size: var(--text-size-c);
    font-weight: 600;
    margin-top: 1rem;
}

.preview-rating {
    margin-top: 0.5rem;
}

.preview-price {
    font-size: var(--text-size-f);
    margin-top: 1rem;
}

.preview-price div {
    font-size: 15px;
    margin-bottom: 12px;
    margin-right: 6px;
}

.preview-discount {
    margin-top: 1rem;
}

.preview-top {
    display: flex;
    color: var(--text-b);
    font-size: var(--text-size-a);
}

.preview-about {
    font-weight: 700;
    font-size: var(--text-size-a);
    margin-top: 2rem;
}

.preview-bullet {
    font-size: var(--text-size-a);
    padding-left: 1rem;
}

.preview-bullet li {
    line-height: 1.5rem;
    margin-top: 8px;
    padding-left: 10px;
}

.preview-variants {
    margin-top: 2rem;
}

.preview-variants label {
    font-weight: 600;
}

.preview-variants div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>