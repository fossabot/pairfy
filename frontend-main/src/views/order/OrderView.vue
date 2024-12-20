<template>
    <div class="wrap">
        <SellerLogin />
        <div class="container">
            <div class="nav flex">
                <div class="nav-item" :class="{ selected: currentNav === 0 }" @click="currentNav = 0">
                    <span>Information</span>
                    <div class="nav-item-border" :class="{ selected: currentNav === 0 }" />
                </div>
                <div class="nav-item" :class="{ selected: currentNav === 1 }" @click="currentNav = 1">
                    <span>Product</span>
                    <div class="nav-item-border" :class="{ selected: currentNav === 1 }" />
                </div>
                <div class="nav-item" :class="{ selected: currentNav === 2 }" @click="currentNav = 2">
                    <span>Transactions</span>
                    <div class="nav-item-border" :class="{ selected: currentNav === 2 }" />
                </div>
            </div>
            <div class="grid">
                <!--SUMMARY-->
                <template v-if="currentNav === 0">
                    <Skeleton v-if="!orderData" width="80%" height="100%" />

                    <div class="summary" v-if="orderData">

                        <div class="summary-title flex">
                            <template v-if="!isFinished">
                                <div v-if="getCurrentUser">
                                    {{ summaryTitle.buyer }}
                                </div>
                                <div v-if="getCurrentSeller">
                                    {{ summaryTitle.seller }}
                                </div>
                                <span>{{ globalCountdown }}</span>
                            </template>

                            <div v-if="isFinished">
                                {{ summaryTitle.finished }}
                            </div>

                            <FinishedICon />
                        </div>
                        <div class="summary-subtitle flex">
                            Order number
                            <div>
                                <span>{{ reduceByLength(orderData.id, 20) }}</span>
                            </div>
                            <button class="copy-button flex" @click="copyToClipboard(orderData.id)"
                                v-tooltip.top="'Copy'">
                                <i class="pi pi-clone" />
                            </button>
                            <button class="copy-button flex" @click="openExplorer" v-tooltip.top="'Explorer'">
                                <i class="pi pi-globe" />
                            </button>
                        </div>
                        <div class="summary-subtitle flex">
                            Contract Address
                            <div>
                                <span> {{ reduceByLength(orderData.contract_address, 20) }}</span>
                            </div>
                            <button class="copy-button flex" @click="copyToClipboard(orderData.contract_address)"
                                v-tooltip.top="'Copy'">
                                <i class="pi pi-clone" />
                            </button>
                        </div>
                        <Divider class="divider" :unstyled="true" />
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
                                            <template v-if="item.template === 'shipping'">
                                                <span v-if="!lockingBlock">{{ item.number }}</span>
                                                <span v-else>
                                                    <i class="pi pi-check" />
                                                </span>
                                            </template>
                                            <template v-if="item.template === 'received'">
                                                <span v-if="!isFinished">{{ item.number }}</span>
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

                                    <div v-if="item.subtitle" class="timeline-subtitle flex">

                                        <span v-if="getCurrentUser">
                                            {{ item.subtitle.buyer }}
                                        </span>

                                        <span v-if="getCurrentSeller">
                                            {{ item.subtitle.seller }}
                                        </span>

                                    </div>

                                    <div class="timeline-content"
                                        :class="{ box: item.type === 'box', button: item.type === 'button' }">

                                        <template v-if="item.template === 'created'">
                                            <div class="created">
                                                <div class="created-item">
                                                    <span>Status</span>
                                                    <span :class="{ returned: statusLog === 'returned' }">{{ statusLog
                                                        }}</span>
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
                                                    <span>ADA Price</span>
                                                    <span>{{ orderData.ada_price }} ADA</span>
                                                </div>
                                                <div class="created-item">
                                                    <span>Quantity</span>
                                                    <span>{{ orderData.contract_units }}</span>
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


                                        <template v-if="item.template === 'shipping'">
                                            <div class="created">
                                                <div class="created-item">
                                                    <span>Status</span>
                                                    <span>{{ shippingStatus }}</span>
                                                </div>

                                                <div class="created-item">
                                                    <span>Collateral</span>
                                                    <span>{{ contractCollateral }} ADA</span>
                                                </div>
                                                <div class="created-item">
                                                    <span>Guide</span>
                                                    <span>{{ trackingGuide }}</span>
                                                </div>
                                            </div>
                                        </template>

                                        <template v-if="item.template === 'received'">
                                            <UserPad v-if="getCurrentUser" />
                                            <SellerPad v-if="getCurrentSeller" />
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <!--////////////////PRODUCT/////////////////////-->
                <template v-if="currentNav === 1">
                    <Skeleton v-if="!orderData" width="80%" height="100%" />

                    <div class="product" v-if="orderData">
                        <div class="product-header flex">
                            <img src="https://pairfy.dev/api/media/get-image/4NWYDtDBHwszeyIsd7Td.jpeg" alt="">

                            <div class="product-name">
                                Razer - Blade 15 - 15.6 Gaming Laptop - QHD 240Hz - Intel Core i7 - NVIDIA
                                GeForce RTX 4070
                                - 16GB RAM - 1TB SSD - Black - Open Box
                            </div>
                        </div>

                        <div class="product-card flex">
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
                                    <div>{{ orderData.product_brand }}</div>
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
                                    <div>{{ orderData.product_model }}</div>
                                </li>
                            </div>
                        </div>
                        <div class="product-list">
                            <ul>
                                <li v-for="item of orderData.product_bullet_list.split(',')" :key="item">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>

                        <div class="product-features">
                            <editor-content :editor="editor" />
                        </div>
                    </div>
                </template>
                <!--/////////////////////////////////////////-->
                <div class="col right">
                    <ChatComp />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import orderAPI from "@/views/order/api/index";
import UserPad from "@/views/order/UserPad.vue";
import SellerPad from "@/views/order/SellerPad.vue";
import SellerLogin from "@/views/order/SellerLogin.vue";
import FinishedICon from "@/views/order/FinishedIcon.vue";
import headerAPI from "@/components/header/api";
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import ChatComp from "@/views/order/ChatComp.vue"; 
import { ref, watch, computed, inject, onMounted, onUnmounted, onBeforeUnmount, nextTick } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { useRouter, useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { NETWORK } from '@/api';

const { copyToClipboard, formatCurrency, convertLovelaceToUSD, convertLovelaceToADA, reduceByLength } = inject('utils');

const { getCurrentSeller, getCurrentUser } = headerAPI();

const { setOrderData } = orderAPI();

const route = useRoute();

const router = useRouter();

const currentNav = ref(0);

const summaryTitle = ref({
    buyer: "Preparing your product, Time Remaining ",
    seller: "Prepare the product, Time Remaining ",
    finished: "Order Finished",
    completed: "Order Completed",
})

const timeline = ref([
    {
        number: 1,
        title: "Order Created",
        subtitle: {
            buyer: "The seller has been notified to prepare your package.",
            seller: `Please verify the payment and click the "Accept Order" button.`
        },
        completed: true,
        type: "box",
        template: "created",
        line: true
    },
    {
        number: 2,
        title: "Shipping",
        subtitle: {
            buyer: "Use the tracking number to check your shipment.",
            seller: `Dispatch the package and press the "Dispatched" button.`
        },
        completed: false,
        type: "box",
        template: "shipping",
        line: true
    },
    {
        number: 3,
        title: "Finished",
        subtitle: {
            buyer: "Please confirm that the exact product was delivered.",
            seller: "Accept the order and dispatch the product."
        },
        completed: false,
        type: "button",
        template: "received",
        line: false
    }
])

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
        finished
        scanned_at
        status_log
        ada_price
        contract_address
        contract_state
        contract_price
        contract_collateral
        contract_units
        product_id
        product_name
        product_price
        product_collateral
        product_sku
        product_model
        product_brand
        product_features
        product_bullet_list
        product_discount
        product_discount_value
        watch_until
        pending_until
        shipping_until
        pending_tx
        pending_block
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

const pendingTx = ref(null);

watch(
    () => route,
    ({ params, query }) => {
        if (params.id) {
            queryEnabled.value = true;
            updateQueryVariables(params.id)
        }

        if (query.tx) {
            pendingTx.value = query.tx;
        }
    },
    { immediate: true }
);

const orderData = ref(null);

const statusLog = ref("created");

const orderPayment = ref(null);

const pendingBlock = ref(null);

const lockingBlock = ref(null);

const shippingBlock = ref(null);

const contractFiat = ref(0);

const contractPrice = ref(0);

const contractCollateral = ref(0);

const isFinished = ref(false);

const shippingStatus = computed(() => {
    const state = orderData.value?.contract_state;

    if (state === 0) {
        return "pending"
    }

    if (state === 1) {
        return "preparing the package"
    }

    if (state === 2) {
        return "the package has been sent"
    }

    if (state === 3) {
        return "the package has been received"
    }
    return "-"
});

const trackingGuide = ref("-");

watch(getOrderResult, value => {
    if (value) {
        const order = value.getOrder;

        orderData.value = order;

        setOrderData(order);

        isFinished.value = order.finished;

        statusLog.value = order.status_log;

        orderPayment.value = getPaymentStatus(order.pending_block)

        contractPrice.value = convertLovelaceToADA(order.contract_price);

        contractCollateral.value = convertLovelaceToADA(order.contract_collateral);

        pendingBlock.value = order.pending_block;

        pendingTx.value = order.pending_tx || pendingTx.value;

        contractFiat.value = convertLovelaceToUSD(order.contract_price, order.ada_price)

        globalTimestamp.value = getTimestamp(order);

        if (editor) {
            editor.value.commands.setContent(JSON.parse(order.product_features));
        }
    }
}, { immediate: true })

////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////

const editor = ref(null);

const setupEditor = async () => {
    await nextTick(() => {
        editor.value = new Editor({
            editable: false,
            extensions: [
                StarterKit,
                TextStyle.configure({ types: [ListItem.name] }),
            ],
            editorProps: {
                attributes: {
                    class: 'editor-class',
                },
            },
            content: "",
        })
    });
}

//////////////////////////////////////////////

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

    if (order.contract_state === -1) {
        return Date.now()
    }

    if (order.contract_state === 1) {
        return order.shipping_until
    }
}

const openExplorer = () => {
    window.open(`https://${NETWORK}.cexplorer.io/tx/${pendingTx.value}`, '_blank');
}

/////////////////////////////////////////////

onMounted(() => {
    updateGlobalCountdown();
    globalInterval = setInterval(updateGlobalCountdown, 1000);
    setupEditor();
});

onBeforeUnmount(() => {
    editor.value.destroy()
})

onUnmounted(() => {
    clearInterval(globalInterval);
});
</script>

<style lang="css" scoped>
.divider {
    border-color: var(--border-b);
    background: var(--border-b);
    margin: 1rem 0;
    height: 1px;
}

.wrap {
    display: flex;
    justify-content: center;
    background: var(--background-c);
    color: var(--text-w);
}

.container {
    min-height: 100vh;
    max-width: 1300px;
    width: 100%;
}

.nav {
    border-bottom: 1px solid var(--border-b);
    margin-top: 2rem;
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
    color: var(--text-w);
    font-weight: 600;
}

.nav-item span {
    color: inherit;
    font-weight: 600;
    padding: 0.5rem 0;
}

.nav-item .nav-item-border {
    width: 50%;
    height: 3px;
    background: transparent;
    border-radius: 3px;
}

.nav-item .nav-item-border.selected {
    background: var(--primary-b);
}

.grid {
    display: grid;
    grid-template-columns: 70% 30%;
    margin-top: 1rem;
}

.summary {
    display: flex;
    flex-direction: column;
    width: 80%;
}

.summary-title {
    font-size: var(--text-size-3);
    font-weight: 600;
    line-height: 3rem;
    position: relative;
}

.summary-title span {
    color: var(--primary-b);
    font-weight: 700;
    margin-left: 0.5rem
}

.summary-subtitle {
    font-size: var(--text-size-1);
    line-height: 2rem;
    color: var(--text-b);
}

.summary-subtitle span {
    color: var(--text-w);
    margin-left: 0.5rem;
}

.summary-subtitle button {
    background: transparent;
    border: none;
    cursor: pointer;
}

.summary-subtitle button i {
    font-size: var(--text-size-1);
    color: var(--text-w);
}

.copy-button:hover {
    color: var(--primary-c);
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
    min-height: 50px;
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
    min-height: 50px;
    font-weight: 600;
    font-size: var(--text-size-2);
}

.timeline-subtitle {
    font-size: var(--text-size-1);
    margin-bottom: 1rem;
}

.timeline-content {
    border: 1px solid var(--border-b);
    border-radius: 12px;
    height: 100%;
    width: inherit;
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
    font-size: var(--text-size-1);
    font-weight: 600;
    color: var(--text-a);
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
    font-size: var(--text-size-2);
}

.created-item span:nth-child(1) {
    color: var(--text-b);
}

.returned {
    color: var(--red-a);
}

.payment {
    background: inherit;
    border-radius: 20px;
    padding-right: 1rem;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--border-b);
}

.payment-label {
    font-size: var(--text-size-1);
    font-weight: 600;
    border-right: 1px solid var(--border-b);
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

.product {
    display: flex;
    flex-direction: column;
    width: 80%;
}

.product-name {
    font-weight: 500;
    font-size: var(--text-size-3);
    margin-left: 1rem;
}

.product-header {
    border: 1px solid var(--border-b);
    padding: 1rem;
    border-radius: 12px;
    margin-top: 1rem;
}


.product-header img {
    width: 100px;
    height: 100px;
    padding: 0.5rem;
    border: 1px solid var(--border-b);
    border-radius: 12px;
    display: flex;
    object-fit: contain;
    justify-content: center;
    align-items: center;
}

.product-card-box {
    display: block;
    width: inherit;
}

.product-card-box li {
    list-style: none;
    line-height: 1.75rem;
    justify-content: space-between;
    font-size: var(--text-size-2);
    font-weight: 500;
    line-height: 2.25rem;
}

.product-card-box li div:nth-child(1) {
    color: var(--text-b);
}

.product-card {
    border: 1px solid var(--border-b);
    border-radius: 12px;
    padding: 1rem;
    width: 100%;
    margin-top: 1rem;
    padding: 1.5rem;
}

.product-list {
    border: 1px solid var(--border-b);
    padding: 1.5rem;
    margin-top: 1rem;
    border-radius: 12px;
}

.product-list ul {
    padding-left: 1rem;
    justify-content: space-between;
    font-size: var(--text-size-1);
}

.product-list li {
    line-height: 2.25rem;
}

.product-features {
    border: 1px solid var(--border-b);
    margin-top: 1rem;
    border-radius: 12px;
    padding: 1.5rem;
}

::v-deep(.product-features ul) {
    padding-left: 1rem;
}

::v-deep(.editor-class) {
    line-height: 2.25rem;
    font-size: var(--text-size-0);
}
</style>