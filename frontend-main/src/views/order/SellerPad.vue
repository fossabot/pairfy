<template>
    <div class="pad">
     
        <Button size="small" v-if="currentState === 0" :disabled="disableAccept" @click="onLockingFunds">
            Accept Order
            <span v-if="pendingCountdown !== '00:00'">
                {{ pendingCountdown }}
            </span>
        </Button>

        <DispatchForm />

        <Button type="button" size="small" label="Appeal" :disabled="true" variant="text" :loading="false" />

    </div>
</template>

<script setup>
import gql from 'graphql-tag'
import orderAPI from "@/views/order/api/index";
import DispatchForm from '@/views/order/DispatchForm.vue';
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useMutation } from '@vue/apollo-composable'
import { useToast } from "primevue/usetoast";
import { balanceTx } from "@/api/wallet";

const toast = useToast();

const { getOrderData } = orderAPI();

const { mutate: lockingFunds, loading: lockingFundsLoading, onDone: onLockingFundsDone, onError: onLockingFundsError } = useMutation(gql`
      mutation($lockingFundsVariable: LockingFundsInput!) {
        lockingFunds(lockingFundsInput: $lockingFundsVariable) {
          success
          payload {
            cbor
          }
        }
      }
`, {
    clientId: 'gateway'
})


onLockingFundsDone(async result => {
    console.log(result.data);

    const response = result.data;

    if (response.lockingFunds.success === true) {
        try {
            const { cbor } = response.lockingFunds.payload;

            showSuccess(`Processing Transaction`, 100000);

            const txHash = await balanceTx(cbor);

            showSuccess(`Transaction submitted with hash: ${txHash} The transaction takes approximately 5 minutes to appear on the blockchain.`, 200000);

            console.log(`Transaction submitted with hash: ${txHash}`);

        } catch (err) {
            console.error(err);

            showError(err);
        }
    }

})

onLockingFundsError(error => {
    showError(error)
})

const onLockingFunds = () => {
    lockingFunds({
        "lockingFundsVariable": {
            order_id: getOrderData.value.id
        }
    })
}


///////////////////////////////////////////////////////////////////////////////////////////

const currentState = computed(() => getOrderData.value?.contract_state);

const disableAccept = computed(() => pendingCountdown.value === "00:00" || getOrderData.value.contract_state !== 0)
///////////////////////////////////////////////////////////////////

const pendingTimeLeft = ref(Date.now());

const pendingCountdown = computed(() => {
    if (pendingTimeLeft.value <= 0) return "00:00";

    const totalSeconds = Math.floor(pendingTimeLeft.value / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
});

let pendingInterval;

const updatePendingCountdown = () => {
    pendingTimeLeft.value = getOrderData.value.pending_until - Date.now();
};

/////////////////////////////////////////////////


const showSuccess = (content, time) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: time });
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