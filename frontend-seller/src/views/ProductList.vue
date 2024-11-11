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
                <Button icon="pi pi-chevron-left" class="mr-2" severity="secondary" text />

                <Breadcrumb :model="navItems">
                    <template #item="{ item }">
                        <span style="font-weight: 600;">{{ item.label }}</span>
                    </template>
                    <template #separator> / </template>
                </Breadcrumb>
            </template>

            <template #end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload
                    chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }"
                    style="margin-right: 1rem;" />

                <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
            </template>
        </Toolbar>

        {{ products }}
        <DataTable class="card-datatable" ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id"
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
            <template #header>
                <div class="datatable-header">
                    <RouterLink to="/create-product">
                        <Button label="New" icon="pi pi-plus" style="margin-right: 1rem;" />
                    </RouterLink>

                    <IconField style="margin-left: auto;">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </IconField>
                </div>
            </template>

            <Column header="Image">
                <template #body="slotProps">
                    <img :src="buildImageUrl(slotProps.data)" :alt="slotProps.data.image" class="datatable-image" />
                </template>
            </Column>


            <Column field="id" header="Id" sortable style="min-width: 8rem"></Column>
            <Column field="sku" header="Sku" sortable style="min-width: 8rem"></Column>
            <Column field="name" header="Name" sortable style="min-width: 8rem"></Column>
            <Column field="price" header="Price" sortable style="min-width: 8rem">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="collateral" header="Collateral" sortable style="min-width: 8rem">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.collateral) }}
                </template>
            </Column>
            <Column field="category" header="Category" sortable style="min-width: 8rem"></Column>
            <Column field="stock" header="Status" sortable style="min-width: 8rem">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.stock ? 'instock' : 'outstock'"
                        :severity="getStockLabel(slotProps.data.stock)" />
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)"
                        style="margin-right: 1rem;" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                        @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';



const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Product List' }
]);

onMounted(() => {
    const productsData = ref([
        {
            id: '1000',
            code: 'f230fh0g3',
            sku: "K8DK",
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            collateral: 50,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        }]);
});


const { result, variables, loading, error, refetch } = useQuery(gql`
query($getProductsVariable: GetProductsInput!){
    getProducts(getProductsInput: $getProductsVariable){
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
    }
}
`, {
    "getProductsVariable": {
        "page": 1
    }
}, {
    pollInterval: 1000,
}
)

function setPage(page) {
    variables.value = {
        page,
    }
}

const products = computed(() => result.value.getProducts || []);


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
const statuses = ref([
    { label: 'IN', value: 'instock' },
    { label: 'LOW', value: 'lowstock' },
    { label: 'OUT', value: 'outofstock' }
]);

const formatCurrency = (value) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'ADA' });
    return;
};

const buildImageUrl = (data) => {
    console.log(data.media_url + data.image_path + data.image_set[0])
    data.media_url + data.image_path + data.image_set[0]
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
const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
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

</script>


<style scoped>
::v-deep(.p-toolbar) {
    background: transparent;
    padding: 0 1rem;
    padding-left: 0.5rem;
}

::v-deep(button) {
    font-size: var(--text-size-a);
}

.p-inputtext {
    font-size: var(--text-size-a);
}

::v-deep(.p-datatable-header) {
    background: transparent;
}

.p-datatable {
    font-size: var(--text-size-a);
}

.p-tag {
    font-size: var(--text-size-a);
    text-transform: lowercase;
}

.card {
    padding: 2rem;
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
    border-radius: 8px;
    object-fit: cover;
}
</style>