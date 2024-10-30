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
                    <InputText v-model="productName" type="text" placeholder="Product Name"
                        v-keyfilter="/^[a-zA-Z0-9 ]+$/" />
                    <InputGroup>

                        <InputText v-model="productPrice" type="text" placeholder="Product Price"
                            v-keyfilter="/^[0-9]+$/" />

                        <InputText v-model="productCollateral" type="text" placeholder="Product Collateral"
                            style="margin: 0 1rem;" v-keyfilter="/^[0-9]+$/" />

                        <InputText v-model="productSKU" type="text" placeholder="Product SKU"
                            v-keyfilter="/^[0-9]+$/" />
                    </InputGroup>
                    <Editor v-model="editor" editorStyle="height: 320px" />
                </div>
                <div class="right-column">
                    <div class="box">
                        <div class="subtitle">
                            Category
                        </div>

                        <div class="box-content">
                            <Select v-model="selectedCity" :options="cities" optionLabel="name"
                                placeholder="Select a category" style="width:100%; font-size: var(--text-size-a)" />
                        </div>
                    </div>
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

const productName = ref();
const productPrice = ref();
const productCollateral = ref();
const productSKU = ref();

const editor = ref();

const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Create Product' }
]);

const selectedCity = ref();

const cities = ref([
    { name: "Electronics", code: "electronics" },
    { name: "Books", code: "books" },
    { name: "Music", code: "music" },
    { name: "Movies", code: "movies" },
    { name: "Games", code: "games" },
    { name: "Clothing & Accessories", code: "clothing" },
    { name: "Home & Garden", code: "home" },
    { name: "Beauty & Personal Care", code: "beauty" },
    { name: "Health & Household", code: "health" },
    { name: "Grocery & Gourmet Food", code: "food" },
    { name: "Toys, Hobbies & Collectibles", code: "toys" },
    { name: "Sports & Outdoors", code: "sports" },
    { name: "Automotive & Industrial", code: "industrial" },
    { name: "Pet Supplies", code: "pets" },
    { name: "Office Supplies & Equipment", code: "office" },
    { name: "Digital Content & Software", code: "software" },
]);
</script>

<style scoped>
::v-deep(.p-inputtext) {
    font-size: var(--text-size-a);
}

::v-deep(.p-select-label) {
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
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
}

.input {
    width: 100%;
    margin-bottom: 1rem;
}

.box {
    border: 1px solid var(--border-a);
    border-radius: .25rem;
}

.subtitle {
    border-bottom: 1px solid var(--border-a);
    font-size: var(--text-size-a);
    font-weight: 700;
    padding: 1rem;
}

.box-content {
    padding: 1rem;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>