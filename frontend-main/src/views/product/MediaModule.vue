<template>
    <div class="media">
        <section v-if="getProductData">
            <div class="media-image">
                <Image :src="productImageList[selectedImageIndex]" alt="Image" width="500" height="500" previewIcon="pi-search" 
                    preview />
            </div>
            <div class="media-nav">
                <div class="media-item" :class="{ selected: selectedImageIndex === index }"
                    v-for="(item, index) in productImageList" :key="item" @click="selectImage(index)" @mouseover="selectImage(index)">
                    <img :src="item" alt="item">
                </div>
            </div>
        </section>

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
section {
    display: flex;
    flex-direction: column;
}

.media-nav {
    display: flex;
    margin-top: 2rem;
}

.media-image {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 600px;
    max-height: 600px;
}

.media-item {
    border: 1px solid var(--border-a);
    border-radius: 8px;
    width: 80px;
    height: 80px;
    margin-right: 1rem;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.media-item.selected {
    border: 2px solid var(--text-a);
}

.media-item img {
    width: 70px;
    height: 70px;
    object-fit: contain;
}

::v-deep(.p-image-preview-mask:hover) {
    background: transparent !important;
}
</style>