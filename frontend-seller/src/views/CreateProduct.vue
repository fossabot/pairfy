<template>
    <main>
        <Toolbar>
            <template #start>
                <Button icon="pi pi-chevron-left" class="mr-2" severity="secondary" text />
                <Breadcrumb :model="navItems">
                    <template #item="{ item }">
                        <span style="font-weight: 600;">{{ item.label }}</span>
                    </template>
                    <template #separator> / </template>

                </Breadcrumb>


            </template>

            <template #center>

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
                        v-keyfilter="/^[a-zA-Z0-9- ]+$/" />
                    <InputGroup>

                        <InputText v-model="productPrice" type="text" placeholder="Product Price"
                            v-keyfilter="/^[0-9]+$/" />

                        <InputText v-model="productCollateral" type="text" placeholder="Product Collateral"
                            style="margin: 0 1rem;" v-keyfilter="/^[0-9]+$/" />

                        <InputText v-model="productSKU" type="text" placeholder="Product SKU"
                            v-keyfilter="/^[0-9]+$/" />
                    </InputGroup>

                    <InputGroup>

                        <InputText v-model="productModel" type="text" placeholder="Model" style="margin-right: 1rem;"
                            v-keyfilter="/^[a-zA-Z0-9 ]+$/" />

                        <InputText v-model="productBrand" type="text" placeholder="Brand"
                            v-keyfilter="/^[a-zA-Z0-9 ]+$/" />
                    </InputGroup>


                    <Editor v-model="editor" editorStyle="height: 320px" />


                    <div class="uploader">
                        <div class="grid" id="sortable-grid">
                            <div class="grid-item" data-id="1">1</div>
                            <div class="grid-item" data-id="2">2</div>
                            <div class="grid-item" data-id="3">3</div>
                            <div class="grid-item" data-id="4">4</div>
                            <div class="grid-item" data-id="5">5</div>
                            <div class="grid-item" data-id="6">6</div>
                            <div class="grid-item" data-id="7">7</div>
                            <div class="grid-item" data-id="8">8</div>
                        </div>
                    </div>

                </div>
                <div class="right-column">

                    <div class="box">
                        <div class="subtitle">
                            Category
                        </div>

                        <div class="box-content">
                            <Select v-model="productCategory" :options="productCategories" optionLabel="name"
                                placeholder="Select a category" style="width:100%; font-size: var(--text-size-a)" />
                        </div>
                    </div>

                    <div class="box">
                        <div class="subtitle">
                            Tags
                        </div>

                        <div class="box-content">
                            <AutoComplete v-model="productTags" inputId="multiple-ac-2" multiple fluid
                                placeholder="Keywords" :typeahead="false" inputStyle="font-size: var(--text-size-a)" />
                        </div>
                    </div>


                    <div class="box">
                        <div class="subtitle">
                            Color
                        </div>

                        <div class="box-content">
                            <ColorPicker v-model="productHex" />

                            <InputText v-model="productColor" type="text" placeholder="Color Name"
                                v-keyfilter="/^[a-zA-Z0-9 ]+$/" style="margin-left: 1rem;" />

                        </div>
                    </div>

                    <div class="box">
                        <div class="subtitle">
                            Stock
                        </div>

                        <div class="box-content">
                            <ToggleSwitch v-model="productStock" />
                        </div>
                    </div>

                    <div class="box-buttons">

                        <Button type="button" label="Discard" icon="pi pi-trash" :loading="loading" @click="load"
                            outlined style="width: 100%; font-size: var(--text-size-a)" />

                        <Button type="button" label="Publish" icon="pi pi-check" :loading="loading" @click="load"
                            style="width: 100%; font-size: var(--text-size-a)" />

                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Sortable from 'sortablejs';


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

const editor = ref();

const productName = ref(null);
const productPrice = ref(null);
const productCollateral = ref(null);
const productSKU = ref(null);
const productModel = ref(null);
const productBrand = ref(null);
const productTags = ref(null);


const productCategory = ref();

const productCategories = ref([
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

const productHex = ref("#000000");

const productColor = ref(null);

const productStock = ref(false);


onMounted(() => {
    new Sortable(document.getElementById('sortable-grid'), {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: function (evt) {
            var items = document.querySelectorAll('.grid-item');
            var orderArray = [];

            items.forEach(function (item) {
                orderArray.push(item.getAttribute('data-id'));
            });

            console.log('Final Order:', orderArray);
        }
    });
})



</script>

<style scoped>
::v-deep(.p-inputtext) {
    font-size: var(--text-size-a);
}

::v-deep(.p-select-label) {
    font-size: var(--text-size-a);
}

::v-deep(.p-toolbar) {
    padding: 0 1rem;
}

::v-deep(.p-colorpicker-preview) {
    border-radius: 50%;
}

::v-deep(.p-chip) {
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
    margin-bottom: 1rem
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


.box-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    border: 1px solid var(--border-a);
    padding: 1rem;
}

.grid-item {
    background: #f1f5f9;
    padding: 20px;
    height: 150px;
    text-align: center;
    border: 1px solid var(--border-a);
    cursor: grab;
    border-radius: 1rem;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>