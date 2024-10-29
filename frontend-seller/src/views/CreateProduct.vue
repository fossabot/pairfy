<template>
    <main>
        <Toolbar>
            <template #start>
                <Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
                <Breadcrumb :model="navItems">

                    <template #separator> / </template>

                </Breadcrumb>


            </template>

            <template #center>
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="Search" />
                </IconField>
            </template>

            <template #end>
                <SplitButton label="Save" :model="items"></SplitButton>
            </template>
        </Toolbar>

        <div class="wrap">
            <div class="title">
                Create Product
            </div>

        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
    {
        label: 'Update',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    }
])

const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Create Product' }
]);

</script>

<style>
main {
    padding: 2rem;
    flex: 1 1 auto;
    position: relative;
}

.wrap {
    border: 1px solid green;
}

.title {
    margin-bottom: 1.5rem;
}
</style>