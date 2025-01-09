<template>
    <div class="transactions">
        <div class="card">
            <div class="card-head flex">
                <span>Pending</span>

                <span class="ago">{{ formatAgo(getOrderData.order.pending_block) }}</span>
            </div>
            <div class="card-body">
                <span class="mask">{{ getOrderData.order.pending_tx || "None" }}</span>
            </div>
        </div>

        <div class="card">
            <div class="card-head flex">
                <span>Locking</span>

                <span class="ago">{{ formatAgo(getOrderData.order.locking_block) }}</span>
            </div>
            <div class="card-body">
                <span class="mask">{{ getOrderData.order.locking_tx || "None" }}</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import orderAPI from "@/views/order/api/index";
import { format } from 'timeago.js';

const { getOrderData } = orderAPI();

const formatAgo = (date) => {
    if (!date) {
        return ""
    }

    return format(date * 1000, 'en_US');
}

</script>

<style lang="css" scoped>
.transactions {
    width: 80%;
}

.card {
    border-radius: 12px;
    border: 1px solid var(--border-a);
    margin-bottom: 1rem;
}

.card-head {
    border-bottom: 1px solid var(--border-a);
    padding: 0.5rem 1rem;
    font-weight: 500;
    justify-content: space-between;
}

.card-body {
    padding: 1rem;

}

.ago {
    font-size: var(--text-size-1);
}

.mask {
    background: var(--background-b);
    padding: 0.5rem;
    border-radius: 8px;
}
</style>