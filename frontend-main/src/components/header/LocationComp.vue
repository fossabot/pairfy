<template>
    <Dialog v-model:visible="dialogVisible" modal :style="{ width: '25rem' }" :draggable="false" :closable="false">
        <template #header>
            <span class="dialog-header flex">
                Deliver to
                <i class="pi pi-map-marker" />
            </span>
        </template>
        <div class="body">
            <Message severity="secondary">
                Hello Cardano Community, currently there is only logistics for the USA.
                The other countries will be added progressively.
            </Message>

            <div class="dialog-row">
                <IftaLabel>
                    <Select v-model="selectedCountry" :options="countriesOptions" filter optionLabel="name" fluid
                        id="country" scrollHeight="30rem" @change="onCountrychange">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="item flex">
                                <img :alt="slotProps.value.code" src="@/assets/flag_placeholder.png"
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
                    <label for="country">Country</label>
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
                    <InputText id="postal" v-model="selectedPostal" fluid v-keyfilter="/^[a-zA-Z0-9- ]*$/" />
                    <label for="postal">ZIP/Postal</label>
                </IftaLabel>
            </div>


        </div>
        <div class="dialog-footer flex">
            <Button type="button" label="Save" :disabled="disableSave" @click="onSaveLocation"
                style="color: var(--text-w)" />
        </div>
    </Dialog>

    <div class="location flex" @click="dialogVisible = true">

        <div class="box flex">
            <span class="flex">
                <img :alt="getLocationData?.country" src="@/assets/flag_placeholder.png"
                    :class="`flag flag-${getLocationData?.country.toLowerCase()} flag-mini`" />
            </span>
            <span class="separator" />
            <div class="icon flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-map-pin">
                    <path
                        d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
                <label for="">
                    {{ getLocationData?.name }}
                </label>
            </div> 

        </div>
    </div>
</template>

<script setup>
import headerAPI from '@/components/header/api/index';
import { onBeforeUnmount, ref, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const { getLocationData } = headerAPI();

const dialogVisible = ref(false);

const defaultCountry = { name: 'United States', code: 'US' }

const selectedCountry = ref(defaultCountry);

const selectedCity = ref(null);

const selectedPostal = ref(null);

const unwatchLocation = watch(getLocationData, (data) => {
    if (data) {
        selectedCountry.value = { name: data.name, code: data.country }

        selectedCity.value = data.city

        selectedPostal.value = data.postal
    }
},
    { immediate: true }
)

const countriesOptions = ref([
    { name: 'United States', code: 'US' }
]);

const disableSave = computed(() => {
    if (selectedCountry.value.code !== 'US' && selectedCountry.value.code !== 'CO') {
        return true
    }

    return false
})

const onCountrychange = () => {
    selectedCity.value = null
    selectedPostal.value = null
}

const onSaveLocation = () => {
    let currentRoute = router.currentRoute.value;

    let scheme = { city: selectedCity.value, region: null, country: selectedCountry.value.code, postal: selectedPostal.value, name: selectedCountry.value.name }

    localStorage.setItem('location', JSON.stringify(scheme))

    dialogVisible.value = false

    if (scheme.country.toLowerCase() === currentRoute.params.country) {
        location.reload()
    } else {
        router.push({
            name: currentRoute.name,
            params: {
                ...currentRoute.params,
                country: selectedCountry.value.code.toLowerCase()
            },
            query: currentRoute.query
        });
    }
}

const setupLocation = () => {
    let result = localStorage.getItem('location');

    if (!result) {
        dialogVisible.value = true
    }
}

onMounted(() => {
    setupLocation()
})

onBeforeUnmount(() => {
    unwatchLocation()
})
</script>

<style lang="css" scoped>
.location {
    color: inherit;
    white-space: nowrap;
    text-align: start;
    cursor: pointer;
    margin-right: auto;
}

.icon {
    height: inherit;
}

.icon label {
    margin-left: 0.5rem;
}

.box {
    display: flex;
}

.box span:nth-child(1) {
    font-size: var(--text-size-0);
}

.box span:nth-child(2) {
    font-size: var(--text-size-0);
}

.body {
    height: 500px;
}

.flag {
    width: 1.5rem;
}

.flag-mini {
    width: 1.25rem;
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
    padding: 0.5rem 0;
}

.dialog-header i {
    margin-left: 0.5rem;
}

.separator {
    background: var(--text-b);
    margin: 0 1rem;
    height: 1rem;
    width: 1px;
}

/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {
    .location{
        margin: initial;
        margin-left: auto;
    }
}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
    /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
    /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
    /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
    /* Styles for large screens */
}
</style>