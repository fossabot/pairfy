<template>
    <div class="buy">
        <Dialog v-model:visible="showBuyDialog" modal header="Transaction" :style="{ width: '22rem' }"
            :draggable="false">
            <template #header>

            </template>

            <div class="dialog-sub">Buy ({{ selectedQuantity }}) units</div>

            <div class="dialog-msg">
                <Message size="small" severity="info" icon="pi pi-info-circle">
                    The transaction is valid for 5 minutes. Funds will be released in 60 minutes if the seller delays.
                </Message>
            </div>

            <div class="dialog-total">
                Total {{ computedTotalPrice }} ADA
            </div>

            <template #footer>
                <Button label="Cancel" text severity="secondary" @click="showBuyDialog = false" autofocus />
                <Button label="Buy" outlined severity="secondary" @click="onConfirmedBuy" autofocus />
            </template>
        </Dialog>


        <Skeleton v-if="!getProductData" width="100%" height="500px" />

        <div v-if="getProductData">
            <div class="buy-brand">
                {{ getProductData.brand }}
            </div>

            <div class="buy-stock" :class="{ red: 0, }">
                {{ getStockLabel(15) }}
            </div>

            <div class="buy-rating flex">
                <Rating v-model="productRating" :stars="5" readonly />
                <span> 4.5 </span>
                <span style="color: var(--text-b)">(1250 reviews)</span>
            </div>

            <div class="buy-legend">
                <span>5 Sold</span>
            </div>

            <div class="buy-legend">
                <span>SKU {{ getProductData.sku.split(":")[0] }}</span>
            </div>

            <div class="buy-legend">
                Available (15 of 20)
            </div>

            <div class="buy-control">
                <InputNumber v-model="selectedQuantity" inputId="horizontal-buttons" showButtons
                    buttonLayout="horizontal" :step="1" fluid :format="false" :min="1" :max="10">
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>

                <Button label="Buy Now" fluid @click="openBuyDialog()" />
                <Button label="Add To Cart" fluid outlined />
            </div>
        </div>
    </div>
</template>

<script setup>
import headerAPI from '@/components/header/api';
import productAPI from '@/views/product/api/index';
import gql from 'graphql-tag';
import { ref, computed, inject } from "vue";
import { useMutation } from '@vue/apollo-composable';
import { useToast } from "primevue/usetoast";
import { balanceTx } from "@/api/wallet";
import { useRouter } from 'vue-router';

const { applyDiscount, convertUSDToADA } = inject('utils');

const router = useRouter();

const { getADAprice } = headerAPI();

const { getProductData } = productAPI();

const toast = useToast();

const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};

const selectedQuantity = ref(1);

const computedTotalPrice = computed(() => {
    let product = getProductData.value;

    if (product) {
        let discounted = applyDiscount(product.discount,
            product.price,
            product.discount_value
        );

        let price = convertUSDToADA(discounted, getADAprice.value);

        return price * selectedQuantity.value
    }

    return 0;
})


const productRating = ref(4);

const getStockLabel = (readyStock) => {
    return readyStock > 0 ? "In Stock" : "Out Stock";
}

const showBuyDialog = ref(false);

const openBuyDialog = () => {
    showBuyDialog.value = true;
}

const { mutate: sendMessage, loading: sendMessageLoading, onError: onCreateOrderError, onDone: onOrderCreated } = useMutation(gql`
mutation($createOrderVariable: CreateOrderInput!){
    createOrder(createOrderInput: $createOrderVariable){
        success
        payload {
            cbor
            order
        }
    }
}
`,
    {
        clientId: 'gateway'
    })

onCreateOrderError(error => {
    showError(error);
})


onOrderCreated(async result => {
    const response = result.data;

    if (response.createOrder.success === true) {
        try {
            const { cbor, order } = response.createOrder.payload;

            const txHash = await balanceTx(cbor);

            showSuccess("Transaction submitted.");

            console.log(`Transaction submitted with hash: ${txHash}`);

            router.push({
                name: 'order',
                params: {
                    id: order
                },
                query: {
                    tx: txHash
                }
            })

        } catch (err) {
            console.error(err);

            showError(err);
        }
    }


})


const onConfirmedBuy = () => {
    sendMessage({
        "createOrderVariable": {
            "product_id": getProductData.value.id,
            "product_units": selectedQuantity.value,
        }
    })
}
</script>

<style lang="css" scoped>
.buy {
    border: 1px solid var(--border-a);
    min-height: 100px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.buy-control {
    display: grid;
    gap: 0.5rem;
    margin-top: 1rem;
}

.buy-legend {
    font-size: var(--text-size-a);
    font-weight: 400;
    margin-top: 1rem;
    color: var(--text-b);
}

.buy-brand {
    font-weight: 700;
    font-size: var(--text-size-a);
    text-transform: capitalize;
}

.buy-rating {
    margin-top: 1rem;
}

.buy-rating span {
    margin-left: 0.5rem;
    font-size: var(--text-size-a);
}

.buy-stock {
    font-weight: 600;
    margin-top: 1rem;
    color: var(--green-a);
}

.buy-stock.red {
    color: var(--red-a);
}


.dialog-msg {
    margin-top: 1rem;
}

.dialog-sub {
    font-weight: 500;

}

.dialog-total {
    margin-top: 1rem;
    font-weight: 600;
    font-size: var(--text-size-b);
}

::v-deep(.p-button-label) {
    font-size: var(--text-size-a) !important;
}
</style>