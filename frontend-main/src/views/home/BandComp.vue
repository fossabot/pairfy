<template>
    <div class="band" @mouseover="pauseBand" @mouseleave="startBand">
        <div class="band-track" :style="trackStyle">
            <div class="band-item" v-for="(item, index) in imageList" :key="index"
                :style="{ backgroundImage: `url(${item.src})` }">
            </div>
        </div>
        <div class="band-arrow left" @click="prevItem">
            <i class="pi pi-angle-left" />
        </div>
        <div class="band-arrow right" @click="nextItem">
            <i class="pi pi-angle-right" />
        </div>

        <div class="band-dots">
            <button v-for="(image, index) in imageList" :key="index" :class="{ active: currentIndex === index }"
                @click="goItem(index)"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
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

const interval = ref(null);

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

const goItem = (index) => {
    currentIndex.value = index;
};

const startBand = () => {
    interval.value = setInterval(nextItem, 5000);
};

const pauseBand = () => {
    clearInterval(interval.value);
};

onMounted(() => {
    startBand();
});

onBeforeUnmount(() => {
    clearInterval(interval.value);
});

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

.band-track {
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

.band-arrow:hover {
    background: rgba(0, 0, 0, 0.2);
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

.band-dots {
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
}

.band-dots button {
    width: 10px;
    height: 3px;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    margin: 0 5px;
    cursor: pointer;
}

.band-dots button.active {
    background: #ffffff;
}
</style>