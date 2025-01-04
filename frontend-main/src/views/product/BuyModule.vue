<template>
    <Skeleton v-if="!getProductData" width="100%" height="500px" />

    <div class="card" v-if="getProductData">
        <Dialog v-model:visible="toggleDialog" modal header="Payment" :style="{ width: '56rem', height: '60rem' }"
            :draggable="false" dismissableMask>

            <div class="dialog">
                <div class="grid">
                    <div class="grid-item left">
                        <div class="dialog-row">
                            <div class="dialog-title flex">
                                1. Package Destination
                            </div>

                            <div class="dialog-country flex">
                                <img :alt="getLocationData?.country" src="@/assets/flag_placeholder.png"
                                    :class="`flag flag-${getLocationData?.country.toLowerCase()}`" />

                                <span>{{ getLocationData?.name }}, {{ getLocationData?.country }}</span>
                            </div>


                            <div class="dialog-input">
                                <IftaLabel>
                                    <InputText id="city" v-model="orderForm.city" fluid placeholder="" />

                                    <label for="city">City</label>
                                </IftaLabel>
                            </div>

                            <div class="dialog-input">
                                <IftaLabel>
                                    <InputText id="address" v-model="orderForm.address" fluid placeholder="" />

                                    <label for="address">Address</label>
                                </IftaLabel>
                            </div>

                            <div class="dialog-input">
                                <IftaLabel>
                                    <InputText id="name" v-model="orderForm.receiver" fluid />
                                    <label for="name">Receiver Name</label>
                                </IftaLabel>
                            </div>

                            <div class="dialog-input">
                                <IftaLabel>
                                    <InputText id="postal" v-model="orderForm.postal" fluid />
                                    <label for="postal">ZIP/Postal</label>
                                </IftaLabel>
                            </div>


                            <div class="dialog-message">
                                <Message severity="secondary">
                                    Data is encrypted and decrypted end-to-end for shipping using AES256-4096 / RSA /
                                    PGP.

                                    <a href="https://www.lace.io/bugbountyprogram" target="_blank"
                                        rel="noopener noreferrer">
                                        Read more about 1M USD Lace wallet challenge with PGP encryptation.
                                    </a>
                                </Message>
                            </div>
                        </div>

                        <Divider />

                        <div class="dialog-row">
                            <div class="dialog-title flex">
                                2. Payment method
                            </div>

                            <div class="payments">
                                <div class="payment-item selected">
                                    <span>ADA</span>
                                </div>
                                <div class="payment-item disabled">
                                    <span>IUSD</span>
                                </div>
                                <div class="payment-item disabled">

                                    <span>USDM</span>
                                </div>
                                <div class="payment-item disabled">
                                    <span>USDA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-item right">
                        <div class="dialog-title flex">
                            Total
                        </div>

                        <div class="dialog-values flex">
                            <span>Protection</span>

                            <span>Yes</span>
                        </div>

                        <div class="dialog-values flex">
                            <span>Shipping Cost</span>

                            <span>Free</span>
                        </div>

                        <div class="dialog-values flex">
                            <span>Total Fiat Price</span>

                            <span>{{ computedTotalFiat }} USD</span>
                        </div>

                        <div class="dialog-values flex">
                            <span>Exchange Rate</span>

                            <span>{{ getADAprice }} USD</span>
                        </div>

                        <div class="dialog-values flex">
                            <span>Quantity</span>

                            <span>{{ selectedQuantity }}</span>
                        </div>

                        <div class="dialog-values flex">
                            <span>Total Asset</span>
                            <span>{{ computedTotalPrice }} ADA</span>
                        </div>

                        <div class="dialog-control">
                            <Button label="PAY" @click="onConfirmedBuy" style="color: var(--text-w);"
                                :loading="createOrderLoading" fluid />
                        </div>
                    </div>
                </div>

            </div>
        </Dialog>


        <div class="card-legend">
            <span style="font-weight: 700;">{{ getProductData.brand }}</span>
        </div>

        <div class="card-legend" :class="{ red: 0, }">
            <span style="font-weight: 600;">{{ getStockLabel(15) }}</span>
        </div>

        <div class="card-rating flex">
            <Rating v-model="productRating" :stars="5" readonly />
            <span>4.5</span>
            <div class="reviews">250 reviews</div>
        </div>

        <div class="card-full flex green">
            <span>free shipping</span>
            <i class="pi pi-truck" />
            <i class="pi pi-bolt green" />
            <span class="full">FULL</span>
        </div>

        <div class="card-legend flex">
            <span> Arrives on {{ arrivalDate }}</span>
        </div>

        <div class="card-within gray">
            <span> Buying within the next</span>

            <span style="color: initial;">{{ withinRange }}</span>
        </div>

        <div class="card-legend" style="font-weight: initial;">
            <span>Available (15)</span>
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

            <Button label="Buy Now" fluid @click="onBuyProduct()" style="color: var(--text-w);" />
            <Button label="Add To Cart" fluid variant="outlined" severity="secondary" />
        </div>

        <div class="card-term flex">
            <div class="card-term-icon">
                <i class="pi pi-shield" />
            </div>
            <div class="card-term-box">
                <span class="blue">Purchase Protection.</span> Receive the product you expected or get your money back.
            </div>
        </div>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import productAPI from '@/views/product/api/index';
import headerAPI from "@/components/header/api/index";
import { ref, computed, inject } from "vue";
import { useMutation } from '@vue/apollo-composable';
import { useToast } from "primevue/usetoast";
import { balanceTx } from "@/api/wallet";
import { useRouter } from 'vue-router';

const { applyDiscount, convertUSDToADA } = inject('utils');

const router = useRouter();

const toast = useToast();

const { togglePanel, getADAprice, getCurrentUser, getLocationData } = headerAPI();

const { getProductData, getArrivalDate, getArrivalData } = productAPI();

getArrivalDate({
    "destination": "181.132.19.47"
})

const orderForm = ref({
    city: getLocationData.value?.city || null,
    address: null,
    receiver: null,
    postal: getLocationData.value?.postal || null
});

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
    return readyStock > 0 ? "Product In Stock" : "Out Stock";
}

const toggleDialog = ref(true);



const onBuyProduct = () => {
    if (!getCurrentUser.value) {
        return togglePanel(true)
    }

    toggleDialog.value = true;
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

const arrivalDate = computed(() => calculateArrivalDay(getArrivalData.value?.duration));

const withinRange = computed(() => calculateRemainingTimeOfDay());

const calculateRemainingTimeOfDay = () => {

    const now = dayjs();

    const midnight = dayjs().endOf('day');

    const duration = midnight.diff(now);

    const hours = Math.floor(duration / (1000 * 60 * 60));

    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));


    return `${hours} h ${minutes} min`;
};


function calculateArrivalDay(durationInSeconds) {

    const arrivalDate = dayjs().add(durationInSeconds, 'second');

    const arrivalDay = arrivalDate.format('dddd DD');

    return arrivalDay;
};



const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};

</script>

<style lang="css" scoped>
a {
    font-weight: 600;
}

.card {
    border: 1px solid var(--border-a);
    min-height: 100px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 12px;
    width: 285px;
    margin-left: auto;
}

.card-control {
    display: grid;
    gap: 1rem;
}

.card-legend {
    font-size: var(--text-size-1);
    margin-bottom: 1rem;
    text-transform: capitalize;
}

.card-full {
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 1rem;
    font-size: var(--text-size-1);
}

.card-full i {
    margin: 0.25rem;
}

.card-full span {
    margin-right: 0.5rem;
}

.full {
    font-weight: 700;
    font-style: italic;
}

.card-rating {
    margin-bottom: 1rem;
}

.card-rating span {
    margin-left: 0.5rem;
    font-size: var(--text-size-0);
    font-weight: 700;
}

.reviews {
    font-size: var(--text-size-0);
    margin-left: 0.5rem;
}


.dialog-values {
    justify-content: space-between;
    font-weight: 600;
    font-size: var(--text-size-0);
    margin-top: 1rem;
}

.card-within {
    font-size: var(--text-size-1);
    margin-bottom: 1rem;
}

.card-within span:nth-child(2) {
    margin-left: 0.25rem;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 2rem;
    width: 100%;
    color: var(--text-a);
}

.grid-item {
    text-align: center;
}

.grid-item.right {
    padding: 0 1rem;
    border-left: 1px dashed var(--border-a);
}

.dialog {
    padding: 0.5rem;
}

.dialog-title {
    font-weight: 600;
    line-height: 2.5rem;
    font-size: var(--text-size-3);
}

.dialog-control {
    margin-top: 1rem;
}

.dialog-input {
    margin-top: 1rem;
}

.dialog-row {
    margin-bottom: 1rem;
}

.payments {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, 120px);
    margin-top: 1rem;
    width: 100%;
}

.payment-item {
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid var(--border-a);
    font-weight: 500;
}

.payment-item span {
    font-size: var(--text-size-1);
}

.payment-item.selected {
    border: 1px solid var(--text-b);
}

.payment-item.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.dialog-message {
    margin-top: 1rem;
}

.dialog-country {
    line-height: 4rem;
}

.dialog-country span {
    font-weight: 500;
    font-size: var(--text-size-3);
    margin-left: 1rem;
    color: var(--text-b);
}

.card-term {
    margin-top: 1rem;
    height: 80px;
    box-sizing: border-box;
}

.card-term-icon {
    width: 50px;
    display: flex;
    align-items: flex-start;
    color: var(--text-b); 
    height: inherit;
}

.card-term-box {
    font-size: var(--text-size-0);
    color: var(--text-b);
    height: inherit;
}
</style>