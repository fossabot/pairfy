<template>
    <section>
        <MediaModule />
        <PreviewModule />
    </section>
</template>

<script setup>
import MediaModule from './MediaModule.vue';
import PreviewModule from './PreviewModule.vue';

</script>

<style lang="css" scoped>

section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0rem;
}



</style>