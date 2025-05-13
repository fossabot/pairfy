<template>
    <div class="container" :style="{ ...props.containerStyle }">
        <img class="image" :src="imageSrc" :style="{ ...props.imageStyle }" @error="onImageError" />
    </div>
</template>

<script setup>
import placeholderImage from '@/assets/placeholder/image.svg'
import { computed } from 'vue';

const props = defineProps(['src', 'containerStyle', 'imageStyle'])

const imageUrl = ref(props.src);

const imageSrc = computed(() => imageUrl.value)

const onImageError = () => {
    imageUrl.value = placeholderImage;
};
</script>

<style lang="css" scoped>
.container {
    justify-content: center;
    display: flex;
}

.image {
    min-width: 50px;
    min-height: 50px;
    border-radius: 4px;
    object-fit: contain;
}
</style>