<template>
    <div class="wrap">
        <div class="container">
            <div class="nav">

            </div>
            <div class="grid">
                <div class="summary" v-if="orderData">
                    <div class="summary-title">
                        Preparing Your Product, Time Remaining <span>{{ countdownText }}</span>
                    </div>
                    <div class="summary-subtitle">
                        Order number <span>{{ formatWithDots(orderData.id, 40) }}</span>
                    </div>
                    <div class="summary-subtitle">
                        Contract Address <span> {{ contractAdress }}</span>
                    </div>
                    <Divider />
                    <div class="timeline">
                        <div class="timeline-item" v-for="item in timeline" :key="item">
                            <div class="timeline-bar">
                                <div class="timeline-bar-box">
                                    <div class="diamond">
                                        <span>{{ item.number }}</span>
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
                                                <span>Fiat Amount</span>
                                                <span>${{ formatCurrency(contractFiat) }} USD</span>
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
                                                    <div class="payment flex">
                                                        <div class="payment-label"
                                                            :class="{ unconfirmed: true, confirmed: false }">
                                                            unconfirmed
                                                        </div>
                                                        <div class="payment-loader" />
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="created-item">
                                                <span>Status</span>
                                                <span>Expired</span>
                                            </div>
                                        </div>
                                    </template>

                                    <template v-if="item.template === 'preparation'">

                                    </template>

                                    <template v-if="item.template === 'received'">
                                        <Button size="small" style="font-weight: 600;">
                                            Product Received
                                        </Button>
                                    </template>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

const { formatCurrency, convertLovelaceToUSD, formatWithDots, convertLovelaceToADA } = inject('utils');

const route = useRoute()

const router = useRouter()


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
        contract_address
        contract_state
        ada_price
        contract_price
        contract_units 
        watch_until
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
    () => route.params.id,
    (id) => {
        if (id) {
            queryEnabled.value = true;
            updateQueryVariables(id)
        }
    },
    { immediate: true }
);

const orderData = ref(null);

const targetTimestamp = ref(Date.now());

const contractAdress = ref("N/A");

const contractFiat = ref(0);

const contractPrice = ref(0);

const contractUnits = ref(0);

watch(getOrderResult, value => {
    if (value) {
        const order = value.getOrder;

        orderData.value = order;

        contractAdress.value = order.contract_address;

        contractPrice.value = convertLovelaceToADA(order.contract_price);

        contractUnits.value = order.contract_units;

        contractFiat.value = convertLovelaceToUSD(order.contract_price, order.ada_price)

        targetTimestamp.value = order.watch_until;
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
        subtitle: "Please confirm that the exact product was delivered successfully.",
        completed: false,
        type: "button",
        template: "received",
        line: false
    }
])


////////////////////////////////



const timeLeft = ref(targetTimestamp.value - Date.now());

const countdownText = computed(() => {
    if (timeLeft.value <= 0) return "00:00";

    const totalSeconds = Math.floor(timeLeft.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
});

let interval;

const updateCountdown = () => {
    timeLeft.value = targetTimestamp.value - Date.now();
};

onMounted(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});


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
    height: 50px;
    border-bottom: 1px solid var(--border-a);
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
    font-size: var(--text-size-c);
    font-weight: 700;
    line-height: 3rem;
}

.summary-title span {
    color: var(--primary-c);
    font-weight: 700;
}

.summary-subtitle {
    font-size: var(--text-size-a);
    line-height: 2rem;
}

.summary-subtitle span {
    color: var(--text-b);
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

.created {
    display: block;
    padding: 1rem;
}

.created-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 2.25rem;
}

.created-item span {
    font-weight: 600;
}

.created-item span:nth-child(1) {
    color: var(--text-b);
}

.payment {
    background: var(--background-b);
    border-radius: 20px;
    padding-right: 1rem;
    overflow: hidden;
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

.payment-loader {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--red-a);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin-left: 1px;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>