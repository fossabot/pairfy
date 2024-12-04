<template>
    <Drawer v-model:visible="drawerVisibleTemp" header="Wallet Setup" position="right" :blockScroll="false"
        :showCloseIcon="true" :dismissable="true" @hide="drawerVisibleTemp = false">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.</p>

        {{ drawerVisible }}
    </Drawer>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import { signMessage, getAddress, balanceTx, lucidClient, walletClient } from "@/api/wallet";
import { ref, watch } from 'vue';

const { drawerVisible, showPanel } = headerAPI();

const drawerVisibleTemp = ref(false);

watch(drawerVisible, (e) => drawerVisibleTemp.value = e);

watch(drawerVisibleTemp, (e) => showPanel(e));

const handleSign = async () => {
    await signMessage()
        .then(async (signature) => [signature, await getAddress()])
        .then(([signature, address]) =>
            loginUser({
                signature,
                address,
                terms_accepted: true,
            })
        )
        .catch((err) => console.error(err));
};


const createTransaction = async () => {
    const tx0 =
        "84a800d90102818258208d261cbdd94fa7a809ae5ed58b4a08ff524fbcd96bac4cf6a4861ffb4cce4b99000182a300581d701a040dd960a7edccbde208cc02a3714d0fc065950b5ecf8d88e5cdc501821a02faf080a1581c470de6447822eb696d1bb38bda3f3b3996aecb483aa30b040d31f7aaa14b746872656164746f6b656e01028201d8185854d8799f00581ca239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc141581c402873136060f656b8082c797aa805ec870a78b59d5202a35d2024bd1a02faf0801a017d78401b000001937ff93564ff82583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51b00000002510dc602021a00032d7e09a1581c470de6447822eb696d1bb38bda3f3b3996aecb483aa30b040d31f7aaa14b746872656164746f6b656e010b5820dce5e9a2938094dff998eb490805fc170b5154d347b8abc9bfdad045b03b4f720dd90102818258208d261cbdd94fa7a809ae5ed58b4a08ff524fbcd96bac4cf6a4861ffb4cce4b99001082583900a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc1415502e5c34c37200c2ae9757cf8d9ee36370f7b778ad835377a0c47a51b0000000253bf98c0111a004c4b40a20581840100d879808219a5e41a00d5d0e607d90102815901eb5901e80101003332323232323232232225333005323232323253323300b3001300c3754004264646464a66601e600a0022a66602460226ea801c0085854ccc03cc00c00454ccc048c044dd50038010b0b18079baa006132323232533301430170021323253330133009301437540162a666026601260286ea8c8cc004004018894ccc0600045300103d87a80001332253330173375e603860326ea80080504cdd2a40006603600497ae0133004004001301a001301b00115333013300700113371e00402229405854ccc04ccdc3800a4002266e3c0080445281bad3014002375c60240022c602a00264a666020600860226ea800452f5bded8c026eacc054c048dd500099198008009bab3015301630163016301600322533301400114c103d87a80001323332225333015337220140062a66602a66e3c02800c4cdd2a4000660326e980092f5c02980103d87a8000133006006001375c60260026eacc050004c060008c058004dd6180980098079baa006370e90011bae3010300d37540046e1d200016300e300f003300d002300c002300c0013007375400229309b2b1bae0015734aae7555cf2ab9f5740ae855d12610c4b746872656164746f6b656e004c0127d8799f58208d261cbdd94fa7a809ae5ed58b4a08ff524fbcd96bac4cf6a4861ffb4cce4b9900ff0001f5f6";

    const { getWallet } = walletClient();

    lucidClient.selectWallet(getWallet());

    try {
        const txHash = await balanceTx(tx0);

        console.log(`Transaction submitted with hash: ${txHash}`);
    } catch (err) {
        console.error(err);
        JSON.stringify(err);
    }
};
</script>

<style lang="css" scoped></style>