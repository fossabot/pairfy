<template>
    <Skeleton v-if="!getProductData" width="100%" height="500px" />

    <div v-if="getProductData" class="card">
        <Dialog v-model:visible="showBuyDialog" modal header="Transaction" :style="{ width: '22rem' }"
            :draggable="false" dismissableMask>
            <template #header>

            </template>

            <div class="dialog-sub">Buy {{ selectedQuantity }} units</div>

            <div class="dialog-values">
                Total Fiat = {{ computedTotalFiat }} USD
            </div>


            <div class="dialog-values">
                ADA Price = {{ getADAprice }} USD
            </div>


            <div class="dialog-values">
                Total ADA = {{ computedTotalPrice }} ADA
            </div>


            <div class="dialog-msg">
                <Message size="small" severity="warn">
                    The funds will be released in 60~ minutes if the seller delays the order -
                    Protected purchase covers the funds at 100%.
                </Message>
            </div>

            <template #footer>
                <Button label="Cancel" text severity="secondary" @click="showBuyDialog = false" autofocus />
                <Button label="Buy" outlined severity="secondary" @click="onConfirmedBuy" autofocus
                    :loading="createOrderLoading" />
            </template>
        </Dialog>


        <div class="card-legend">
            {{ getProductData.brand }}
        </div>

        <div class="card-legend" :class="{ red: 0, }">
            {{ getStockLabel(15) }}
        </div>

        <div class="card-rating flex">
            <Rating v-model="productRating" :stars="5" readonly />
            <span> 4.5 </span>
            <span style="color: var(--text-b)">(1250 reviews)</span>
        </div>

        <div class="card-legend green">
            Free shipping
            <i class="pi pi-truck" />
        </div>

        <div class="card-legend">
            <span> Arrives on {{ arrivalDate }}</span>
        </div>

        <div class="card-within gray">
            <span> Buying within the next</span>

            <span class="green">{{ withinRange }}</span>
        </div>

        <div class="card-legend green" >
            <span>protected purchase</span>
            <i class="pi pi-bolt green" />
        </div>

        <div class="card-legend" >
            <span> Available (15)</span>
        </div>

        <div class="card-control">
            <InputNumber v-model="selectedQuantity" inputId="horizontal-buttons" showButtons buttonLayout="horizontal"
                :step="1" fluid :format="false" :min="1" :max="10">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>

            <Button label="Buy Now" fluid @click="openBuyDialog()" />
            <Button label="Add To Cart" fluid variant="outlined" severity="secondary" />
        </div>
    </div>
</template>

<script setup>
import headerAPI from '@/components/header/api';
import productAPI from '@/views/product/api/index';
import dayjs from 'dayjs';
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

        return Math.round(price * selectedQuantity.value)
    }

    return 0;
})

const computedTotalFiat = computed(() => {
    let product = getProductData.value;

    if (product) {
        let discounted = applyDiscount(product.discount,
            product.price,
            product.discount_value
        );


        return Math.round(discounted * selectedQuantity.value)
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

const { mutate: createOrder, loading: createOrderLoading, onError: onCreateOrderError, onDone: onOrderCreated } = useMutation(gql`
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

            showSuccess(`Transaction submitted with hash: ${txHash}`);

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
    createOrder({
        "createOrderVariable": {
            "product_id": getProductData.value.id,
            "product_units": selectedQuantity.value,
        }
    })
}

const arrivalDate = computed(() => calculateArrivalDay(45320));

const withinRange = computed(() => calculateRemainingTimeOfDay());

const calculateRemainingTimeOfDay = () => {

    const now = dayjs();

    const midnight = dayjs().endOf('day');

    const duration = midnight.diff(now);

    const hours = Math.floor(duration / (1000 * 60 * 60));

    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));


    return ` ${hours}h ${minutes}min`;
};


function calculateArrivalDay(durationInSeconds) {

    const arrivalDate = dayjs().add(durationInSeconds, 'second');

    const arrivalDay = arrivalDate.format('dddd DD');

    return arrivalDay;
};

</script>

<style lang="css" scoped>
.card {
    border: 1px solid var(--border-a);
    min-height: 100px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 8px;
}

.card-control {
    display: grid;
    gap: 1rem;
}

.card-legend {
    font-size: var(--text-size-1);
    margin-bottom: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    display: flex;
    align-items: center;
}

.card-legend i {
    margin-left: 0.5rem;
}


.card-rating {
    margin-bottom: 1rem;
}

.card-rating span {
    margin-left: 0.5rem;
    font-size: var(--text-size-1);
}

.dialog-msg {
    margin-top: 1rem;
}

.dialog-sub {
    font-weight: 500;
}

.dialog-values {
    margin-top: 1rem;
    font-weight: 600;
    font-size: var(--text-size-2);
}

.card-within {
    font-size: var(--text-size-0);
    margin-bottom: 1rem;
}
</style>