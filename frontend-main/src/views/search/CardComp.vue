<template>
    <div class="card flex">
        <div class="preview" @click="openProduct(content.id)">
            <img class="image" :src="content.image" alt="">
        </div>
        <div class="content">
            <span class="brand">{{ content.brand }}</span>
            <span class="title" @click="openProduct(content.id)">{{ content.name }}</span>
            <span class="rating flex">
                <RatingComp :rating="4" />
                <span class="rating-value">
                    {{ content.rating }}
                </span>
                <span class="reviews">({{ content.reviews }} reviews) </span>
            </span>

            <div class="price flex">
                <span> ${{ formatPriceToUSD(content.price) }} </span>
                <TagComp v-if="content.discount" :tag="`-${content.discount_value}% OFF`" type="discount" />
            </div>


            <TagComp v-if="content.best_seller" tag="Best seller" type="contrast" />
           
            <div class="shipping flex">
                <span>Free shipping</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import RatingComp from '@/components/RatingComp.vue';
import TagComp from '@/components/TagComp.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, inject } from 'vue';


const { formatPriceToUSD } = inject('utils');

const router = useRouter();

const theRoute = useRoute();

const props = defineProps(['content'])

const rating = ref(4 || props.content.rating);

const openProduct = (id) => {
    router.push({
        name: 'product',
        params: {
            ...theRoute.params,
            id
        },
    })

}
</script>

<style lang="css" scoped>
.card {
    border-top: 1px solid var(--border-a);
    padding: 1rem;
}

.preview {
    background: var(--background-b);
    border-radius: 12px;
    overflow: hidden;
    height: 220px;
    width: 220px;
}

.image {
    width: inherit;
    height: inherit;
    object-fit: contain;
}

.content {
    max-width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 1rem;
}

.brand {
    text-transform: capitalize;
    font-size: var(--text-size-1);
    font-weight: 600;
}

.title {
    margin-top: 0.5rem;
    text-transform: capitalize;
    font-size: var(--text-size-3);
    cursor: pointer;
}

.rating {
    margin-top: 0.5rem;
    align-items: baseline;
}

.rating-value {
    font-size: var(--text-size-1);
    margin-left: 0.5rem;
    font-weight: 500;
}

.price {
    font-size: var(--text-size-4);
    margin-top: 0rem;
    font-weight: 500;
}

.price span {
    margin-right: 0.25rem;
}

.reviews {
    font-size: var(--text-size-0);
    margin-left: 0.5rem;
    font-weight: 400;
    color: var(--text-b);
}

.shipping {
    font-size: var(--text-size-1);
    color: var(--green-a);
    margin-top: 0rem;
    font-weight: 500;
}


/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) { 
  .preview{
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
  }

  .title{
    font-size: var(--text-size-1);
  }

  .content{
    max-width: 100%;
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