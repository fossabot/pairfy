<template>
    <Dialog v-model:visible="dialog" modal header="Destinations" :style="{ width: '45vw', height: '80vh' }"
        :draggable="false">
        <template #header>

        </template>
        <div class="destination">
            <div class="title">
                How do you prefer destinations to be treated?
            </div>

            <div class="header">
                <Message severity="secondary" icon="pi pi-info-circle" style="margin-top: 1rem;">
                    Read about our upcoming implementation of midnight technology with digital identity.
                    <a href="https://cardano-ecommerce.gitbook.io/marketplace" target="_blank" rel="noopener noreferrer"> Read Documentation</a>
                </Message>
            </div>

            <div class="grid">
                <div class="grid-item">
                    <div class="subtitle">
                        At the time of purchase
                    </div>

                    <div class="text">
                        The destination where the product must be delivered is provided by the buyer at the time of
                        purchase.
                    </div>

                    <div class="content">
                        <Message severity="secondary" icon="pi pi-lock">
                            It is temporarily stored encrypted then decrypted end-to-end for shipping using with AES256
                            4096
                            ARGON2 / RSA / PGP.
                        </Message>

                        <Message severity="secondary" icon="pi pi-info-circle" style="margin-top: 1rem;">
                            This technology is used in email services, banking transactions or file protection.
                        </Message>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="subtitle">
                        Minted once
                    </div>

                    <div class="text">
                        The physical destination where the product must be delivered is tokenized only once.
                    </div>

                    <div class="content">
                        <Message severity="secondary" icon="pi pi-lock">
                            It is stored in the metadata of a burnable Cardano native asset then decrypted end-to-end for
                            shipping using AES256 4096 ARGON2 / RSA / PGP.
                        </Message>

                        <Message severity="secondary" icon="pi pi-info-circle" style="margin-top: 1rem;">
                            This encryptation method was used by IOHK for the
                            <a href="https://www.lace.io/bugbountyprogram" target="_blank" rel="noopener noreferrer">1M
                                USD
                                Lace
                                wallet challenge.</a>
                        </Message>
                    </div>
                </div>
            </div>

        </div>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';

const dialog = ref(true);



</script>

<style lang="css" scoped>
a {
    text-decoration: initial !important;
    font-weight: bold;
}

.destination {
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
}

.title {
    font-size: var(--text-size-4);
    font-weight: 600;
    margin-top: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 4rem;
    margin-top: 2rem;
}

.grid-item {
    padding: 1.5rem;
    text-align: center;
    height: inherit;
    border: 1px solid var(--primary-b);
    border-radius: 12px;
    transition: 0.2s;
    box-shadow: var(--shadow-a);
    display: flex;
    flex-direction: column;
}

.grid-item:hover {
    border: 1px solid var(--primary-b);
}

.text,
.subtitle {
    color: var(--primary-b);
    text-align: start;
    font-weight: 500;
}

.text {
    margin-top: 1rem;
}

.subtitle {
    font-size: var(--text-size-4);
    font-weight: 600;
}

.content {
    margin-top: 1rem;
}

.header {
    margin-top: 1rem;
}
</style>