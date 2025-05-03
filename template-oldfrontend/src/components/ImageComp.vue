<template>
    <div class="container" :style="{ ...props.containerStyle }">
        <img class="image" :src="imageUrl" :alt="imageUrl" :style="{ ...props.imageStyle }" />
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['src', 'containerStyle', 'imageStyle'])

const imageUrl = computed(() => props.src)



</script>

<style lang="css" scoped>
.container {
    justify-content: center;
    display: flex;
}

.image {
    background: var(--background-b);
    min-width: 50px;
    min-height: 50px;
    border-radius: 4px;
    object-fit: contain;
}
</style>