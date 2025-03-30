<template>
    <template v-if="getCurrentUser">
        <div class="card flex">

            <NotificationComp />

            <CartComp style="margin: 0 2rem" />

            <div class="card-button flex" @click="togglePanel(true)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-menu">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
            </div>
        </div>
    </template>

    <template v-else>
        <ButtonComp data="Connect" @click="togglePanel(true)" />
    </template>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import NotificationComp from "./NotificationComp.vue";
import CartComp from "./CartComp.vue";
import ButtonComp from "../ButtonComp.vue";

const { togglePanel, getCurrentUser, setADAprice } = headerAPI();

</script>

<style lang="css" scoped>
.card {

    justify-content: space-between;
    padding: 0rem 1rem;
    border-radius: 999px;
    height: 3rem;
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
</style>