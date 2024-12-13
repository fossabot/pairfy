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
        const cbor = "84aa00d901028182582099639a130329d98340bc4378462e5c16b6e36e5d999231f9c05c6d553db930ff010182a300581d706a01824a361e425f488558cbe3800b83321283767cd85d73df619a0601821a01c9c380a1581c45bfd02834b096c3b94bba60c53269607c7f012b74bade59a8cdf6cca14b746872656164746f6b656e01028201d81845d8799f00ff82583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51a0dd21cf7021a00032a32031a04abedeb09a1581c45bfd02834b096c3b94bba60c53269607c7f012b74bade59a8cdf6cca14b746872656164746f6b656e010b5820dc1b5548c633a0ee88c60295d83c12ae19b771c1d93ddd1a662eeefe743275f20dd90102818258201b117e1ffbe088f198471391585c03f197b7efd3aa28bf3595c70f3a730691d6010ed9010281581ca239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1411082583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51b0000000244db7f81111a000f4240a20581840100d879808219aa501a00d8d16e07d90102815902015901fe01010033332323232323232232223225333007323232323253323300d3001300e3754004264646464a666022600a0022a66602860266ea801c0085854ccc044c00c00454ccc050c04cdd50038010b0b18089baa006132323232533301630190021323253330153009301637540162a66602a6012602c6ea8c8cc004004018894ccc0680045300103d87a80001332253330193375e603c60366ea80080584cdd2a40006603a00497ae0133004004001301c001301d00113253330163008002100114a066e3c00804c5854ccc054cdc3800a4002266e3c00804c5281bad3016002375c60280022c602e00264a666024600860266ea800452f5bded8c026eacc05cc050dd500099198008009bab3017301830183018301800322533301600114c0103d87a80001323332225333017337220140062a66602e66e3c02800c4cdd2a4000660366e980092f5c02980103d87a8000133006006001375c602a0026eacc058004c068008c060004dd6180a80098089baa006370e90011bae3012300f37540046e1d20001630103011003300f002300e002300e0013009375400229309b2b1bad001375c002ae6955ceaab9e5573eae815d0aba24c010c4b746872656164746f6b656e004c0127d8799f582099639a130329d98340bc4378462e5c16b6e36e5d999231f9c05c6d553db930ff01ff004c01091b00000193be0212c00001f5f6"
       
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