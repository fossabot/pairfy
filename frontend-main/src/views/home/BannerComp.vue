<template>
    <div class="banner">
        <div class="banner-grid">
            <div class="banner-column left">
                <LeftPanel />
            </div>
            <div class="banner-column center">
                <BandComp />
                <GridComp />
            </div>
            <div class="banner-column right">
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

.banner-column {
    display: grid;
    gap: 1rem;
}

.banner-column:first-child {
    grid-template-rows: auto;
}

.banner-column:nth-child(2) {
    grid-template-rows: 0.75fr 1fr;
}

.banner-column:last-child {
    grid-template-rows: auto;
}


/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {
    .banner-grid {
        display: flex;
        flex-direction: column;
    }


    .banner-column.left {
        display: none;
    }
    
    .banner-column.right{
        display: flex;
        flex-direction: column;
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