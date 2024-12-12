<template>
    <div class="wrap">
        <div class="container">
            <div class="nav flex">
                <div class="nav-item" :class="{ selected: currentNav === 0 }" @click="setNav(0)">
                    <span>Information</span>
                    <div class="nav-item-border" :class="{ selected: currentNav === 0 }" />
                </div>
                <div class="nav-item" :class="{ selected: currentNav === 1 }" @click="setNav(1)">
                    <span>Product</span>
                    <div class="nav-item-border" :class="{ selected: currentNav === 1 }" />
                </div>
            </div>
            <div class="grid">
                <!--SUMMARY-->
                <template v-if="currentNav === 0">
                    <Skeleton v-if="!orderData" width="80%" height="100%" />

                    <div class="summary" v-if="orderData">
                        <div class="summary-title">
                            Preparing Your Product, Time Remaining <span>{{ globalCountdown }}</span>
                        </div>
                        <div class="summary-subtitle flex">
                            Order number
                            <div>
                                <span>{{ formatWithDots(orderData.id, 40) }}</span>
                            </div>
                            <button class="flex" @click="copyToClipboard(orderData.id)">
                                <i class="pi  pi-copy" />
                            </button>
                        </div>
                        <div class="summary-subtitle flex">
                            Contract Address
                            <div>
                                <span> {{ reduceByLength(contractAdress, 30) }}</span>
                            </div>
                            <button class="flex" @click="copyToClipboard(contractAdress)">
                                <i class="pi  pi-copy" />
                            </button>
                        </div>
                        <Divider />
                        <div class="timeline">
                            <div class="timeline-item" v-for="item in timeline" :key="item">
                                <div class="timeline-bar">
                                    <div class="timeline-bar-box">
                                        <div class="diamond">

                                            <template v-if="item.template === 'created'">
                                                <span v-if="!pendingBlock">{{ item.number }}</span>
                                                <span v-else>
                                                    <i class="pi pi-check" />
                                                </span>
                                            </template>
                                            <template v-if="item.template === 'preparation'">
                                                <span v-if="!lockingBlock">{{ item.number }}</span>
                                                <span v-else>
                                                    <i class="pi pi-check" />
                                                </span>
                                            </template>
                                            <template v-if="item.template === 'received'">
                                                <span v-if="!shippingBlock">{{ item.number }}</span>
                                                <span v-else>
                                                    <i class="pi pi-check" />
                                                </span>
                                            </template>

                                        </div>
                                    </div>
                                    <div class="timeline-bar-line" :class="{ disabled: !item.line }" />
                                </div>
                                <div class="timeline-body">
                                    <div class="timeline-title flex">
                                        {{ item.title }}
                                    </div>

                                    <div v-if="item.subtitle.length" class="timeline-subtitle flex">
                                        {{ item.subtitle }}
                                    </div>

                                    <div class="timeline-content"
                                        :class="{ box: item.type === 'box', button: item.type === 'button' }">

                                        <template v-if="item.template === 'created'">
                                            <div class="created">
                                                <div class="created-item">
                                                    <span>Status</span>
                                                    <span>{{ statusLog }}</span>
                                                </div>
                                                <div class="created-item">
                                                    <span>Fiat Amount</span>
                                                    <span>{{ formatCurrency(contractFiat) }} USD</span>
                                                </div>
                                                <div class="created-item">
                                                    <span>ADA Amount</span>
                                                    <span>{{ contractPrice }} ADA</span>
                                                </div>
                                                <div class="created-item">
                                                    <span>Quantity</span>
                                                    <span>{{ contractUnits }}</span>
                                                </div>

                                                <div class="created-item">
                                                    <span>Payment</span>
                                                    <span>
                                                        <div class="payment flex" @click="openExplorer">
                                                            <div class="payment-label"
                                                                :style="{ color: orderPayment.color }">
                                                                {{ orderPayment.label }}
                                                            </div>

                                                            <div class="payment-symbol flex"
                                                                :style="{ color: orderPayment.color }">
                                                                <div v-if="orderPayment.template === 'loading'"
                                                                    class="payment-loader" :class="{
                                                                        warn: orderPayment.label === 'confirming',
                                                                        danger: orderPayment.label === 'unconfirmed'
                                                                    }" />

                                                                <div v-if="orderPayment.template === 'icon'">
                                                                    <i :class="orderPayment.icon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>

                                            </div>
                                        </template>


                                        <template v-if="item.template === 'preparation'">
                                            <div class="created">
                                                <div class="created-item">
                                                    <span>Status</span>
                                                    <span></span>
                                                </div>

                                                <div class="created-item">
                                                    <span>Collateral</span>
                                                    <span>{{ contractPrice }} ADA</span>
                                                </div>
                                                <div class="created-item">
                                                    <span>Guide</span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </template>

                                        <template v-if="item.template === 'received'">
                                            <div class="received-control">
                                                <Button size="small">
                                                    Product Received
                                                </Button>

                                                <Button size="small" :disabled="disableReturn" variant="outlined">
                                                    Return Funds {{ pendingCountdown }}
                                                </Button>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <!--////////////////PRODUCT/////////////////////-->
                <template v-if="currentNav === 1">
                    <div class="product" v-if="orderData">
                        <div class="product-name">
                            Razer - Blade 15 - 15.6 Gaming Laptop - QHD 240Hz - Intel Core i7 - NVIDIA
                            GeForce RTX 4070
                            - 16GB RAM - 1TB SSD - Black - Open Box
                        </div>

                        <div class="product-card flex">

                            <div class="product-card-image flex">
                                <img src="https://pairfy.dev/api/media/get-image/4NWYDtDBHwszeyIsd7Td.jpeg" alt="">
                            </div>

                            <div class="product-card-box flex">
                                <li class="flex">
                                    <div>ID</div>
                                    <div>{{ orderData.product_id }}</div>
                                </li>
                                <li class="flex">
                                    <div>SKU</div>
                                    <div>{{ orderData.product_sku.split(":")[0] }}</div>
                                </li>
                                <li class="flex">
                                    <div>Brand</div>
                                    <div>Razer</div>
                                </li>
                                <li class="flex">
                                    <div>Price</div>
                                    <div>{{ formatCurrency(orderData.product_price) }} USD</div>
                                </li>
                                <li class="flex">
                                    <div>Collateral</div>
                                    <div>{{ orderData.product_collateral }} ADA</div>
                                </li>
                                <li class="flex">
                                    <div>Model</div>
                                    <div>Laptop 16</div>
                                </li>
                            </div>
                        </div>
                    </div>
                </template>
                <!--/////////////////////////////////////////-->
                <div class="col right">
                    <div class="chat">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref, watch, computed, inject, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NETWORK } from '@/api';

const { copyToClipboard, formatCurrency, convertLovelaceToUSD, formatWithDots, convertLovelaceToADA, reduceByLength } = inject('utils');

const route = useRoute();

const router = useRouter();

const currentNav = ref(1);

const setNav = (e) => {
    currentNav.value = e
}

const txHash = ref(null)

const queryVariablesRef = ref({
    "getOrderVariable": {
        "id": null
    },
})
const queryEnabled = ref(false)

const { result: getOrderResult, onError: onGetOrderError } = useQuery(gql`
query ($getOrderVariable: GetOrderInput!) {
    getOrder(getOrderInput: $getOrderVariable) {
        id
        status_log
        contract_address
        contract_state
        ada_price
        contract_price
        contract_collateral
        contract_units 
        pending_until
        pending_tx
        pending_block
        watch_until
        product_id
        product_sku
        product_price
        product_collateral
        product_discount
        product_discount_value
    }
}
`,
    () => (queryVariablesRef.value)
    ,
    () => ({
        enabled: queryEnabled.value,
        clientId: 'gateway',
        pollInterval: 15000
    })
);


const updateQueryVariables = (id) => {
    queryVariablesRef.value = {
        getOrderVariable: {
            id
        }
    }
}


watch(
    () => route,
    (route) => {
        if (route.params.id) {
            queryEnabled.value = true;
            updateQueryVariables(route.params.id)
        }

        if (route.query.tx) {
            txHash.value = route.query.tx;
        }
    },
    { immediate: true }
);

const orderData = ref(null);

const contractAdress = ref("N/A");

const statusLog = ref("created");

const orderPayment = ref(null);

const pendingUntil = ref(null);

const pendingBlock = ref(null);

const lockingBlock = ref(null);

const shippingBlock = ref(null);

const contractFiat = ref(0);

const contractPrice = ref(0);

const contractUnits = ref(0);

watch(getOrderResult, value => {
    if (value) {
        const order = value.getOrder;

        orderData.value = order;

        contractAdress.value = order.contract_address;

        statusLog.value = order.status_log;

        orderPayment.value = getPaymentStatus(order.pending_block)

        pendingUntil.value = order.pending_until

        contractPrice.value = convertLovelaceToADA(order.contract_price);

        contractUnits.value = order.contract_units;

        pendingBlock.value = order.pending_block;

        txHash.value = order.pending_tx;

        contractFiat.value = convertLovelaceToUSD(order.contract_price, order.ada_price)

        globalTimestamp.value = getTimestamp(order);

        pendingTimestamp.value = order.pending_until;
    }
}, { immediate: true })

const timeline = ref([
    {
        number: 1,
        title: "Order Created",
        subtitle: "",
        completed: true,
        type: "box",
        template: "created",
        line: true
    },
    {
        number: 2,
        title: "Preparation",
        subtitle: "The seller has been notified to prepare your product.",
        completed: false,
        type: "box",
        template: "preparation",
        line: true
    },
    {
        number: 3,
        title: "Received",
        subtitle: "Please confirm that the exact product was delivered.",
        completed: false,
        type: "button",
        template: "received",
        line: false
    }
])


////////////////////////////////

const globalTimestamp = ref(Date.now());

const globalTimeLeft = ref(globalTimestamp.value - Date.now());

const globalCountdown = computed(() => {
    if (globalTimeLeft.value <= 0) return "00:00";

    const totalSeconds = Math.floor(globalTimeLeft.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
});

let globalInterval;

const updateGlobalCountdown = () => {
    globalTimeLeft.value = globalTimestamp.value - Date.now();
};

////////////////////////////////

const pendingTimestamp = ref(Date.now());

const pendingTimeLeft = ref(pendingTimestamp.value - Date.now());

const disableReturn = computed(() => {

    if (statusLog.value === 'expired') {
        return false
    }

    return Date.now() < pendingUntil.value
});

const pendingCountdown = computed(() => {
    if (pendingTimeLeft.value <= 0) return "00:00";

    const totalSeconds = Math.floor(pendingTimeLeft.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
});

let pendingInterval;

const updatePendingCountdown = () => {
    pendingTimeLeft.value = pendingTimestamp.value - Date.now();
};


///////////////////////////////

onMounted(() => {
    updateGlobalCountdown();
    updatePendingCountdown();
    globalInterval = setInterval(updateGlobalCountdown, 1000);
    pendingInterval = setInterval(updatePendingCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(globalInterval);
});

//////////////////////////////////////////////77

const getPaymentStatus = (pending_block) => {
    if (!pending_block) {
        return {
            label: "unconfirmed",
            template: "loading",
            color: "var(--red-a)"
        }
    }

    const now = Math.floor(Date.now() / 1000);
    const diff = now - pending_block;
    const minutes = Math.floor(diff / 60);

    console.log(minutes, "minutes_pending_block");

    if (minutes <= 15) {
        return {
            label: "confirming",
            template: "icon",
            icon: "pi pi-eye",
            color: "var(--orange-a)"
        }
    }


    if (minutes >= 15) {
        return {
            label: "confirmed",
            template: "icon",
            icon: "pi pi-eye",
            color: "var(--green-a)"
        }
    }

}

const getTimestamp = (order) => {
    console.log("contract_state", order.contract_state)
    if (order.contract_state === null) {
        return order.watch_until
    }
    if (order.contract_state === 0) {
        return order.pending_until
    }
}

const openExplorer = () => {
    window.open(`https://${NETWORK}.cexplorer.io/tx/${txHash.value}`, '_blank');
}

</script>

<style lang="css" scoped>
.wrap {
    display: flex;
    justify-content: center;
}

.container {
    min-height: 100vh;
    max-width: 1200px;
    width: 100%;
}

.nav {
    border-bottom: 1px solid var(--border-a);
    margin-top: 1rem;
}

.nav-item {
    justify-content: center;
    flex-direction: column;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--text-b);
    margin-right: 2rem;
    transition: 0.2s;
}

.nav-item.selected {
    color: var(--text-a);
    font-weight: 600;
}

.nav-item span {
    color: inherit;
    font-weight: 600;
    padding: 0.5rem 0;
}

.nav-item .nav-item-border {
    width: 20%;
    height: 3px;
    background: transparent;
}

.nav-item .nav-item-border.selected {
    background: var(--primary-c);
}

.grid {
    display: grid;
    grid-template-columns: 70% 30%;
    margin-top: 2rem;
}

.summary {
    display: flex;
    flex-direction: column;
    width: 80%;
}

.summary-title {
    font-size: var(--text-size-c);
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.summary-title span {
    color: var(--primary-c);
    font-weight: 700;
}

.summary-subtitle {
    font-size: var(--text-size-a);
    margin-bottom: 0.5rem;
    color: var(--text-a);
}

.summary-subtitle span {
    color: var(--text-b);
    margin-left: 0.5rem;
}

.summary-subtitle button {
    background: transparent;
    border: none;
}

.summary-subtitle button i {
    font-size: var(--text-size-a);
}

.chat {
    width: 100%;
    height: 700px;
    background: var(--background-b);
}


.timeline {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.timeline-item {
    display: flex;
    width: 100%;
}

.timeline-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
}

.timeline-bar-box {
    width: inherit;
    min-height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.timeline-bar-line {
    width: 3px;
    height: 100%;
    background: var(--background-b);
}

.timeline-bar-line.disabled {
    background: transparent;
}

.timeline-body {
    display: flex;
    flex-direction: column;
    width: inherit;
}

.timeline-title {
    min-height: 44px;
    font-weight: 700;
}

.timeline-subtitle {
    font-size: var(--text-size-a);
    min-height: 22px;
}

.timeline-content {
    border: 1px solid var(--border-a);
    border-radius: 12px;
    height: 100%;
    width: inherit;
    margin-top: 0.5rem;
}

.timeline-content.button {
    border: 1px solid transparent;
}

.diamond {
    width: 20px;
    height: 20px;
    background-color: var(--background-b);
    transform: rotate(45deg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-radius: 4px;
}

.diamond span {
    transform: rotate(-45deg);
    font-size: var(--text-size-a);
    font-weight: 600;
}

.diamond span i {
    font-size: 10px;
}


.created {
    display: block;
    padding: 1rem;
}

.created-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 2.25rem;
    text-transform: capitalize;
}

.created-item span {
    font-weight: 500;
}

.created-item span:nth-child(1) {
    color: var(--text-b);
}

.payment {
    background: var(--background-b);
    border-radius: 20px;
    padding-right: 1rem;
    overflow: hidden;
    cursor: pointer;
}

.payment-label {
    font-size: var(--text-size-a);
    font-weight: 600;
    border-right: 1px solid var(--border-a);
    padding: 0 1rem;
    margin-right: 0.75rem;
}

.payment-label.unconfirmed {
    color: var(--red-a);
}

.payment-label.confirmed {
    color: var(--green-a);
}

.payment-symbol {
    justify-content: center;
    margin-left: 1px;
}

.payment-loader {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin-left: 1px;
}

.payment-loader.warn {
    border: 2px solid var(--orange-a);
    border-bottom-color: transparent;
}

.payment-loader.danger {
    border: 2px solid var(--red-a);
    border-bottom-color: transparent;
}


@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.received-control button {
    margin-right: 1rem;
    font-weight: 600;
}

.product {
    display: flex;
    flex-direction: column;
    width: 80%;
}

.product-name {
    font-weight: 600;
    font-size: var(--text-size-c);
}

.product-card {
    border: 1px solid var(--border-a);
    border-radius: 12px;
    padding: 1rem;
    width: 100%;
    margin-top: 1rem;
}

.product-card-image {
    border: 1px solid var(--border-a);
    border-radius: 8px;
    overflow: hidden;
    padding: 1rem;
    justify-content: center;
}

.product-card-image img {
    width: 100px;
    border-radius: 8px;
}

.product-card-box {
    display: block;
    margin-left: 1rem;
    width: inherit;
}

.product-card-box li {
    list-style: none;
    color: var(--text-b);
    line-height: 1.75rem;
    justify-content: space-between;
}
</style>