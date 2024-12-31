<template>
    <Dialog v-model:visible="destinationsVisibleTemp" modal header="Configuration"
        :style="{ width: '50rem', height: '55rem' }" :draggable="false">
        <template #header>

        </template>
        <div class="destination">
            <div class="title">
                How do you prefer destinations to be treated?
            </div>
            <div class="header">
                <Message severity="secondary" icon="pi pi-question-circle">
                    Read about our upcoming implementation of midnight technology with digital identity.
                    <a href="https://cardano-ecommerce.gitbook.io/marketplace" target="_blank"
                        rel="noopener noreferrer"> Read
                        Documentation</a>
                </Message>
            </div>

            <div class="grid">
                <div class="grid-item" :class="{ selected: currentSelection === 'manually' }" @click="setManually">
                    <div class="subtitle">
                        Manually
                    </div>

                    <div class="switch">
                        <ToggleSwitch v-model="switch1" />
                    </div>

                    <div class="text">
                        The destination where the product must be delivered is provided by the buyer at the time of
                        purchase.
                    </div>

                    <div class="content">
                        <Message severity="secondary" icon="pi pi-lock">
                            End-to-end stored encrypted then  decrypted for shipping using AES256
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

                    <div class="switch">
                        <ToggleSwitch v-model="switch2" />
                    </div>

                    <div class="text">
                        The physical destination where the product must be delivered is tokenized only once.
                    </div>

                    <div class="content">
                        <Message severity="secondary" icon="pi pi-lock">
                            Stored in the metadata of a burnable Cardano native asset then end-to-end decrypted for
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
        <template #footer>
            <Button label="Burn" text severity="contrast" :disabled="true" />

            <Button label="Done" style="color: var(--text-w);" @click="applyChanges" />
        </template>
    </Dialog>
</template>

<script setup>
import headerAPI from "@/components/header/api/index";
import { ref, watch, onBeforeUnmount, onMounted } from 'vue';

const { destinationsVisible, toggleDestinations } = headerAPI();

const destinationsVisibleTemp = ref(false);

const watchDialogA = watch(destinationsVisible, (e) => destinationsVisibleTemp.value = e);

const watchDialogB = watch(destinationsVisibleTemp, (e) => toggleDestinations(e));

const switch1 = ref(false);

const switch2 = ref(false);

const currentSelection = ref(null);

const resetManually = () => {
    localStorage.removeItem('destinationType');
    currentSelection.value = null;
    switch1.value = false;
}

const setManually = () => {
    const value = localStorage.getItem('destinationType');

    if (value === 'manually') {
        resetManually()
    } else {
        localStorage.setItem('destinationType', 'manually');
        currentSelection.value = 'manually';
        switch1.value = true;
        switch2.value = false;
    }

}

const setupDestination = () => {
    const value = localStorage.getItem('destinationType');

    if (value === 'manually') {
        switch1.value = true
        currentSelection.value = value;
    }

    if (value === 'minted') {
        switch2.value = true
        currentSelection.value = value;
    }
}

const applyChanges = () => {
    toggleDestinations(false)
}

let watchInterval;

onMounted(() => {
    setupDestination()
    watchInterval = setInterval(() => setupDestination(), 100)
})

onBeforeUnmount(() => {
    watchDialogA()
    watchDialogB()
    clearInterval(watchInterval)
});

</script>

<style lang="css" scoped>
a {
    text-decoration: initial !important;
    font-weight: bold;
}

button {
    margin-left: 1rem;
}

.destination {
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
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
    margin: 2rem 0;
}

.grid-item {
    padding: 1.5rem;
    text-align: center;
    height: inherit;
    border: 1px solid var(--border-a);
    border-radius: 12px;
    transition: 0.2s;
    box-shadow: var(--shadow-a);
    display: flex;
    flex-direction: column;
    text-align: start;
    cursor: pointer;
}

.grid-item:hover {
    border: 1px solid var(--primary-b);
}

.grid-item.selected {
    border: 1px solid var(--primary-b);
}


.text {
    margin-top: 1rem;
}

.subtitle {
    font-size: var(--text-size-4);
    font-weight: 600;
    color: var(--primary-b);
}

.content {
    margin-top: 1rem;
}

.header {
    margin-top: 2rem;
}

.switch {
    margin-top: 1rem;
}
</style>