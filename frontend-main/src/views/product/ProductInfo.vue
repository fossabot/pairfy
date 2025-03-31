<template>
    <div class="preview" v-if="getProductData">

        <div class="preview-name">
            {{ getProductData.name }}
        </div>


        <div class="preview-model">
            <span>Model {{ getProductData.model }} </span>
            <span>|</span>
            <span> SKU {{ getProductData.sku.split(":")[0] }} </span>
            <span>|</span>
            <span>+{{ getProductData.sold }} Sold</span>
        </div>

        <div class="preview-rating flex">
            <span>4.3</span>
            <span>
                <RatingComp :rating="4" />
            </span>
            <span>433 ratings</span>
        </div>

        <Divider />

        <div class="preview-price flex">
  

            <span>
                {{ `$${formatPriceToUSD(getProductData.price)}` }}
            </span>

            <span class="preview-last">
                {{ formatPriceToUSD(applyDiscount(getProductData.discount,
                    getProductData.price,
                    getProductData.discount_value))
                }}
            </span>

            <span class="preview-tag">{{ `-${getProductData.discount_value}%` }}</span>
        </div>


        <div class="preview-color flex ">
            <span>Color</span>
            <span>:</span>
            <label> {{ getProductData.color_name }}</label>
            <div :style="{ backgroundColor: `#${getProductData.color}` }" />
        </div>

        <div class="preview-condition flex">
            <span>Condition</span>
            <span>:</span>
            <label> {{ getProductData.quality }}</label>
        </div>

        <div class="preview-about">All about this product</div>

        <ul class="preview-bullet">
            <li v-for="item in bulletList" :key="item">{{ item }}</li>
        </ul>

        <div class="preview-keywords flex"> 
            <div v-for="item in keywordList" :key="item">
                <span>{{ item }}</span>
            </div>
        </div>
    </div>

</template>

<script setup>
import headerAPI from '@/components/header/api';
import TagComp from '@/components/TagComp.vue';
import productAPI from '@/views/product/api/index';
import RatingComp from '@/components/RatingComp.vue';

import { inject, computed } from 'vue';

const { formatCurrency, applyDiscount, convertUSDToADA, formatPriceToUSD } = inject('utils');

const { getADAprice } = headerAPI();

const { getProductData } = productAPI();

const bulletList = computed(() => {
    const strings = getProductData.value.bullet_list.split(",");

    return strings.sort((a, b) => a.length - b.length);
});

const keywordList = computed(() => {
    const datum = getProductData.value;

    if (datum) {
        return datum.keywords.split(',');
    }

    return []
})

</script>

<style lang="css" scoped>
span {
    line-height: initial;
}

.preview {
    padding: 0 2rem;
}

.preview-name {
    font-size: var(--text-size-5);
    line-height: 2.25rem;
    font-weight: 500;
    width: 90%;
}

.preview-rating {
    margin-top: 1rem;
}

.preview-rating span:nth-child(1) {
    margin-right: 0.5rem;
}

.preview-rating span:nth-child(3) {
    margin-left: 0.5rem;
}

.preview-price {
    font-size: var(--text-size-6);
    align-items: baseline;
    margin-top: 1rem;
    font-weight: 400;
}

.preview-last {
    font-size: var(--text-size-4);
    text-decoration: line-through;
    margin-left: 0.5rem;
    font-weight: 300;
}

.preview-tag {
    font-size: var(--text-size-4);
    margin-left: 0.5rem; 
    color: var(--red-a);
    font-weight: 300;
}


.preview-model {
    font-size: var(--text-size-0);
    color: var(--text-b);
    margin-top: 1rem;
    display: flex;
}

.preview-model span {
    margin-right: 1rem;
}

.preview-about {
    margin-top: 1rem;
    font-weight: 600;
    font-size: var(--text-size-1);
}

.preview-bullet {
    margin-top: 1rem;
    font-size: var(--text-size-1);
    padding-left: 1rem;
}

.preview-bullet li {
    line-height: 2rem;
    padding-left: 10px;
}

.preview-color,
.preview-condition {
    margin-top: 1rem;
    text-transform: capitalize;
}

.preview-color label,
.preview-condition label {
    font-weight: 600;
    margin: 0 0.5rem;
}

.preview-color div {
    border-radius: 50%;
    width: 15px;
    height: 15px;
}

.preview-keywords {
    margin-top: 1rem;
}

.preview-keywords div{
    background: var(--background-b);
    padding: 0.25rem 0.5rem;
    margin-right: 0.5rem;
    border-radius: 4px;
}

/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) { 
    .preview {
    padding: 0 1rem;
}
}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) { 
  /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) { 
  /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) { 
  /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) { 
  /* Styles for large screens */
}

</style>