<template>
    <div class="card">
        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true"
            :draggable="false">
            <div class="flex">

                <span v-if="selectedProduct">Are you sure you want to delete: <b>{{ selectedProduct.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" variant="outlined" @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="onDeleteConfirmed" />
            </template>
        </Dialog>

        <!--/////////////////////////-->

        <Toolbar class="mb-6">
            <template #start>
                <Button icon="pi pi-chevron-left" class="mr-2" text severity="secondary" @click="goBack" />

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


        <DataTable class="card-datatable" ref="dt" :value="products" dataKey="id" :paginator="true" :rows="15"
            :filters="filters" @page="updateCursor()" @rowSelect="editProduct" selectionMode="single"
            paginatorTemplate="PrevPageLink   NextPageLink  CurrentPageReport"
            currentPageReportTemplate="Showing {first} to {last}">
            <template #paginatorstart>
                <div style="color: var(--text-b);">
                    <span>{{ productCount }} Products</span>
                </div>
            </template>

            <template #header>
                <div class="datatable-header">
                    <RouterLink to="/create-product">
                        .
                    </RouterLink>
                </div>
            </template>


            <Column header="Image">
                <template #body="slotProps">
                    <img :src="buildImageUrl(slotProps.data)" :alt="slotProps.data.image" class="datatable-image" />
                </template>

            </Column>


            <Column field="id" header="ID" sortable>
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>

                <template #body="slotProps">
                    {{ formatWithDots(slotProps.data.id, 7) }}
                </template>
            </Column>

            <Column field="sku" header="SKU" sortable style="min-width: 8rem">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>

                <template #body="slotProps">
                    {{ formatSKU(slotProps.data.sku) }}
                </template>
            </Column>
            <Column field="name" header="Name" sortable style="min-width: 8rem; text-transform: capitalize;">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
                <template #body="slotProps">
                    {{ reduceByLength(slotProps.data.name, 50) }}
                </template>

            </Column>
            <Column field="price" header="Price" sortable style="min-width: 8rem">
                <template #body="slotProps">
                    <Tag :value="formatCurrency(slotProps.data.price)" severity="secondary" />
                </template>
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>

            <Column field="discount_value" header="Discount" sortable
                style="min-width: 2rem; text-transform: capitalize;">
                <template #body="slotProps">
                    <div v-if="slotProps.data.discount">
                        <Tag :value="`- ${slotProps.data.discount_value}%`" severity="contrast" />
                    </div>
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

            <Column field="book_product_stock" header="Stock" sortable
                style="min-width: 4rem; text-transform: capitalize;">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>

            <Column field="book_ready_stock" header="Ready" sortable
                style="min-width: 4rem; text-transform: capitalize;">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>

            <Column field="book_blocked_orders" header="Locked" sortable
                style="min-width: 4rem; text-transform: capitalize;">
                <template #sorticon="{ sortOrder }">
                    <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                    <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                    <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                </template>
            </Column>

            <Column field="book_ready_stock" header="Stock" sortable style="min-width: 4rem">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.book_ready_stock ? 'instock' : 'outstock'"
                        :severity="getStockLabel(slotProps.data.book_ready_stock)" />
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
                        <Button icon="pi pi-pencil" outlined size="small" rounded
                            @click="beforeDeleteProduct(slotProps.data)" />

                        <Button icon="pi pi-eye" outlined size="small" rounded
                            @click="beforeDeleteProduct(slotProps.data)" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import { ref, computed, watch } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { inject } from 'vue';


const { formatWithDots, reduceByLength } = inject('utils');

const toast = useToast();

const router = useRouter();

const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Product Books' }
]);

const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};

const queryOptions = {
    pollInterval: 1500,
    clientId: "gateway"
}

const variablesRef = ref({
    "getBooksVariable": {
        "cursor": "NOT"
    }
})

const { result: getBooksResult, onError: onGetBooksError } = useQuery(gql`
query($getBooksVariable: GetBooksInput!){
    getBooks(getBooksInput: $getBooksVariable){
        products {
            id
            name
            price
            collateral
            sku
            media_url
            image_path
            image_set
            discount
            discount_value            
            created_at
            book_product_stock
            book_ready_stock
            book_blocked_orders
        }

        cursor
        count
    }
}
`,
    () => (variablesRef.value),
    queryOptions
);

onGetBooksError(error => {
    showError("The connection to the server has failed, please try again later.");
})

const updateCursor = () => {
    variablesRef.value = {
        getBooksVariable: {
            cursor: getBooksResult.value?.getBooks.cursor
        }
    }
}

const booksTemp = ref([]);

const products = computed(() => booksTemp.value);

watch(getBooksResult, value => {
    if (value) {
        booksTemp.value.push(...value.getBooks.products)
    }
}, { immediate: true })

const productCount = computed(() => getBooksResult.value?.getBooks.count);

const dt = ref();

const deleteProductDialog = ref(false);

const selectedProduct = ref(null);

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const { mutate: sendDeleteProduct, onError: onErrorDeleteProduct, onDone: onDeleteProduct } = useMutation(gql`
    mutation($deleteProductVariable: DeleteProductInput!){
        deleteProduct(deleteProductInput: $deleteProductVariable){
            success
        }
}
`)

onErrorDeleteProduct(error => {
    showError(error);
})

onDeleteProduct(result => {
    showSuccess("The product has been deleted successfully.");
})

const onDeleteConfirmed = () => {
    sendDeleteProduct({
        "deleteProductVariable": {
            "id": selectedProduct.value.id
        }
    });
    booksTemp.value = []
    deleteProductDialog.value = false;
}

const formatCurrency = (value) => {
    if (value) {
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0

        }) + " USD";
    }

};

const formatSKU = (value) => {
    if (value) {
        return value.split(":")[0]
    }
};

const convertDate = (timestamp) => {
    const date = dayjs(parseInt(timestamp));

    return date.format('YYYY-MM-DD');
}

const buildImageUrl = (data) => {
    return data.media_url + data.image_path + data.image_set.split(",")[0]
}

const beforeDeleteProduct = (data) => {
    selectedProduct.value = data;

    deleteProductDialog.value = true;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const getStockLabel = (status) => {
    switch (status) {
        case 1:
            return 'success';
        case 0:
            return 'secondary';

        default:
            return null;
    }
};

const goBack = () => {
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
    padding: 0 1rem;
    background: transparent;
    border-radius: 1rem;
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

.datatable-control button {
    margin-left: 1rem;
}


.arrow {
    font-size: 12px;
}
</style>