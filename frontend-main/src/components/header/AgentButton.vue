<template>

    <template v-if="getCurrentUser">
        <div class="card">

            <NotificationComp />

            <div class="card-button flex" @click="togglePanel(true)">
                <i class="pi pi-bars" />
            </div>
        </div>
    </template>

    <template v-else>
        <div class="wallet flex" @click="togglePanel(true)">
            Connect
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
    justify-content: space-between;
    border: 1px solid var(--border-b);
    padding: 0.75rem 1rem; 
    border-radius: 999px;
    display: flex;
    align-items: center;
}

.card-address {
    font-size: var(--text-size-1);
    padding: 0 1rem;
}

.card-button {
    cursor: pointer;
    margin-left: 3rem;
}

.card-button i {
    font-size: var(--text-size-3);
}

.wallet {
    background: var(--black-a);
    font-size: var(--text-size-1);
    justify-content: center;
    border-radius: 999px;
    color: var(--text-w);
    font-weight: 500;
    cursor: pointer;
    padding: 0 1.5rem;
    height: 44px;

}
</style>