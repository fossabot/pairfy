<template>
    <div class="card">
        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="flex flex-col gap-6">
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>

        <!--/////////////////////////-->

        <Toolbar class="mb-6">
            <template #start>
                <Button icon="pi pi-chevron-left" class="mr-2"  severity="secondary" @click="goBackRoute" />

                <Breadcrumb :model="navItems">
                    <template #item="{ item }">
                        <span style="font-weight: 600;">{{ item.label }}</span>
                    </template>
                    <template #separator> / </template>
                </Breadcrumb>
            </template>

            <template #end>
                <IconField style="margin-right: 1rem;">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </IconField>

                <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
            </template>
        </Toolbar>


        <DataTable class="card-datatable" ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id"
            :paginator="true" :rows="15" :filters="filters"
            @page="updateCursor()" @rowSelect="editProduct" selectionMode="single"
            paginatorTemplate="PrevPageLink   NextPageLink  CurrentPageReport"
            currentPageReportTemplate="Showing {first} to {last}" >
            <template #paginatorstart>
                <div style="color: var(--text-b);">
                    <span>{{ productCount }} Products</span>
                </div>
            </template>

            <template #header>
                <div class="datatable-header">
                    <RouterLink to="/create-product">
                        <Button label="New" icon="pi pi-plus" />
                    </RouterLink>
                </div>
            </template>


            <Column header="Image">
                <template #body="slotProps">
                    <img :src="buildImageUrl(slotProps.data)" :alt="slotProps.data.image" class="datatable-image" />
                </template>

            </Column>


            <Column field="id" header="ID" sortable style="min-width: 8rem">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>

            <Column field="sku" header="SKU" sortable style="min-width: 8rem">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>
            <Column field="name" header="Name" sortable style="min-width: 8rem; text-transform: capitalize;">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>
            <Column field="price" header="Price" sortable style="min-width: 8rem">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>
            <Column field="collateral" header="Collateral" sortable style="min-width: 8rem;">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.collateral) }}
                </template>
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>
            <Column field="category" header="Category" sortable style="min-width: 8rem; text-transform: capitalize;">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>

            <Column field="created_at" header="Date" sortable style="min-width: 8rem">
                <template #body="slotProps">
                    {{ convertDate(slotProps.data.created_at) }}
                </template>
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>
            <Column field="stock" header="Stock" sortable style="min-width: 4rem">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.stock ? 'stock' : 'out'"
                        :severity="getStockLabel(slotProps.data.stock)" />
                </template>
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 4rem">
                <template #body="slotProps">
                    <div class="datatable-control">
                        <Button icon="pi pi-trash" outlined size="small" rounded
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import { ref, computed, reactive, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';


const router = useRouter()

const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Product List' }
]);

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 1000 });
};

const queryOptions = {
    pollInterval: 1500,
}

const variablesRef = ref({
    "getProductsVariable": {
        "cursor": "NOT"
    }
})

const { result, onError } = useQuery(gql`
query($getProductsVariable: GetProductsInput!){
    getProducts(getProductsInput: $getProductsVariable){
        products {
            id
            name
            sku
            price
            collateral
            category
            stock
            media_url
            image_path
            image_set
            created_at
        }

        cursor
        count
    }
}
`,
    () => (variablesRef.value),
    queryOptions
);

onError(error => {
    showError("The connection to the server has failed, please try again later.");
})

const updateCursor = () => {
    variablesRef.value = {
        getProductsVariable: {
            cursor: result.value?.getProducts.cursor
        }
    }
}

const convertDate = (timestamp) => {
    const date = dayjs(parseInt(timestamp));

    return date.format('YYYY-MM-DD');
}

const productsTemp = ref([]);

const products = computed(() => productsTemp.value);

watch(result, value => {
    if (value) {
        productsTemp.value.push(...value.getProducts.products)
    }
}, { immediate: true })

const productCount = computed(() => result.value?.getProducts.count);

const toast = useToast();
const dt = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

const formatCurrency = (value) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'ADA' });
    return;
};

const buildImageUrl = (data) => {
    return data.media_url + data.image_path + data.image_set.split(",")[0]
}

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = () => {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    }
};


const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const getStockLabel = (status) => {
    switch (status) {
        case 1:
            return 'success';
        case 0:
            return 'danger';

        default:
            return null;
    }
};


const goBackRoute = () => {
    router.go(-1)
}


const editProduct = (event) => {
    router.push({
        name: 'edit-product',
        params: {
            id: event.data.id
        }
    })
}


</script>


<style scoped>
::v-deep(.p-toolbar) {
    background: transparent;
    padding: 0 1rem;
}

::v-deep(button) {
    font-size: var(--text-size-a);
}

.p-inputtext {
    font-size: var(--text-size-a);
}

::v-deep(.p-datatable-header) {
    background: transparent;
    border: none;
}

::v-deep(.p-datatable-header-cell) {
    background: transparent;
    border-top: 1px solid var(--border-a);
}

::v-deep(.p-datatable-paginator-bottom) {
    border: none;
    padding: 0.2rem;
}

::v-deep(.p-datatable-column-title) {
    font-weight: 600;
}

.p-datatable {
    font-size: var(--text-size-a);
    border: 1px solid var(--border-a);
    border-radius: 1rem;
}

.p-tag {
    font-size: var(--text-size-a);
    font-weight: 600;
}

.card {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
}

.card-datatable {
    margin-top: 1rem;
}

.datatable-header {
    display: flex;
    align-items: center;
}

.datatable-image {
    background: var(--background-b);
    width: 50px;
    height: 50px;
    border-radius: 4px;
    object-fit: contain;
    border: 1px solid var(--border-a);
}

.datatable-control {
    display: flex;
    justify-content: center;
}

.arrow {
    font-size: 12px;
}
</style>