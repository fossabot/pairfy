<template>
    <Drawer v-model:visible="drawerVisibleTemp" header="Connect" position="right" :blockScroll="false"
        :showCloseIcon="true" :dismissable="true" @hide="drawerVisibleTemp = false" style="width: 22rem">
        <section v-if="!getCurrentUser">
            <Message severity="warn" icon="pi pi-info-circle">
                Select the wallet to make payments and log in as a user.
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

            <Button label="Sign In" fluid @click="signIn" style="margin-top: 1rem;" :disabled="!enabledWallet" />
        </section>
        <section v-if="getCurrentUser">
            <Message severity="secondary" icon="pi pi-info-circle">
                Make sure you trade with the correct wallet account.
            </Message>

            <div class="user">
                <div class="user-info">
                    <img src="@/assets/user.png" alt="">
                    <span>{{ getCurrentUser.username }}</span>
                </div>


                <div class="user-row address">
                    <Message severity="info">
                        {{ formatWithDots(getCurrentUser.address, 80) }}
                    </Message>
                </div>


                <div class="user-row pkh">
                    <Message severity="info">
                        {{ getCurrentUser.pubkeyhash }}
                    </Message>
                </div>
            </div>

            <Button label="Mint ID" fluid @click="logoutUser" style="margin-top: 1rem;" :disabled="!enabledWallet"
                variant="outlined" />

            <Button label="Sign Out" fluid @click="logoutUser" style="margin-top: 1rem;" :disabled="!enabledWallet"
                variant="outlined" />

            <div @click="createTransaction">txxx</div>
        </section>

    </Drawer>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import { signMessage, balanceTx, walletClient, getBalance } from "@/api/wallet";
import { ref, watch, onBeforeUnmount, inject } from 'vue';
import { useToast } from "primevue/usetoast";

const { formatWithDots } = inject('utils');

const toast = useToast();

const { drawerVisible, showPanel, loginUser, getCurrentUser, logoutUser } = headerAPI();

const drawerVisibleTemp = ref(false);

const watchDrawerA = watch(drawerVisible, (e) => drawerVisibleTemp.value = e);

const watchDrawerB = watch(drawerVisibleTemp, (e) => showPanel(e));

//////////////////////////////////////////////

const enabledWallet = ref(null);

const updateEnabledWallet = () =>
    enabledWallet.value = localStorage.getItem("enabled-wallet");

updateEnabledWallet();

window.addEventListener("walletEnabledEvent", () => updateEnabledWallet());

window.addEventListener('storage', (event) => updateEnabledWallet());

const watchEnabledWallet = setInterval(() => updateEnabledWallet(), 1000);

//////////////////////////////////////////////

const walletBalance = ref(0);

const watchBalance = setInterval(async () => walletBalance.value = await getBalance(), 1000);

const selectWallet = async (e) => {
    await walletClient().connect(e);
};

const signIn = async () => {
    await signMessage().then(([signature, address]) =>
        loginUser({
            signature,
            address,
            terms_accepted: true,
        })
    ).catch((err) => console.error(err));
};


const createTransaction = async () => {
    try {
        const cbor = "84a900d90102828258201e0ac72a8a47d6638c563ae2d52cf35e0b0d7709f825278496290afbdef2854c00825820ae012af6fe63356b90898d07d429edfe44b821d418442dbc44fb4f234ac65166010183a300581d7051900867b3bab6ca83efa661045f0e324ea1c5600825874224c24f4001821a0010d600a1581c736c50c15fe708374b1728f5b317004a7d9315df8175935528b3faf3a14b746872656164746f6b656e01028201d81845d8799f20ff82583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51a01c9c38082583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51a0a23efc9021a00037dda081a04acef9a0b58208808c3b7a575323facb56de4dbee59add1ca3f29ab10e8396392043406cd80dd0dd90102818258201e0ac72a8a47d6638c563ae2d52cf35e0b0d7709f825278496290afbdef2854c010ed9010281581ca239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1411082583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51b0000000240f0511d111a004c4b40a20581840000d87980821a00016a9c1a01e8854d07d901028159035159034e010100333333323232323232322322322322322322322533300e32323232325332330143001301537540042646644646464a66603460060022a66603a60386ea80240085854ccc068c01c00454ccc074c070dd50048010b0b180d1baa008153330183001301937540042646464a666036600860386ea8c080c08400c4c8c8c8c8c8c94ccc084c028c088dd50008991919192999812980718131baa0011323232533302800d1533302800b1533302800a15333028002100114a029405280a503375e66e9520043302b4c105d8799f20ff004bd70180218149baa0023300c32330010013756600a60526ea8008894ccc0ac00452f5c02660586052605a00266004004605c0020486054604e6ea800458cc014dd6180098131baa01423375e6012604e6ea8004c024c09cdd5180198139baa00423029302a302a0012302830290013026302337540022c660026eb0c010c088dd5008119baf30053023375400201844646600200200644a66604c0022980103d87a8000133225333025300500213374a90001981480125eb804cc010010004c0a0004c0a4004cc010dd6180298101baa00e01832533301e300b301f3754002266e20048dd6981198101baa00114a06002603e6ea8c004c07cdd518111811981198119811981198119811980f9baa00d230220013004375a6040603a6ea8c08000c4c8c94ccc074cc00cdd61802180f9baa00d0191533301d002100114a02940cdc380900a18021bad3020301d3754604000644646600200200644a66604200229404cc894ccc080cdc78010028a51133004004001375c604600260480024603e6040604060406040604060406040604000266038603a60346ea8008cc07001d2f5c02c6e1d2000301a001301a301b001301637540046e1d200216301730180033016002301500230150013010375400229309b2b1bad001375a0026eb4004dd70009bae001375c002ae6955ceaab9e5573eae815d0aba24c11e581c736c50c15fe708374b1728f5b317004a7d9315df8175935528b3faf3004c011e581c659fa0cf862b8460989af5f1200118a910ca04ae31b65aaa767d2b65004c011e581ca239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc141004c01051a01c9c380004c01051a00989680004c01091b00000193c1e9dc8d0001f5f6"
       
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
    clearInterval(watchBalance)
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
    border: 1px solid var(--primary-c);
}

.block-item img {
    width: 35px;
    height: 35px;
    border-radius: 8px;
}

.block-item span {
    margin-left: 1rem;
    font-size: var(--text-size-a);
    font-weight: 500;
}

.user {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    border-radius: 8px;
}

.user-row {
    font-size: var(--text-size-a);
    font-weight: 600;
    word-break: break-all;
    margin: 1.5rem 0;
    position: relative;
}

.user-row::before {
    content: '';
    font-weight: 500;
    color: var(--primary-c);
    position: absolute;
    top: -20px;
    left: 0;
    padding-left: 0.5rem;
    background-color: var(--p-message-info-background);
    width: 120px;
    height: 30px;
    clip-path: polygon(0 0, 80% 0, 100% 100%, 0% 100%);
    border-top-left-radius: 5px;
    z-index: 1;
}

.address::before {
    content: 'Address';
}

.pkh::before {
    content: 'PubKeyHash';
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
}

.user-info img {
    border-radius: 50%;
    width: 2rem;
}

.user-info span {
    margin-left: 1rem;
    font-weight: 500;
    font-size: var(--text-size-a);
}
</style>