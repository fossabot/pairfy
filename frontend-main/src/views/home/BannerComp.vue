<template>
    <div class="category">
        <div class="category-grid">
            <div class="category-col">
               <CategoryComp />
            </div>
            <div class="category-col">
                <BandComp/>
                <GridComp />
            </div>
            <div class="category-col">

            </div>
        </div>
    </div>
</template>

<script setup>
import CategoryComp from '@/views/home/CategoryComp.vue';
import BandComp from '@/views/home/BandComp.vue';
import GridComp from '@/views/home/GridComp.vue';

</script>

<style lang="css" scoped>
.category {
    flex-direction: column;
    align-items: center;
    display: flex;
    width: 100%;
}

.category-grid {
    grid-template-columns: 1fr 3.5fr 1fr;
    margin-top: 1rem;
    display: grid;
    z-index: 2;
    gap: 1rem;
    width: 100%;
    max-width: var(--body-a);
    max-height: var(--body-a);
}

.category-col {
    display: grid;
    gap: 1rem;
}

.category-col:first-child {
    grid-template-rows: auto;
}

.category-col:nth-child(2) {
    grid-template-rows: 1.5fr 1.5fr;
}

.category-col:last-child {
    background: var(--background-b);
    grid-template-rows: 1fr 2fr;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .category-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        height: auto;
    }

    .category-col {
        grid-template-rows: auto;
    }
}
</style>