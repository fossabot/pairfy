<template>
        <div class="preview" v-if="getProductData">
            <div class="preview-top">
                <span>3 Sold </span>
            </div>


            <div class="preview-name">
                {{ getProductData.name }}
            </div>

            <div class="preview-model">
                <span>{{ getProductData.model }} <span></span> SKU {{ getProductData.sku.split(":")[0] }} </span>
            </div>

            <Divider />

            <div class="preview-price flex">
                <div>$</div>
                <span>
                    {{ formatCurrency(
                        applyDiscount(getProductData.discount,
                            getProductData.price,
                            getProductData.discount_value)
                    ) }}
                </span>
            </div>

            <div class="preview-discount" v-if="getProductData.discount">
                <Tag severity="contrast" :value="`- ${getProductData.discount_value}%`" />


                <Tag severity="secondary" style="margin: 0 1rem;">
                    <span style="text-decoration: line-through;">${{ formatCurrency(getProductData.price) }} USD</span>
                </Tag>

            
                <Tag :value="`${convertUSDToADA(
                    applyDiscount(getProductData.discount,
                        getProductData.price,
                        getProductData.discount_value), getADAprice)} ADA`" severity="secondary" />
            </div>


            <div class="preview-variants flex ">
                <span>Color</span>
                <span>:</span>
                <label> {{ getProductData.color_name }}</label>
                <div :style="{ backgroundColor: `#${getProductData.color}` }" />
            </div>


            <div class="preview-about">About this item</div>
            <ul class="preview-bullet">
                <li v-for="item in bulletList" :key="item">{{ item }}</li>
            </ul>
        </div>
   
</template>

<script setup>
import headerAPI from '@/components/header/api';
import productAPI from '@/views/product/api/index';
import { inject, computed } from 'vue';

const { formatCurrency, applyDiscount, convertUSDToADA } = inject('utils');

const { getADAprice } = headerAPI();

const { getProductData } = productAPI();

const bulletList = computed(() => {
    const strings = getProductData.value.bullet_list.split(",");

    return strings.sort((a, b) => a.length - b.length);
});


</script>

<style lang="css" scoped>
.preview {
    min-height: 400px;
}

.preview-top {
    font-size: var(--text-size-1);
}

.preview-name {
    font-size: var(--text-size-4);
    font-weight: 500;
    margin-top: 1rem;
}

.preview-rating {
    margin-top: 1rem;
}

.preview-price {
    font-size: var(--text-size-5);
    margin-top: 1rem;
}

.preview-price div {
    margin-right: 0.25rem;
}

.preview-discount {
    margin-top: 1rem;
}

.preview-model {
    display: flex;
    font-size: var(--text-size-1);
    margin-top: 1rem;
}

.preview-model span {
    margin-right: 1rem;
}

.preview-about {
    font-weight: 600;
    font-size: var(--text-size-2);
    line-height: 4rem;
}

.preview-bullet {
    font-size: var(--text-size-1);
    padding-left: 1rem;
}

.preview-bullet li {
    line-height: 2rem;
    padding-left: 10px;
}

.preview-variants {
    margin-top: 2rem;
}

.preview-variants label {
    font-weight: 600;
    margin: 0 0.5rem;
}

.preview-variants div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
}
</style>