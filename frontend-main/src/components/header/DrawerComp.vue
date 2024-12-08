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
            <Message severity="success" icon="pi pi-info-circle">
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

            <Button label="Sign Out" fluid @click="logoutUser" style="margin-top: 1rem;" :disabled="!enabledWallet"
                variant="outlined" />

            <div @click="createTransaction">TXXX</div>
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
    const resu = await getBalance();

    console.log(resu);

    const tx0 =
        "84aa00d90102818258208bbf7efc6fa6a9044981d25d9ceee323c7144f8c796a5544963a29fdd687d144010182a300581d70819e8a251f623067c0b52d483cb72d609d362eed0039dd78d487d2a301821a01c9c380a1581c72a11726010d076f61740652c420b4001410f9bce51ac8f8f035fc2fa14b746872656164746f6b656e01028201d8184ed8799f001b00000193a754c346ff82583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51a16e610b8021a000327a6031a04a61d6a09a1581c72a11726010d076f61740652c420b4001410f9bce51ac8f8f035fc2fa14b746872656164746f6b656e010b5820dce5e9a2938094dff998eb490805fc170b5154d347b8abc9bfdad045b03b4f720dd90102818258209ccb1f26340c5b4abd84f1a46f1b37d9aa1addf245fb678597c93074ff5235de010ed9010281581ca239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1411082583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51b000000024d64b322111a000f4240a20581840100d879808219a5e41a00d5d0e607d90102815901eb5901e80101003332323232323232232225333005323232323253323300b3001300c3754004264646464a66601e600a0022a66602460226ea801c0085854ccc03cc00c00454ccc048c044dd50038010b0b18079baa006132323232533301430170021323253330133009301437540162a666026601260286ea8c8cc004004018894ccc0600045300103d87a80001332253330173375e603860326ea80080504cdd2a40006603600497ae0133004004001301a001301b00115333013300700113371e00402229405854ccc04ccdc3800a4002266e3c0080445281bad3014002375c60240022c602a00264a666020600860226ea800452f5bded8c026eacc054c048dd500099198008009bab3015301630163016301600322533301400114c103d87a80001323332225333015337220140062a66602a66e3c02800c4cdd2a4000660326e980092f5c02980103d87a8000133006006001375c60260026eacc050004c060008c058004dd6180980098079baa006370e90011bae3010300d37540046e1d200016300e300f003300d002300c002300c0013007375400229309b2b1bae0015734aae7555cf2ab9f5740ae855d12610c4b746872656164746f6b656e004c0127d8799f58208bbf7efc6fa6a9044981d25d9ceee323c7144f8c796a5544963a29fdd687d14401ff0001f5f6";

    try {
        const txHash = await balanceTx(tx0);

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
    border: 1px solid var(--border-a);
    margin-top: 1rem;
    border-radius: 8px;
    padding: 1rem;
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