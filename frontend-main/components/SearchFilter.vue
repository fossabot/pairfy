<template>
    <div class="SearchFilter">
        <FolderComp :tabs="filterTabs">
            <template #content="{ index }">
                <SearchFilter1 />
            </template>
        </FolderComp>
    </div>
</template>

<script setup>

const filterTabs = ref(['Filter1', 'Filter2'])
</script>

<style lang="css" scoped>
.SearchFilter {
    justify-content: center;
    width: inherit;
    display: flex;
}
</style>