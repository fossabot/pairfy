<template>
    <div class="media">
        <div class="media-nav">
            <div class="media-item" @click="selectImage(0)">
                <img :src="productImageList[0]" alt="item">
            </div>
            <div class="media-item" @click="selectImage(1)">
                <img :src="productImageList[1]" alt="item">
            </div>
            <div class="media-item" @click="selectImage(2)">
                <img :src="productImageList[2]" alt="item">
            </div>
            <div class="media-item" @click="selectImage(3)">
                <img :src="productImageList[3]" alt="item">
            </div>
            <div class="media-item" @click="selectImage(4)">
                <img :src="productImageList[4]" alt="item">
            </div>
            <div class="media-item" @click="selectImage(5)">
                <img :src="productImageList[5]" alt="item">
            </div>
            <div class="media-item" @click="selectImage(6)">
                <img :src="productImageList[6]" alt="item">
            </div>
        </div>
        <div class="media-preview">
            <Image :src="productImageList[selectedImageIndex]" alt="Image" width="350" height="350" preview />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import productAPI from '@/views/product/api/index';

const { getProductData } = productAPI();

const emptyImage = "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6534/6534615cv13d.jpg;maxHeight=640;maxWidth=550;format=webp";

const selectedImage = ref(emptyImage);

const selectedImageIndex = ref(0);

const productImageList = computed(() => {
    let data = getProductData.value;

    let result = [];

    if (data) {
        const splited = data?.image_set.split(",")

        splited.forEach(element => {
            console.log(element)
            result.push(data.media_url + data.image_path + element)
        });

        while (result.length < 7) {
            result.push(emptyImage)
        }
    }

    return result
})

const selectImage = (index) => {
    selectedImageIndex.value = index;
}

</script>

<style lang="css" scoped>
.media {
    display: flex;
}

.media-nav {
    display: flex;
    flex-direction: column;
}

.media-preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

.media-item {
    border: 1px solid var(--border-a);
    border-radius: 8px;
    width: 56px;
    height: 56px;
    margin-bottom: 1rem;
    overflow: hidden;
    cursor: pointer;
}

.media-item img {
    width: inherit;
    height: inherit;
    object-fit: contain;
}
</style>