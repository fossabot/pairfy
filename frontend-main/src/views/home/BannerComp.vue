<template>
    <div class="banner">
        <div class="banner-grid">
            <div class="banner-col">
               <LeftPanel />
            </div>
            <div class="banner-col">
                <BandComp/>
                <GridComp />
            </div>
            <div class="banner-col">
                <RightPanel />
            </div>
        </div>
    </div>
</template>

<script setup>
import LeftPanel from '@/views/home/LeftPanel.vue';
import BandComp from '@/views/home/BandComp.vue';
import GridComp from '@/views/home/GridComp.vue';
import RightPanel from '@/views/home/RightPanel.vue';

</script>

<style lang="css" scoped>
.banner {
    flex-direction: column;
    align-items: center;
    display: flex;
    width: 100%;
}

.banner-grid {
    grid-template-columns: 1fr 3.5fr 1fr;
    margin-top: 1rem;
    display: grid;
    z-index: 2;
    gap: 1rem;
    width: 100%;
    max-width: var(--body-a);
    max-height: var(--body-a);
}

.banner-col {
    display: grid;
    gap: 1rem;
}

.banner-col:first-child {
    grid-template-rows: auto;
}

.banner-col:nth-child(2) {
    grid-template-rows: 1fr 1fr;
}

.banner-col:last-child {
    grid-template-rows: auto;
}


@media (max-width: 768px) {
    .banner-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        height: auto;
    }

    .banner-col {
        grid-template-rows: auto;
    }
}
</style>