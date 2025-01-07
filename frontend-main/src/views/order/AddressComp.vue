<template>
    <div class="card" v-if="addressData">
        <div class="card-head flex">
           <span> Dispatch To</span>
        </div>
        <div class="card-body">
            {{ addressData }}
        </div>
    </div>
</template>

<script setup>
import orderAPI from "@/views/order/api/index";
import { computed } from 'vue';
import { Buffer } from 'buffer';

const { getOrderData } = orderAPI();

const addressData = computed(() => {
    let data = getOrderData.value?.address;

    if (data) {
        const addressParsed = JSON.parse(Buffer.from(data, 'base64').toString("utf-8"));

        return Buffer.from(addressParsed.data, 'base64').toString("utf-8")
    }

    return null
});

</script>

<style lang="css" scoped>
.card {
    border-radius: 12px;
    border: 2px solid var(--border-a);
    margin-top: 1rem;
}

.card-head {
    font-weight: 600;
    padding: 1rem;
    border-bottom: 1px solid var(--border-a);
}

.card-body{
    padding: 1rem;
}


</style>