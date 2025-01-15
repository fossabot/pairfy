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
        <div class="connect-wallet flex" @click="togglePanel(true)">
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
    border: 1px solid var(--border-a);
    color: inherit;
    justify-content: space-between;
    padding: 0.75rem 1rem; 
    border-radius: 999px;
    display: flex;
    align-items: center;
    color: inherit;
}

.card-address {
    font-size: var(--text-size-1);
    padding: 0 1rem;
}

.card-button {
    cursor: pointer;
}

.card-button i {
    font-size: var(--text-size-3);
}

.connect-wallet {
    border-radius: 999px;
    height: 45px;
    font-weight: 500;
    font-size: var(--text-size-1);
    cursor: pointer;
    justify-content: center;
    padding: 0 1.5rem;
    border: 1px solid var(--border-a);
}
</style>