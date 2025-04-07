<template>
    <main>
        <CarpetComp :tabs="['Inventory', 'Statistics']" :icons="['pi-clipboard', 'pi-gauge']">
            <template #content="{ index }">

                <div class="card" v-if="index === 0">
                    <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm"
                        :modal="true" :draggable="false">
                        <div class="card-message flex">
                            <span v-if="selectedProduct">Are you sure you want to delete: <b>{{ selectedProduct.name
                                    }}</b>?</span>
                        </div>
                        <template #footer>
                            <Button label="No" variant="outlined" @click="deleteProductDialog = false" />
                            <Button label="Yes" @click="deleteProductConfirmation" style="color: var(--text-w)" />
                        </template>
                    </Dialog>

                    <div class="control flex">
                        <ButtonComp data="Create" @click="handleRoute('create-product')">
                            <template #icon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus">
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                            </template>
                        </ButtonComp>
                    </div>

                    <TableComp :columns="columns" :items="products" :limit="15" :count="productCount" :images="true"
                        :columnWidths="{ id: '7rem', category: '8rem' }" @onPrev="handleOnPrev" @onNext="handleOnNext">

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
                            {{ applyDiscount(item.discount, item.price, item.discount_value) }}
                        </template>

                        <template #col-discount="{ value, item }">
                            <div class="tags">
                                <div class="tags-box flex">

                                    <span class="discount" :class="{ disabled: !value }">
                                        {{ `-${item.discount_value}%` }}
                                    </span>

                                    <span>{{ `${getDiscount(item.price, item.discount_value)}` }}</span>
                                </div>
                                <span>
                                    <MiniSwitch :modelValue="value" :value="item" @onChange="handleDiscount" />
                                </span>
                            </div>
                        </template>

                        <template #col-created_at="{ value }">
                            {{ convertDate(value, 'YYYY-MM-DD') }}
                        </template>

                        <template #col-paused="{ value, item }">
                            <SwitchComp :modelValue="value == 1" :value="item" @onChange="handlePaused" />
                        </template>

                        <template #action="{ item }">

                            <div class="flex center">
                                <DottedMenu :options="dottedMenuOptions" :value="item" @onSelected="handleDottedMenu" />
                            </div>

                        </template>

                    </TableComp>
                </div>
            </template>
        </CarpetComp>
    </main>
</template>

<script setup>
import TableComp from '@/components/TableComp.vue';
import DottedMenu from '@/components/DottedMenu.vue';
import ImageComp from '@/components/ImageComp.vue';
import SwitchComp from '@/components/SwitchComp.vue';
import MiniSwitch from '@/components/MiniSwitch.vue';
import CarpetComp from "@/components/CarpetComp.vue";
import ButtonComp from '@/components/ButtonComp.vue';
import gql from 'graphql-tag';
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { inject } from 'vue';


const { reduceArrayByIndex, getDiscount, applyDiscount, formatSKU, convertDate, formatUSD } = inject('utils')

const toast = useToast();

const router = useRouter();

const dottedMenuOptions = ref([
    { label: "Delete Product", value: "delete" },
    { label: "Edit Product", value: "edit" },
    { label: "Open Page", value: "open" }
])

const queryOptions = {
    clientId: 'product'
}

const variablesRef = ref({
    "getProductsVariable": {
        "cursor": "NOT"
    }
})

const { result: getProductsResult, onError: onErrorGetProducts, refetch: getProductsRefetch } = useQuery(gql`
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

onErrorGetProducts(error => {
    showError("The connection to the server has failed, please try again later.");
})

const updateCursor = (cursor) => {
    variablesRef.value = {
        getProductsVariable: {
            cursor
        }
    }
}

const productsTemp = ref({});

const products = computed(() => Object.values(productsTemp.value));

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


const unwatchProductResult = watch(getProductsResult, value => {
    if (value) {
        const reduce = reduceArrayByIndex(value.getProducts.products, "id");

        for (const [key, value] of Object.entries(reduce)) {
            productsTemp.value[key] = value;
        }

    }
}, { immediate: true })

const productCount = computed(() => getProductsResult.value?.getProducts.count);

const deleteProductDialog = ref(false);

const selectedProduct = ref(null);

const handleOnPrev = (event) => {
    console.log(event.created_at)

    updateCursor(event.created_at)
}

const handleOnNext = (event) => {
    console.log(event.created_at)

    updateCursor(event.created_at)
}

//////////////////////////////////////////////////////////////////////////////////////

const { mutate: deleteProduct, onError: onErrorDeleteProduct, onDone: onDeleteProduct } = useMutation(gql`
    mutation($deleteProductVariable: DeleteProductInput!){
        deleteProduct(deleteProductInput: $deleteProductVariable){
            success
        }
    }
`,
    {
        clientId: 'product'
    }
)

onErrorDeleteProduct(error => {
    showError(error);
})

onDeleteProduct(result => {
    showSuccess("The product has been deleted successfully.");
})

const beforeDeleteProduct = (data) => {
    selectedProduct.value = data;

    deleteProductDialog.value = true;
};

const deleteProductConfirmation = () => {
    deleteProduct({
        "deleteProductVariable": {
            "id": selectedProduct.value.id
        }
    });
    productsTemp.value = []
    deleteProductDialog.value = false;
}

//////////////////////////////////////////////////////////////////////////////////////

const { mutate: updateProduct, onError: onErrorUpdateProduct, onDone: onUpdateProduct } = useMutation(gql`
    mutation($updateProductVariable: UpdateProductInput!){
        updateProduct(updateProductInput: $updateProductVariable){
            success
        }
    }
`,
    {
        clientId: 'product'
    }
)

onErrorUpdateProduct(error => {
    showError(error);
})

onUpdateProduct(result => {
    showSuccess("The product has been updated successfully.");
    getProductsRefetch()
})

const beforeUpdateProduct = (id, change) => {
    updateProduct({
        "updateProductVariable": {
            "id": id,
            ...change
        }
    })
}


//////////////////////////////////////////////////////////////////////////////////////

const buildImageUrl = (data) => {
    return data.media_url + data.image_path + data.image_set.split(",")[0]
}

const editProduct = (id) => {
    router.push({
        name: 'edit-product',
        params: {
            id
        }
    })
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

const handleDiscount = (bool, value) => {
    console.log(bool, value.id);

    beforeUpdateProduct(value.id, { discount: bool });
}

const handlePaused = (bool, value) => {
    console.log(bool, value.id);

    beforeUpdateProduct(value.id, { paused: bool === true ? 1 : 0 });
}


const handleRoute = (e) => {
    router.push({
        name: e
    })
}

const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};

onBeforeUnmount(() => {
    unwatchProductResult()
})
</script>


<style scoped>
main {
    padding: 0.5rem;
}

.card {
    display: flex;
    flex-direction: column;
}

.card-message {
    font-size: var(--text-size-2);
    line-height: 1.75rem;
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


.tags span {
    margin-bottom: 3px;
}

.tags .discount {
    color: var(--green-a);

}

.tags .discount.disabled {
    color: var(--text-b);
}

.control {
    border-bottom: 1px solid var(--border-a);
    background: var(--background-a);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    padding: 1rem;
}

.control button {
    background: var(--green-a);
    padding: 0.75rem 1rem;
    color: var(--text-w);
    border-radius: 4px;
    cursor: pointer;
    border: none;
}

.control button span {
    font-size: var(--text-size-1);
    margin-left: 0.5rem;
    font-weight: 600;
}
</style>