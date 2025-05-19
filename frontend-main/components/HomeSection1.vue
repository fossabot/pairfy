<template>
    <div class="HomeSection1">
        <VideoBackground>
            <BannerComp />
        </VideoBackground>
        <div class="rounded"/>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.HomeSection1 {
    height: 93vh;
    background: var(--black-a);
}

.rounded {
    top: -2rem;
    z-index: 1;
    width: 100%;
    height: 2rem;
    position: relative;
    background: var(--background-a);
    border-top-left-radius: var(--radius-e);
    border-top-right-radius: var(--radius-e);
}
</style>