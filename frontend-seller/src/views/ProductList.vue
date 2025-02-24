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

            <TableComp :columns="columns" :items="products" :limit="16" :count="productCount" :images="true"
                :columnWidths="{ id: '8rem', category: '8rem' }" @onNext="handleOnNext">

                <template #image="{ item }">

                    <ImageComp :src="buildImageUrl(item)" :imageStyle="{ width: '50px', height: '50px' }" />
                </template>


                <template #col-id="{ value }">
                    {{ value }}
                </template>

                <template #col-sku="{ value }">
                    {{ formatSKU(value) }}
                </template>

                <template #col-price="{ item }">
                    {{ applyDiscount(item.price, item.discount_value) }}
                </template>

                <template #col-discount="{ item }">
                    <div class="tags">
                        <div class="tags-box flex" :class="{ disabled: false }">
                            <span class="discount">{{ `-${item.discount_value}%` }}</span>
                            <span>{{ `${getDiscount(item.price, item.discount_value)}` }}</span>
                        </div>
                        <span>
                            <MiniSwitch :modelValue="item.discount" />
                        </span>
                    </div>
                </template>

                <template #col-created_at="{ value }">
                    {{ convertDate(value, 'YYYY-MM-DD') }}
                </template>

                <template #col-paused="{ value }">
                    <SwitchComp :modelValue="value == 0" @onPaused="" />
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
import SwitchComp from '@/components/SwitchComp.vue';
import MiniSwitch from '@/components/MiniSwitch.vue';
import gql from 'graphql-tag';
import { ref, computed, watch } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const { getDiscount, applyDiscount, formatSKU, convertDate, formatUSD } = inject('utils')

const toast = useToast();

const router = useRouter();

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

const watchProductResult = watch(getProductsResult, value => {
    if (value) {
        productsTemp.value.push(...value.getProducts.products)
    }
}, { immediate: true })

const productCount = computed(() => getProductsResult.value?.getProducts.count);


const deleteProductDialog = ref(false);

const selectedProduct = ref(null);

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

const buildImageUrl = (data) => {
    return data.media_url + data.image_path + data.image_set.split(",")[0]
}

const beforeDeleteProduct = (data) => {
    selectedProduct.value = data;

    deleteProductDialog.value = true;
};

const editProduct = (id) => {
    router.push({
        name: 'edit-product',
        params: {
            id
        }
    })
}

const dottedMenuOptions = ref([
    { label: "Delete Product", value: "delete" },
    { label: "Edit Product", value: "edit" },
    { label: "Open Page", value: "open" }
])

const handleOnNext = () => {

}

const handleDottedMenu = (event, value) => {
    console.log(event, value.id);

    if (event === 'delete') {
        beforeDeleteProduct(value);
        return;
    }

    if (event === 'edit') {
        editProduct(value.id);
        return;
    }
}

const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};
</script>


<style scoped>
main {
    padding: 0.25rem;
}

.card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-a);
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

.tags-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.tags-box.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.tags span {
    margin-bottom: 4px; 
}

.tags .discount {
    color: var(--red-a);
    font-weight: 600;
}
</style>