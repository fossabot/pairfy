<template>
    <div class="pad">

        <PackageReceived />

        <ReturnButton />

        <Button v-if="currentState === 1" type="button" :disabled="disableCancel" variant="text">
            <span>Cancel Order</span>

            <span v-if="shippingCountdown !== '00:00'">
                {{ shippingCountdown }}
            </span>
        </Button>

        <Button type="button" label="Appeal" :disabled="true" variant="text" :loading="false" />

    </div>
</template>

<script setup>

import ReturnButton from '@/views/order/ReturnButton.vue';
import PackageReceived from '@/views/order/PackageReceived.vue';
import orderAPI from "@/views/order/api/index";
import { computed, ref, onMounted, onUnmounted } from "vue";

const { getOrderData } = orderAPI();

const currentState = computed(() => getOrderData.value?.order?.contract_state || undefined)

const disableCancel = computed(() => shippingCountdown.value !== "00:00" || getOrderData.value?.order?.finished);

///////////////////////////////////////////////////////////////////

const shippingTimeLeft = ref(Date.now());

const shippingCountdown = computed(() => {
    if (shippingTimeLeft.value <= 0) return "00:00";

    const totalSeconds = Math.floor(shippingTimeLeft.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
});

let shippingInterval;

const updateShippingCountdown = () => {
    shippingTimeLeft.value = getOrderData.value?.order?.shipping_until - Date.now();
};

onMounted(() => {
    updateShippingCountdown();
    shippingInterval = setInterval(updateShippingCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(shippingInterval);
});

const showSuccess = (content, time) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: time });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};

</script>

<style lang="css" scoped>
.pad button {
    margin-right: 1rem;
    font-weight: 600;
    font-size: var(--text-size-1);
}
</style>