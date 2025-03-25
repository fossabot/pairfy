<template>
    <div class="p-media">
        <section v-if="getProductData">
            <div class="p-media-nav">
                <div class="p-media-nav-item flex" :class="{ selected: selectedImageIndex === index }"
                    v-for="(item, index) in productImageList" :key="item" @click="selectImage(index)"
                    @mouseover="selectImage(index)">
                    <img :src="item" alt="item">
                </div>
            </div>

            <div class="p-media-image">
                <Image :src="productImageList[selectedImageIndex]" alt="Image" :imageStyle="{ width: '100%', maxWidth: '500px', maxHeight: '500px', borderRadius: '6px' }"
                    previewIcon="pi-search" preview />
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
}

.p-media-nav {
    display: flex;
    flex-direction: column;
    padding-right: 1rem;
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
    align-items: flex-start;
    min-height: 500px;
    max-height: 500px;
    display: flex;
    width: 100%;
}

::v-deep(.p-image-preview-mask:hover) {
    background: transparent !important;
}
</style>