<template>
    <main>
        <Toolbar>
            <template #start>
                <Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
                <Breadcrumb :model="navItems">
                    <template #item="{ item }">
                        <span style="font-weight: 600;">{{ item.label }}</span>
                    </template>
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
                    <InputText v-model="name" type="text" placeholder="Product Name" v-keyfilter.alphanum />
                    <InputGroup>

                        <InputText v-model="price" type="text" placeholder="Product Price" v-keyfilter.int />

                        <InputText v-model="collateral" type="text" placeholder="Product Collateral"
                            style="margin: 0 1rem;" v-keyfilter.int />

                        <InputText v-model="sku" type="text" placeholder="Product SKU" />
                    </InputGroup>
                    <Editor v-model="value" editorStyle="height: 320px" />
                </div>
                <div class="right-column">

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
::v-deep(.p-inputtext) {
    font-size: var(--text-size-a);
}

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
    display: grid;
    gap: 1rem;
}

.right-column {

    padding: 1rem;
}

.input {
    width: 100%;
    margin-bottom: 1rem;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>