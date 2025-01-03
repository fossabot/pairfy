<template>
    <div class="location flex">
        <Dialog v-model:visible="visible" modal :style="{ width: '25rem' }" :draggable="false">
            <template #header>
                <span class="dialog-header">
                    <i class="pi pi-map-marker" />
                    Deliver to
                </span>
            </template>
            <div class="body">
                <Message severity="secondary">
                    Cardano community currently there is only logistics for the USA and CO.
                    The other countries will be added progressively.
                </Message>

                <div class="dialog-row">
                    <IftaLabel>
                        <Select v-model="selectedCountry" :options="countriesOptions" filter optionLabel="name" fluid
                            id="dd-city" scrollHeight="30rem">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="item flex">
                                    <img :alt="slotProps.value.label" src="@/assets/flag_placeholder.png"
                                        :class="`flag flag-${slotProps.value.code.toLowerCase()}`" />
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex">
                                    <img :alt="slotProps.option.label" src="@/assets/flag_placeholder.png"
                                        :class="`flag flag-${slotProps.option.code.toLowerCase()}`" />
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Select>
                        <label for="dd-city">Country</label>
                    </IftaLabel>
                </div>

                <div class="dialog-row">
                    <IftaLabel>
                        <InputText id="city" v-model="selectedCity" fluid v-keyfilter="/^[a-zA-Z0-9 ]*$/" />
                        <label for="city">City</label>
                    </IftaLabel>
                </div>

                <div class="dialog-row">
                    <IftaLabel>
                        <InputNumber v-model="selectedPostal" inputId="price_input" mode="decimal" locale="en-US"
                            :useGrouping="false" fluid />
                        <label for="price_input">ZIP/Postal</label>
                    </IftaLabel>
                </div>


            </div>
            <div class="dialog-footer flex">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false" />
                <Button type="button" label="Save" @click="visible = false" style="color: var(--text-w)" />
            </div>
        </Dialog>


        <div class="icon flex">
            <i class="pi pi-map-marker" />
        </div>
        <div class="box">
            <span>Deliver to</span>
            <span>Bogota 530001</span>
        </div>
    </div>
</template>

<script setup>
import headerAPI from '@/components/header/api/index';
import countries from '@/assets/country.json';
import { onBeforeUnmount, ref, watch, } from 'vue';

const { getLocationData } = headerAPI();

const countryData = ref(countries)

const visible = ref(true);

const defaultCountry = { name: 'United States', code: 'US' }

const selectedCountry = ref(defaultCountry);

const selectedCity = ref(null);

const selectedPostal = ref(null);

const watchLocation = watch(getLocationData, (data) => {
    if (data) {
        selectedCountry.value = { name: countryData.value[data.country], code: data.country }

        selectedCity.value = data.city

        selectedPostal.value = data.postal
    }
})

const countriesOptions = ref([
    { name: 'United States', code: 'US' },
    { name: 'Colombia', code: 'CO' },
]);

onBeforeUnmount(() => {
    watchLocation()
})
</script>

<style lang="css" scoped>
.location {
    height: 42px;
    color: var(--text-a);
    white-space: nowrap;
    text-align: start;
    margin: 0 auto;
}

.icon {
    width: 30px;
    height: inherit;
}

.icon i {
    font-size: var(--text-size-3);
}

.box {
    display: flex;
    flex-direction: column;
}

.box span:nth-child(1) {
    font-size: var(--text-size-0);
}

.box span:nth-child(2) {
    font-size: var(--text-size-0);
    font-weight: 500;
}

.body {
    height: 500px;
}

.flag {
    width: 1.5rem;
    margin-right: 1rem;
}

.dialog-row {
    margin-top: 1rem;
}

.dialog-footer {
    justify-content: flex-end;
}

.dialog-footer button {
    margin-left: 1rem;
}

.dialog-header {
    font-weight: 600;
}
</style>