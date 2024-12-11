<template>
    <div class="wrap">
        <div class="container">
            <div class="nav">

            </div>
            <div class="grid">
                <div class="summary" v-if="orderData">
                    <div class="summary-title">
                        Preparing Your Product, Time Remaining <span>29:30</span>
                    </div>
                    <div class="summary-subtitle">
                        Order number <span>{{ formatWithDots(orderData.id, 40) }}</span>
                    </div>
                    <div class="summary-subtitle">
                        Contract Address <span> addr_test1wpf5esu6m0hx58y6cf8vyxnpn8ggekpx0z7j6kcn54jekgsnt2dvr</span>
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
                                                <span>$3.768 USD</span>
                                            </div>
                                            <div class="created-item">
                                                <span>ADA Amount</span>
                                                <span>8.000 ADA</span>
                                            </div>
                                            <div class="created-item">
                                                <span>Quantity</span>
                                                <span>3</span>
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
import { ref, watch, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { formatWithDots } = inject('utils');

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

watch(getOrderResult, value => {
    if (value) {
        orderData.value = value.getOrder;
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
}

.summary-title {
    font-size: var(--text-size-c);
    font-weight: 700;

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
    display: block;
    width: 90%;
    box-sizing: border-box;
}

.timeline-item {
    display: flex;
    width: inherit;
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
    line-height: 2rem;
}

.created-item span {
    font-weight: 600;
}

.created-item span:nth-child(1) {
    color: var(--text-b);
}
</style>