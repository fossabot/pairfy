<template>
    <div class="p-media">
        <div class="p-media-nav">
            <div class="p-media-nav-item flex" :class="{ selected: selectedImageIndex === index }"
                v-for="(item, index) in productImageList" :key="item" @click="selectImage(index)"
                @mouseover="selectImage(index)">
                <img :src="item" alt="item">
            </div>
        </div>

        <div class="p-media-image">
            <img :src="productImageList[selectedImageIndex]" alt="">
        </div>

    </div>
</template>

<script setup>
const selectedImageIndex = ref(0);

const productImageList = computed(() => {
    let result = [
        "https://m.media-amazon.com/images/I/712dp0yAydL._AC_SX679_.jpg",
        "https://m.media-amazon.com/images/I/81NLMdXhvrL._AC_UY218_.jpg",
        "https://m.media-amazon.com/images/I/712dp0yAydL._AC_SX679_.jpg",
        "https://m.media-amazon.com/images/I/712dp0yAydL._AC_SX679_.jpg"
    ];

    return result
})

const selectImage = (index) => {
    selectedImageIndex.value = index;
}

</script>

<style lang="css" scoped>
.p-media {
    background: var(--background-a);
    border-radius: 18px;
    height: 600px; 

    display: flex;
}

.p-media-nav {
    flex-direction: column;
    padding-left: 2px;
    display: flex;
}

.p-media-nav-item {
    border: 1px solid var(--border-a);
    transition: var(--transition-a); 
    border-radius: var(--radius-b);
    justify-content: center;
    margin-bottom: 1rem;
    overflow: hidden;
    cursor: pointer;
    height: 3rem;
    width: 3rem;
}

.p-media-nav-item.selected {
    border: 1px solid var(--black-a);
}

.p-media-nav-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.p-media-image {
    margin: 0 auto;
    width: 800px;
}

.p-media-image img {
    width: 100%;

}

/* Small phones (up to 480px) */
@media (max-width: 480px) {
    .p-media {
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