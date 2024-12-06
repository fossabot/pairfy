<template>
    <header>
        <div class="header">
            <div class="header-col left">
                <img class="logo" src="@/assets/logo-blue.png" alt="">
            </div>
            <div class="header-col center">
                <SearchComp />
            </div>
            <div class="header-col right">
                <OverlayBadge class="header-button" value="1" severity="danger" @click="toggle">
                    <i class="pi pi-bell" style="font-size: var(--text-size-c)" />
                </OverlayBadge>

                <Popover ref="op">
                    <div class="notifications">
                        notification list
                    </div>
                </Popover>

                <div v-if="!getCurrentUser" class="connect-wallet" @click="showPanel(true)">
                    Connect Wallet
                </div>

                <div v-if="getCurrentUser" class="connect-wallet" @click="showPanel(true)">
                    {{ getCurrentUser.address.slice(0, 15) }}
                </div>
            </div>
        </div>
        <DrawerComp />
    </header>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import DrawerComp from "@/components/header/DrawerComp.vue";
import SearchComp from "@/components/header/SearchComp.vue";
import { ref } from "vue";

const { showPanel, getCurrentUser } = headerAPI();

const op = ref();
const members = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
]);

const toggle = (event) => {
    op.value.toggle(event);
}




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
    min-width: 120px;
    font-weight: 500;
    color: var(--text-w);
    font-size: var(--text-size-a);
    cursor: pointer;
}

.header-button {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.notifications {
    width: 300px;
}
</style>
