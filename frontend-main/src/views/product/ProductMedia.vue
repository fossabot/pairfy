<template>
    <div class="p-media" v-if="getProductData">
        <div class="p-media-nav">
            <div class="p-media-nav-item flex" :class="{ selected: selectedImageIndex === index }"
                v-for="(item, index) in productImageList" :key="item" @click="selectImage(index)"
                @mouseover="selectImage(index)">
                <img :src="item" alt="item">
            </div>
        </div>

        <div class="p-media-image">
            <Image :src="productImageList[selectedImageIndex]" alt="Image"
                :imageStyle="{ width: '100%',  borderRadius: '6px', objectFit: 'contain' }"
                previewIcon="pi-search" preview />
        </div>

    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';
import { computed, ref } from 'vue';

const { getProductData } = productAPI();

const selectedImageIndex = ref(0);

const productImageList = computed(() => {
    let data = getProductData.value;

    let result = [];

    if (data) {
        const splited = data?.image_set.split(",")

        splited.forEach(element => {
            result.push(data.media_url + data.image_path + element)
        });
    }

    return result
})

const selectImage = (index) => {
    selectedImageIndex.value = index;
}

</script>

<style lang="css" scoped>
.p-media{
    display: flex;
}

.p-media-nav {
    flex-direction: column;
    padding-right: 1rem;
    display: flex;
    padding: 2px; 
}

.p-media-nav-item {
    border: 1px solid var(--border-a);
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    justify-content: center;
    margin-bottom: 1rem;
    width: 50px;
    height: 50px;
}

.p-media-nav-item.selected {
    outline: 2px solid var(--primary-b);

}

.p-media-nav-item img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.p-media-image {
    justify-content: center;
    min-width: 500px;
    max-width: 500px;
    min-height: 500px;
    max-height: 500px;
    display: flex;
    width: 100%;
}

::v-deep(.p-image-preview-mask:hover) {
    background: transparent !important;
}

/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) { 
.p-media{
    display: none; 
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