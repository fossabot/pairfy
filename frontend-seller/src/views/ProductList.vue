<template>
    <main>
        <div class="card">
            <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true"
                :draggable="false">
                <div class="card-message flex">
                    <span v-if="selectedProduct">Are you sure you want to delete: <b>{{ selectedProduct.name
                            }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" variant="outlined" @click="deleteProductDialog = false" />
                    <Button label="Yes" @click="onDeleteConfirmed" style="color: var(--text-w)" />
                </template>
            </Dialog>

            <TableComp :columns="columns" :items="products" :limit="15" :count="1382" :images="true"
                @onNext="handleOnNext">

                <template #image="{ item }">

                    <ImageComp :src="buildImageUrl(item)" :imageStyle="{ width: '50px', height: '50px' }" />
                </template>

                <template #col-price="{ value }">
                    <span class="">${{ value }}</span>
                </template>

                <template #action="{ item }">

                    <div class="flex center">
                        <DottedMenu :options="dottedMenuOptions" :value="item" @onSelected="handleDottedMenu" />                      
                    </div>

                </template>

            </TableComp>

        </div>
    </main>
</template>

<script setup>
import TableComp from '@/components/TableComp.vue';
import DottedMenu from '@/components/DottedMenu.vue';
import ImageComp from '@/components/ImageComp.vue';
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import { ref, computed, watch } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const { formatWithDots, reduceByLength, formatCurrency } = inject('utils')

const toast = useToast();

const router = useRouter();

const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Product List' }
]);

const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};

const queryOptions = {
    pollInterval: 1500,
}

const variablesRef = ref({
    "getProductsVariable": {
        "cursor": "NOT"
    }
})

const { result: getProductsResult, onError: onGetProductsError } = useQuery(gql`
query($getProductsVariable: GetProductsInput!){
    getProducts(getProductsInput: $getProductsVariable){
        products {
            id
            name
            sku
            price
            category
            paused
            media_url
            image_path
            image_set
            discount
            discount_value            
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

onGetProductsError(error => {
    showError("The connection to the server has failed, please try again later.");
})

const updateCursor = () => {
    variablesRef.value = {
        getProductsVariable: {
            cursor: getProductsResult.value?.getProducts.cursor
        }
    }
}

const productsTemp = ref([]);

const products = computed(() => productsTemp.value);

const columns = ref([
    { label: "ID", field: "id" },
    { label: "Sku", field: "sku" },
    { label: "Name", field: "name" },
    { label: "Price", field: "price" },
    { label: "Discount", field: "discount" },
    { label: "Category", field: "category" },
    { label: "Date", field: "created_at" },
    { label: "Paused", field: "paused" },
]);


watch(getProductsResult, value => {
    if (value) {
        productsTemp.value.push(...value.getProducts.products)
    }
}, { immediate: true })

const productCount = computed(() => getProductsResult.value?.getProducts.count);

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
    productsTemp.value = []
    deleteProductDialog.value = false;
}

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

const getLabelColor = (status) => {
    switch (status) {
        case 1:
            return 'warn';
        case 0:
            return 'success';

        default:
            return null;
    }
};

const dottedMenuOptions = ref([
    { label: "Delete Product", value: "delete" },
    { label: "Edit Product", value: "edit" },
    { label: "Open Page", value: "open" }
])

const handleOnNext = () => {

}

const handleDottedMenu = (event, value) => {
    console.log(event, value.id);
}

</script>


<style scoped>
::v-deep(.p-datatable-header) {
    background: transparent;
    border: none;
    padding: 1rem 0;
}

::v-deep(.p-datatable-header-cell) {
    background: transparent;
    border: 1px solid var(--border-a);
    border-left: none;
    color: var(--text-a);
}

::v-deep(.p-datatable-paginator-bottom) {
    border: none;
    padding: 0.2rem;
}

::v-deep(.p-datatable-column-title) {
    font-weight: 600;
}

main {
    padding: 0.5rem;
}

.card {
    display: flex;
    flex-direction: column;
}

.card-message {
    line-height: 1.75rem;
    font-size: var(--text-size-2);
}

.datatable-header {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>