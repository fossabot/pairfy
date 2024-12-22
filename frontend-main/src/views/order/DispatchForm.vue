<template>
    <Dialog v-model:visible="dispatchDialog" modal header="Dispatched Form" :style="{ width: '60vw', height: '90vh' }"
        :draggable="false" :blockScroll="true">
        <template #header>

        </template>
        <div class="card">
            <div class="form">
                <div class="title">
                    <span>Shipping Data</span>
                    <span>Fill out the form with the verified information.</span>
                </div>

                <div class="row">
                    <IftaLabel>
                        <InputText id="guide" v-model="dispatchForm.guide" type="text" autofocus fluid
                            :invalid="dispatchFormErrors.guide" variant="filled" />
                        <label for="guide">Tracking Number or ID</label>
                    </IftaLabel>
                </div>

                <div class="row">
                    <IftaLabel>
                        <DatePicker v-model="dispatchForm.date" inputId="date" showIcon iconDisplay="input"
                            variant="filled" fluid />
                        <label for="date">Delivery Date</label>
                    </IftaLabel>
                </div>

                <div class="row">
                    <IftaLabel>
                        <InputText id="website" v-model="dispatchForm.website" type="text" autofocus fluid
                            :invalid="dispatchFormErrors.website" variant="filled" />
                        <label for="website">Website</label>
                    </IftaLabel>
                </div>
                <div class="row">
                    <IftaLabel>
                        <Textarea id="notes" v-model="dispatchForm.notes" rows="5" cols="30" style="resize: none"
                            fluid />
                        <label for="notes">Notes</label>
                    </IftaLabel>
                </div>

                <div class="message">
                    <Message size="small" severity="warn">
                        This information is immutable please check before sending. If there is any subsequent change
                        write it in
                        a timely manner in the chat.
                    </Message>
                </div>

                <div class="control">
                    <Button label="Submit" fluid @click="onDispatchProduct" />
                </div>
            </div>
        </div>
    </Dialog>

    <Button type="button" label="Dispatched" size="small" :disabled="disableDispatched" @click="dispatchDialog = true"
        variant="text" :loading="dispatchProductLoading">

    </Button>
</template>

<script setup>
import gql from 'graphql-tag'
import orderAPI from "@/views/order/api/index";
import DispatchForm from '@/views/order/DispatchForm.vue';
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useMutation } from '@vue/apollo-composable'
import { useToast } from "primevue/usetoast";
import { balanceTx } from "@/api/wallet";
import { reactive } from "vue";

const { getOrderData } = orderAPI();

const dispatchForm = reactive({
    guide: null,
    date: null,
    website: null,
    notes: null,
});

const dispatchFormErrors = reactive({
    guide: false,
    date: false,
    website: false,
    notes: false,
});

const dispatchDialog = ref(true);

const disableDispatched = computed(() => getOrderData.value.contract_state !== 1);

const { mutate: dispatchProduct, loading: dispatchProductLoading, onDone: onDispatchProductDone, onError: onDispatchProductError } = useMutation(gql`
      mutation($dispatchProductVariable: DispatchProductInput!) {
        dispatchProduct(dispatchProductInput: $dispatchProductVariable) {
          success
          payload {
            cbor
          }
        }
      }
`, {
    clientId: 'gateway'
})


onDispatchProductDone(async result => {
    console.log(result.data);

    const response = result.data;

    if (response.dispatchProduct.success === true) {
        try {
            const { cbor } = response.dispatchProduct.payload;

            showSuccess(`Preparing Transaction`, 100000);

            const txHash = await balanceTx(cbor);

            showSuccess(`Transaction submitted with hash: ${txHash} The transaction takes approximately 5 minutes to appear on the blockchain.`, 200000);

            console.log(`Transaction submitted with hash: ${txHash}`);

        } catch (err) {
            console.error(err);

            showError(err);
        }
    }

})

onDispatchProductError(error => {
    showError(error)
})

const onDispatchProduct = () => {
    console.log(dispatchForm)

    const deliveryDate = new Date(dispatchForm.date).getTime().toString();

    const scheme = {
        order_id: getOrderData.value.id,
        guide: dispatchForm.guide,
        date: deliveryDate,
        website: dispatchForm.website,
        notes: dispatchForm.notes,
    }

    dispatchProduct({
        "dispatchProductVariable": scheme
    })
}


</script>

<style lang="css" scoped>
.card {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    min-width: 300px;
    max-width: 350px;
    min-height: 600px;
    padding: 1.5rem;
    border: 1px solid var(--border-a);
    border-radius: 20px;
    margin-top: 2rem;
}

.title {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.title span:nth-child(1) {
    font-size: var(--text-size-d);
    font-weight: 600;
}

.title span:nth-child(2) {
    color: var(--text-b);
    line-height: 2rem;
    font-size: var(--text-size-b);
    margin-top: 0.5rem;
}

.row {
    margin-bottom: 1rem;
}

.legend {
    display: flex;
    justify-content: flex-end;
    color: var(--primary-c);
    font-size: var(--text-size-a);
    line-height: 3rem;
}

.legend span {
    font-weight: 600;
    cursor: pointer;
}

.control {
    margin-top: 1rem;
}

.message {
    margin-top: 1rem;
    word-break: break-word;
    text-align: left;
}
</style>