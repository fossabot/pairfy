<template>
    <div class="card">
        <ToastComp ref="toastRef" />

        <div class="grid">
            <!--LEFT-->
            <div class="grid-left">
                <div class="grid-row">
                    <div class="grid-title">
                        <span>Edit Product</span>
                        <TipComp text="Edit the details of your product below." position="right">
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
                        <InputProductName v-model="productName" id="create-product-name"
                            placeholder="e.g. Wireless Headphones" @valid="productNameValid = $event.valid" />
                    </div>
                    <div class="grid-item">
                        <InputProductPrice v-model="productPrice" id="create-product-price"
                            @valid="productPriceValid = $event.valid" />
                        <InputProductSku v-model="productSku" id="create-product-sku"
                            @valid="productSkuValid = $event.valid" />
                    </div>
                    <div class="grid-item">
                        <InputProductModel v-model="productModel" id="create-product-model"
                            @valid="productModelValid = $event.valid" />
                        <InputProductBrand v-model="productBrand" id="create-product-brand"
                            @valid="productBrandValid = $event.valid" />
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Origin</span>

                        <TipComp
                            text="National or international location from where the supplier or seller ships the product to the buyer."
                            position="right">
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

                        <InputSelect v-model="productOrigin" label="Country" :options="countries"
                            @valid="productOriginValid = $event.valid">
                            <template #option="{ option }">
                                <span class="flex">
                                    <img :src="`/flags/${option.code?.toLowerCase()}.svg`" alt="" class="flag" />
                                    <span style="margin-left: 0.5rem; "> {{ option.label }}</span>
                                </span>
                            </template>
                        </InputSelect>
                        <InputProductCity v-model="productCity" id="create-product-city"
                            @valid="productCityValid = $event.valid" />
                    </div>
                    <div class="grid-item">
                        <InputProductPostal v-model="productPostal" id="create-product-postal"
                            @valid="productPostalValid = $event.valid" />
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
                        <EditorComp v-model="productDescription" @valid="productDescriptionValid = $event.valid" />
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Features</span>

                        <TipComp text="List displayed at the top of the product page." position="right">
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
                        List of characteristics that are displayed with priority.
                    </div>
                    <div class="grid-item">
                        <InputProductBullet v-model="productBulletlist"
                            @valid="productBulletlistValid = $event.valid" />
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
                        Please upload product images — maximum size: 5 MB, recommended dimensions: 500×500 pixels.
                    </div>
                    <UploadImagesLocal @valid="productImagesValid = $event.valid" />
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
                        Optionally, upload a single video highlighting the product’s features.
                    </div>
                </div>
            </div>



            <!--RIGHT-->
            <div class="grid-right">
                <div class="grid-row">
                    <div class="grid-title">
                        <span>Details</span>

                        <TipComp text="Configure product details." position="right">
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
                        Configure product details.
                    </div>

                    <div class="grid-item">
                        <InputSelect v-model="productCategory" :options="categories" label="Category"
                            @valid="productCategoryValid = $event.valid">
                            <template #option="{ option }">
                                <span class="flex">
                                    <span>{{ option.label }}</span>
                                </span>
                            </template>
                        </InputSelect>
                    </div>

                    <div class="grid-item">
                        <InputProductCondition v-model="productCondition"
                            @valid="productConditionValid = $event.valid" />
                    </div>

                    <div class="grid-item">
                        <InputProductColor v-model="productColor" @valid="productColorValid = $event.valid" />
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Discount</span>

                        <TipComp text="Discount" position="right">
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
                        Apply a percentage discount to the price.
                    </div>

                    <div class="grid-item">
                        <InputProductDiscount v-model="productDiscount" />
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        Publication
                    </div>
                    <div class="grid-subtitle">
                        Save product changes.
                    </div>

                    <div class="grid-item">
                        <ButtonSolid label="Save" @click="onCreateProduct" :loading="loading" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import categoryList from '@/assets/json/categories.json'
import countryList from '@/assets/json/countries.json'

const toastRef = ref(null);

const displayMessage = (message, type, duration) => {
    toastRef.value?.showToast(message, type, duration)
}

const loading = ref(false)

const categories = computed(() =>

    Object.values(categoryList).map(category => ({
        label: category.label,
        code: category.code,
    }))

)

const countries = ref(countryList)

const productName = ref(null)
const productNameValid = ref(false)

const productPrice = ref(null)
const productPriceValid = ref(false)

const productSku = ref(null)
const productSkuValid = ref(false)

const productModel = ref(null)
const productModelValid = ref(false)

const productBrand = ref(null)
const productBrandValid = ref(false)

const productOrigin = ref(null)
const productOriginValid = ref(false)

const productCity = ref(null)
const productCityValid = ref(false)

const productPostal = ref(null)
const productPostalValid = ref(false)

const productDescription = ref(null)
const productDescriptionValid = ref(false)

const productImages = ref(null)
const productImagesValid = ref(false)

const productBulletlist = ref(null)
const productBulletlistValid = ref(false)

const productCategory = ref(null)
const productCategoryValid = ref(false)

const productCondition = ref(null)
const productConditionValid = ref(false)

const productColor = ref(null)
const productColorValid = ref(false)


const productDiscount = ref({
    enabled: false,
    price: productPrice.value,
    discount: 0,
})

watch(productPrice, (newPrice) => {
    productDiscount.value.price = newPrice
})

const productData = ref(null)

const { data: initialData } = await useAsyncData('product', () =>
    $fetch('/api/product/getProduct', {
        method: 'POST',
        credentials: 'include',
        body: {
            id: "PRD-250509-5UEPXKQ"
        },
        headers: useRequestHeaders(['cookie'])
    })
)

if (initialData.value) {
    productData.value = initialData.value

    productName.value = initialData.value.name
    productPrice.value = initialData.value.price
    productSku.value = initialData.value.sku
    productModel.value = initialData.value.model
    productBrand.value = initialData.value.brand
    productOrigin.value = initialData.value.origin
    productCity.value = initialData.value.city
    productPostal.value = initialData.value.postal
    productDescription.value = initialData.value.description
    productBulletlist.value = initialData.value.bullet_list
    productCategory.value = initialData.value.category
    productCondition.value = initialData.value.condition_
    productColor.value = initialData.value.color

    productDiscount.value.enabled = initialData.value.discount
    productDiscount.value.discount = initialData.value.discount_percent
}



//test
watch(productImages, (e) => console.log(e?.images))

const validateParams = () => {
    const params = [
        !productNameValid.value,
        !productPriceValid.value,
        !productSkuValid.value,
        !productModelValid.value,
        !productBrandValid.value,
        !productOriginValid.value,
        !productCityValid.value,
        !productPostalValid.value,
        !productDescriptionValid.value,
        !productImagesValid.value,
        !productBulletlistValid.value,
        !productCategoryValid.value,
        !productConditionValid.value,
        !productColorValid.value
    ]

    console.log(params)

    return params.includes(true)
}

const onCreateProduct = async () => {
    loading.value = true

    if (validateParams()) {
        displayMessage(`
            Some required details are missing.
            Please ensure all mandatory fields — such as product images, category, and description —
            are properly filled out before submitting.
        `.trim(), 'error', 30_000)


        loading.value = false
        return;
    }

    const uploadImages = await useUploadImages(productImages.value?.images).catch((err) => {
        displayMessage(err, 'error', 30_000)
        return null
    })

    if (!uploadImages || !uploadImages.success) {
        loading.value = false
        return
    }

    const { data, error } = await useFetch('/api/product/getProduct', {
        method: 'POST',
        credentials: 'include',
        body: {
            "name": productName.value,
            "price": productPrice.value,
            "sku": productSku.value,
            "model": productModel.value,
            "brand": productBrand.value,
            "description": productDescription.value,
            "category": productCategory.value,
            "bullet_list": productBulletlist.value,
            "color": productColor.value,
            "condition_": productCondition.value,
            "origin": productOrigin.value,
            "city": productCity.value,
            "postal": productPostal.value,
            "discount": productDiscount.value.enabled,
            "discount_percent": productDiscount.value.discount,
            "media_group_id": uploadImages.data.media_group_id,
            "file_ids": uploadImages.data.file_ids
        },
        async onResponseError({ response }) {
            throw new Error(JSON.stringify(response._data.data));
        },
    })

    loading.value = false

    console.log(data.value);

    if (error.value) {
        displayMessage(error.value, 'error', 30_000)
        console.error('Error creating the product:', error)
    }

    if (data.value.success) {
        displayMessage(data.value.message, 'success', 30_000)
    }
}
</script>

<style lang="css" scoped>
.card {
    padding: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: 3fr 1fr;
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
    margin-bottom: 1rem;
    padding: 1.5rem;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>