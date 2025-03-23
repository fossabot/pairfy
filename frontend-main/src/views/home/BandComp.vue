<template>
    <div class="band-wrap flex">
        <div class="band-body" @mouseover="pauseBand" @mouseleave="startBand">
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
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import banner1 from '@/assets/banner/1.png';
import banner2 from '@/assets/banner/2.png';
import banner3 from '@/assets/banner/3.png';

const imageList = ref([
    {
        src: banner1
    },
    {
        src: banner2
    },
    {
        src: banner3
    },
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
.band-wrap {
    justify-content: center;
    width: 100%;
    z-index: 1;
    top: 0;
}

.band-body {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
    border-radius: 16px;
    max-width: var(--body-a);
}

.band-track {
    display: flex;
    width: inherit;
    height: inherit;

}

.band-item {
    background-repeat: no-repeat;
    background-position-y: 50%;
    background-size: cover;
    width: inherit;
    height: inherit;
    flex: 0 0 100%;

}

.band-arrow {
    background: rgba(0, 0, 0, 0.3);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 30px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 4;
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
    font-size: var(--text-size-5);
    color: var(--text-w);
    font-weight: 300;
}

.band-dots {
    justify-content: center;
    position: absolute;
    display: flex;
    bottom: 10px;
    width: 100%;
}

.band-dots button {
    width: 10px;
    height: 3px;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    margin: 0 5px;
    cursor: pointer;
    z-index: 4;
}

.band-dots button.active {
    background: #ffffff;
}


/* Small phones (up to 480px) */
@media (max-width: 480px) {

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