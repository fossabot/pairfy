<template>
    <Dialog v-model:visible="showSellerLogin" modal header="Sign In" :style="{ width: '50rem', height: '70vh' }"
        :draggable="false">
        <template #header>

        </template>

        <div class="sign">

        </div>


        <div class="dialog-msg">
            <Message size="small" severity="info">
                The transaction is valid for 5 minutes. Funds will be released in 60 minutes if the seller delays.
            </Message>
        </div>

    </Dialog>

</template>

<script setup>
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';

const route = useRoute();

const showSellerLogin = ref(false);

const openSellerDialog = () => {
    showSellerLogin.value = true;
}

watch(
    () => route,
    ({ params, query }) => {
        if (query.mode === 'seller') {
            openSellerDialog()
        }
    },
    { immediate: true }
);




</script>

<style lang="css" scoped></style>