<template>

    <template v-if="getCurrentUser">
        <div class="card">

            <NotificationComp />

            <div class="card-address">
                {{ getCurrentUser.address.slice(0, 15) }}
            </div>
            <div class="card-button flex" @click="togglePanel(true)">
                <i class="pi pi-bars" />
            </div>
        </div>
    </template>

    <template v-else>
        <div class="connect-wallet flex">
            Connect Wallet
        </div>
    </template>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import NotificationComp from "./NotificationComp.vue";

const { togglePanel, getCurrentUser, setADAprice } = headerAPI();

</script>

<style lang="css" scoped>
.card {
    border: 1px solid rgba(255,255,255,0.2);
    color: inherit;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: 999px;
    display: flex;
    align-items: center;
}

.card-address {
    font-size: var(--text-size-1);
    font-weight: 600;
    padding: 0 1rem;
}

.card-button {
    padding-right: 0.5rem;
    cursor: pointer;
}

.card-button i {
    font-size: var(--text-size-3);
}

.connect-wallet {
    border-radius: 999px;
    height: 45px;
    width: 150px;
    font-size: var(--text-size-1);
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.2);
    background: transparent;
    color: inherit;
    justify-content: center;

}
</style>