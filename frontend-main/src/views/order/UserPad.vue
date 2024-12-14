<template>
    <div class="pad">
        <Button size="small">
            Product Received
        </Button>

        <Button type="button" size="small" :disabled="disableReturn" variant="outlined" @click="onReturnFunds"
            :loading="true">
            Return Funds {{ pendingCountdown }}
        </Button>
    </div>
</template>

<script setup>
import gql from 'graphql-tag'
import orderAPI from "@/views/order/api/index";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useMutation } from '@vue/apollo-composable'
import { useToast } from "primevue/usetoast";

const toast = useToast();

const { getOrderData } = orderAPI();

const { mutate: returnFunds, loading: returnFundsLoading, onDone: onReturnFundsDone, onError: onReturnFundsError } = useMutation(gql`
      mutation($returnFundsVariable: ReturnFundsInput!) {
        returnFunds(returnFundsInput: $returnFundsVariable) {
          success
          payload {
            cbor
          }
        }
      }
`, {
    clientId: 'gateway'
})

const onReturnFunds = () => {
    returnFunds({
        "returnFundsVariable": {
            order_id: getOrderData.value.id
        }
    })
}

onReturnFundsDone(result => {
    console.log(result.data)
})

onReturnFundsError(error => {
    showError(error)
})


const pendingUntil = computed(() => getOrderData.value.pending_until);

const disableReturn = computed(() => Date.now() < pendingUntil.value);

///////////////////////////////////////////////////////////////////

const pendingTimestamp = ref(pendingUntil.value);

const pendingTimeLeft = ref(pendingTimestamp.value - Date.now());

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

/////////////////////////////////////////////////


const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};


onMounted(() => {
    updatePendingCountdown();
    pendingInterval = setInterval(updatePendingCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(pendingInterval);
});

</script>

<style lang="css" scoped>
.pad button {
    margin-right: 1rem;
    font-weight: 600;
}
</style>