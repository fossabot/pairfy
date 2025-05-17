<template>
    <Drawer v-model:visible="drawerVisibleTemp" header="Connect" position="right" :blockScroll="false"
        :showCloseIcon="true" :dismissable="true" @hide="drawerVisibleTemp = false" style="width: 22rem">

        <section v-if="!getCurrentUser">
            <Message severity="secondary" icon="pi pi-info-circle">
                Select the Cardano wallet to make payments and login as a user.
            </Message>

            <div class="block">
                <div class="block-item" @click="selectWallet('nami')" :class="{ active: enabledWallet === 'nami' }">
                    <img src="@/assets/nami.svg" alt="nami" />
                    <span>Nami</span>
                </div>
                <div class="block-item" @click="selectWallet('eternl')" :class="{ active: enabledWallet === 'eternl' }">
                    <img src="@/assets/eternl.png" alt="eternl" />
                    <span>Eternl</span>
                </div>
                <div class="block-item" @click="selectWallet('lace')" :class="{ active: enabledWallet === 'lace' }">
                    <img src="@/assets/lace.svg" alt="lace" />
                    <span>Lace</span>
                </div>
            </div>

            <Button label="Sign In" fluid @click="onLogin" style="margin-top: 1rem; color: var(--text-w);"
                :disabled="!enabledWallet" />
        </section>
        <section v-if="getCurrentUser">
            <Message severity="secondary" icon="pi pi-info-circle">
                Make sure you trade with the correct wallet account.
            </Message>

            <div class="user">
                <div class="user-header">
                    <img src="@/assets/user.png" alt="">
                    <span>{{ getCurrentUser.username }}</span>
                </div>


                <div class="user-item">
                    <span class="title">address</span>
                    <span> {{ formatWithDots(getCurrentUser.address, 80) }}</span>
                </div>


                <div class="user-item">
                    <span class="title">PubKeyHash</span>
                    <span>{{ getCurrentUser.pubkeyhash }}</span>
                </div>
            </div>



            <Button label="Sign Out" fluid @click="logoutUser" style="margin-top: 1rem;" :disabled="!enabledWallet"
                variant="outlined" />

        </section>

    </Drawer>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import { signMessage, balanceTx, walletClient, getBalance } from "@/api/wallet";
import { ref, watch, onBeforeUnmount, inject, computed } from 'vue';
import { useToast } from "primevue/usetoast";

const { formatWithDots } = inject('utils');

const toast = useToast();

const { panelVisible, togglePanel, loginUser, getCurrentUser, logoutUser } = headerAPI();

const drawerVisibleTemp = ref(false);

const watchDrawerA = watch(panelVisible, (e) => drawerVisibleTemp.value = e);

const watchDrawerB = watch(drawerVisibleTemp, (e) => togglePanel(e));

//////////////////////////////////////////////

const enabledWallet = ref(null);

const updateEnabledWallet = () =>
    enabledWallet.value = localStorage.getItem("enabled-wallet");

updateEnabledWallet();

window.addEventListener("walletEnabledEvent", () => updateEnabledWallet());

window.addEventListener('storage', (event) => updateEnabledWallet());

const watchEnabledWallet = setInterval(() => updateEnabledWallet(), 1000);

//////////////////////////////////////////////

const selectWallet = async (e) => {
    await walletClient().connect(e);
};

const onLogin = async () => {
    await signMessage().then(([signature, address]) => {

        let locationData = localStorage.getItem('location')

        if (!locationData) {
            throw new Error('noLocationData')
        }

        let parsedData = JSON.parse(locationData)

        return loginUser({
            signature,
            address,
            terms_accepted: true,
            country: parsedData.country
        })


    }
    )
        .then(() => togglePanel(false))
        .then(() => location.reload())
        .catch((err) => console.error(err));
};


const createTransaction = async () => {
    try {
        const cbor = ""

        const txHash = await balanceTx(cbor);

        console.log(`Transaction submitted with hash: ${txHash}`);
    } catch (err) {
        console.error(err);
        JSON.stringify(err);
    }
};

onBeforeUnmount(() => {
    watchDrawerA()
    watchDrawerB()
    clearInterval(watchEnabledWallet)
});

</script>

<style lang="css" scoped>
.block {
    display: flex;
    flex-direction: column;
}

.block-item {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-a);
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
}

.block-item.active {
    border: 1px solid var(--primary-a);
}

.block-item img {
    width: 35px;
    height: 35px;
    border-radius: 8px;
}

.block-item span {
    margin-left: 1rem;
    font-size: var(--text-size-1);
    font-weight: 500;
}

.user {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    border-radius: 12px;
    border: 1px solid var(--border-a);
}

.user-item {
    font-size: var(--text-size-1);

    word-break: break-all;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-top: 1px solid var(--border-a);
}

.user-item .title {
    color: var(--text-a);
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.user-header {
    display: flex;
    align-items: center;
    padding: 1rem;
}

.user-header img {
    border-radius: 50%;
    width: 2.5rem;
}

.user-header span {
    margin-left: 1rem;
    font-weight: 500;
    font-size: var(--text-size-1);
}
</style>