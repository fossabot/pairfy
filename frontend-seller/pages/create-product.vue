<template>
    <div class="card">
        <div class="grid">
            <!--LEFT-->
            <div class="grid-left">
                <div class="grid-row">
                    <div class="grid-title">
                        <span>Create Product</span>
                        <TipComp text="Fill in the fields with information about your product." position="right">
                            <span class="flex" style="margin-left: 0.5rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </span>
                        </TipComp>
                    </div>
                    <div class="grid-subtitle">
                        Fill in the details to publish a new product.
                    </div>
                    <div class="grid-item">
                        <InputProductName id="create-product-name" focus placeholder="e.g. Wireless Headphones" />
                    </div>
                    <div class="grid-item">
                        <InputProductPrice id="create-product-price" />
                        <InputProductSku id="create-product-sku" />
                    </div>
                    <div class="grid-item">
                        <InputProductModel id="create-product-model" />
                        <InputProductBrand id="create-product-brand" />
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Product Origin</span>

                        <TipComp text="Information on where the product is shipped." position="right">
                            <span class="flex" style="margin-left: 0.5rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </span>
                        </TipComp>
                    </div>
                    <div class="grid-subtitle">
                        Data required for calculating shipping time.
                    </div>
                    <div class="grid-item">

                        <InputSelect v-model="country" label="Country" placeholder="Select Country..."
                            :options="countries" @valid="onValidCountry" :invalid="false">
                            <template #option="{ option }">
                                <span class="flex">
                                    <img :src="`/flags/${option.code?.toLowerCase()}.svg`" alt="" class="flag" />
                                    <span style="margin-left: 0.5rem; "> {{ option.label }}</span>
                                </span>
                            </template>
                        </InputSelect>

                        <InputProductCity id="create-product-city" />
                    </div>
                    <div class="grid-item">
                        <InputProductPostal id="create-product-postal" />

                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Description</span>

                        <TipComp text="Provide as input everything you know about the product." position="right">
                            <span class="flex" style="margin-left: 0.5rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </span>
                        </TipComp>
                    </div>
                    <div class="grid-subtitle">
                        Create a product description using the AI tool.
                    </div>
                    <div class="grid-item">
                        <EditorComp />
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Upload Images</span>

                        <TipComp text="Upload product images and select the main image." position="right">
                            <span class="flex" style="margin-left: 0.5rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </span>
                        </TipComp>
                    </div>
                    <div class="grid-subtitle">
                        Select the main product image and any secondary images.
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Upload Video</span>

                        <TipComp text="Upload a video to showcase your product." position="right">
                            <span class="flex" style="margin-left: 0.5rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </span>
                        </TipComp>

                    </div>
                    <div class="grid-subtitle">
                        Select 1 video showing the product features (optional).
                    </div>
                </div>
            </div>
            <!--RIGHT-->
            <div class="grid-right">
                <div class="grid-row">
                    <div class="grid-title">
                        <span>Details</span>

                        <TipComp text="Make the final settings." position="right">
                            <span class="flex" style="margin-left: 0.5rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </span>
                        </TipComp>
                    </div>
                    <div class="grid-subtitle">
                        Make the final settings.
                    </div>

                    <div class="grid-item">


                        <InputSelect v-model="country" :options="categories" label="Category" required>
                            <template #option="{ option }">
                                <span class="flex">
                                    <span>{{ option.label }}</span>
                                </span>
                            </template>
                        </InputSelect>


                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        Publish
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import categoryList from '@/assets/json/categories.json'
import countryList from '@/assets/json/countries.json'

const categories = computed(() =>
    Object.values(categoryList).map(item => ({
        label: item.name,
        code: item.index
    }))
)


const countries = ref(countryList)

const country = ref('')
const countryValid = ref(false)

const onValidCountry = (event) => {
    console.log("countryHandler", event)
    countryValid.value = event
}

</script>

<style lang="css" scoped>
.card {
    padding: 1rem 2rem;
}

.grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
}

.grid-title {
    font-size: var(--text-size-3);
    align-items: center;
    font-weight: bold;
    display: flex;
}


.grid-subtitle {
    font-size: var(--text-size-1);
    color: var(--text-b);
    margin-bottom: 2rem;
    margin-top: 0.5rem;
}

.grid-item {
    align-items: center;
    display: flex;
    gap: 1rem;
}

.grid-row {
    background: var(--background-a);
    border-radius: var(--radius-b);
    box-shadow: var(--shadow-b);
    margin-bottom: 1.5rem;
    padding: 1.5rem;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>