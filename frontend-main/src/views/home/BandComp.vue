<template>
    <div class="band">
        <div class="band-track" :style="trackStyle">
            <div class="band-item" v-for="(item,index) in imageList" :key="index"
                :style="{ backgroundImage: `url(${item.src})` }">
            </div>
        </div>
        <div class="band-arrow left" @click="prevItem">
            <i class="pi pi-angle-left" />
        </div>
        <div class="band-arrow right" @click="nextItem">
            <i class="pi pi-angle-right" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import imageUrl from '@/assets/banner.png';

const imageList = ref([
    {
        src: imageUrl
    },
    {
        src: 'https://http2.mlstatic.com/D_NQ_977380-MLA81507563198_012025-OO.webp'
    },
    {
        src: 'https://http2.mlstatic.com/D_NQ_995753-MLA81751758697_012025-OO.webp'
    }
])

const currentIndex = ref(0);

const trackStyle = computed(() => ({
    transform: `translateX(-${currentIndex.value * 100}%)`,
    transition: 'transform 0.5s ease'
}));

const nextItem = () => {
    currentIndex.value = (currentIndex.value + 1) % imageList.value.length;
};

const prevItem = () => {
    currentIndex.value =
        (currentIndex.value - 1 + imageList.value.length) % imageList.value.length;
};

</script>

<style lang="css" scoped>
.band {
    width: 100%;
    max-width: 1600px;
    overflow: hidden;
    height: 325px;
    position: relative;
    display: flex;
}

.band-track{
    display: flex;
    width: inherit;
    height: inherit;
}

.band-item {
    background-size: cover;
    width: inherit;
    height: inherit;
    border-radius: 16px;
    flex: 0 0 100%;
}

.band-arrow {
    background: rgba(0, 0, 0, 0.1);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    bottom: calc(325px / 2 - 25px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.band-arrow.left {
    left: 1rem;
}

.band-arrow.right {
    right: 1rem;
}

.band-arrow i {
    font-size: var(--text-size-4);
    color: var(--text-w);
}
</style>