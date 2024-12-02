<template>
    <div class="media">
        <Skeleton v-if="!getProductData" width="100%" height="100%" />

        <div v-if="getProductData" class="media-nav">
            <div class="media-item" :class="{ selected: selectedImageIndex === index }"
                v-for="(item, index) in productImageList" :key="item" @click="selectImage(index)">
                <img :src="item" alt="item">
            </div>
        </div>
        <div class="media-image">
            <Image :src="productImageList[selectedImageIndex]" alt="Image" width="400" preview
                previewIcon="pi-search" />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import productAPI from '@/views/product/api/index';

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
.media {
    display: flex;
}

.media-nav {
    display: flex;
    flex-direction: column;
}

.media-image {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
}

.media-item {
    border: 2px solid var(--border-a);
    border-radius: 8px;
    width: 58px;
    height: 58px;
    margin-bottom: 1rem;
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
    width: 56px;
    height: 56px;
    object-fit: contain;
}
</style>