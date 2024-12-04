<template>
    <header>
        <div class="header">
            <div class="header-col left">
                <img class="logo" src="@/assets/logo-blue.png" alt="">
            </div>
            <div class="header-col center"></div>
            <div class="header-col right">
                <OverlayBadge class="header-button" value="1" severity="danger">
                    <i class="pi pi-bell" style="font-size: var(--text-size-c)" />
                </OverlayBadge>
                <div class="connect-wallet" @click="showPanel(true)">
                    Connect Wallet
                </div>
            </div>
        </div>
        <DrawerComp />
    </header>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import DrawerComp from "@/components/header/DrawerComp.vue";

const { showPanel } = headerAPI();



</script>

<style scoped>
header {
    height: 64px;
    background: var(--background-a);
    display: flex;
    justify-content: center;
    border-bottom: 1px solid var(--border-a);
}

.header {
    max-width: 1200px;
    width: 80%;
    height: auto;
    display: grid;
    grid-template-columns: 25% 50% 25%;
    width: 100%;
}

.header-col {
    text-align: center;
    display: flex;
    align-items: center;
}

.header-col.right {
    justify-content: flex-end;
}

.header-col.left {
    justify-content: flex-start;
}

.connect-wallet {
    background: var(--primary-c);
    border-radius: 8px;
    padding: 0.5rem;
    width: 120px;
    font-weight: 600;
    color: var(--text-w);
    font-size: var(--text-size-a);
}

.header-button {
    margin: 0 2rem;
    display: flex;
    align-items: center;
}
</style>
