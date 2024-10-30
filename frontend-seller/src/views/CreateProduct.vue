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

        <div class="card">
            <div class="title">
                Create Product
            </div>

            <div class="container">
                <div class="left-column">
                    Left Column (70%)
                </div>
                <div class="right-column">
                    Right Column (30%)
                </div>
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

<style scoped>
main {
    padding: 2rem;
    flex: 1 1 auto;
    position: relative;
}

.card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-a);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-top: 1rem;
}

.title {
    margin-bottom: 1.5rem;
    font-weight: 700;
}

.container {
    display: grid;
    grid-template-columns: 70% 30%;
}

.left-column {
    background-color: lightblue;
    padding: 20px;
}

.right-column {
    background-color: lightcoral;
    padding: 20px;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>