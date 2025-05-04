<template>
    <div class="card">
        <ToastComp ref="toastRef" />

        <div class="grid">
            <!--LEFT-->
            <div class="grid-left">
                <div class="grid-row">
                    <div class="grid-title">
                        <span>New Product</span>
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
                        <InputProductName id="create-product-name" placeholder="e.g. Wireless Headphones"
                            @valid="productName = $event.value" />
                    </div>
                    <div class="grid-item">
                        <InputProductPrice id="create-product-price" @valid="productPrice = $event.value" />
                        <InputProductSku id="create-product-sku" @valid="productSku = $event.value" />
                    </div>
                    <div class="grid-item">
                        <InputProductModel id="create-product-model" @valid="productModel = $event.value" />
                        <InputProductBrand id="create-product-brand" @valid="productBrand = $event.value" />
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Product Origin</span>

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
                            @valid="productOrigin = $event.value">
                            <template #option="{ option }">
                                <span class="flex">
                                    <img :src="`/flags/${option.code?.toLowerCase()}.svg`" alt="" class="flag" />
                                    <span style="margin-left: 0.5rem; "> {{ option.label }}</span>
                                </span>
                            </template>
                        </InputSelect>

                        <InputProductCity id="create-product-city" @valid="productCity = $event.value" />
                    </div>
                    <div class="grid-item">
                        <InputProductPostal id="create-product-postal" @valid="productPostal = $event.value" />

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
                        <EditorComp @valid="productDescription = $event.value" />
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
                        Add product images with a maximum size of (5mb) (500x500).
                    </div>

                    <UploadImagesLocal @valid="productImages = $event.value" />
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
                        <span>Bullet List</span>

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
                        <InputProductBullet @valid="productBulletlist = $event.value" />
                    </div>
                </div>


                <div class="grid-row">
                    <div class="grid-title">
                        <span>Product Details</span>

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
                            @valid="productCategory = $event.value">
                            <template #option="{ option }">
                                <span class="flex">
                                    <span>{{ option.label }}</span>
                                </span>
                            </template>
                        </InputSelect>
                    </div>

                    <div class="grid-item">
                        <InputProductCondition @valid="productCondition = $event.value" />
                    </div>
                    <div class="grid-item">
                        <InputProductColor @valid="productColor = $event.value" />
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        <span>Product Discount</span>

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
                        Publish
                    </div>
                    <div class="grid-subtitle">
                        Publish your product.
                    </div>

                    <div class="grid-item">
                        <ButtonSolid label="Publish" @click="onCreateProduct" :loading="loading" />
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

const country = ref('')
const countryValid = ref(false)

const onValidCountry = (event) => {
    console.log("countryHandler", event)
    countryValid.value = event
}

const productName = ref(null)
const productPrice = ref(null)
const productSku = ref(null)
const productModel = ref(null)
const productBrand = ref(null)
const productOrigin = ref(null)
const productCity = ref(null)
const productPostal = ref(null)
const productDescription = ref(null)
const productImages = ref(null)
const productBulletlist = ref(null)
const productCategory = ref(null)
const productCondition = ref(null)
const productColor = ref(null)
const productDiscount = ref({
    enabled: false,
    price: productPrice.value,
    discount: 0,
})

watch(productPrice, (newPrice) => {
    productDiscount.value.price = newPrice
})

//test
watch(productImages, (e) => console.log(e?.images))

const validateParams = () => {
    const params = [
        !productName.value,
        !productPrice.value,
        !productSku.value,
        !productModel.value,
        !productBrand.value,
        !productOrigin.value,
        !productCity.value,
        !productPostal.value,
        !productDescription.value,
        !productImages.value,
        !productBulletlist.value,
        !productCategory.value,
        !productCondition.value,
        !productColor.value
    ]

    console.log(params)

    return params.includes(true)
}




const onCreateProduct = async () => {
    loading.value = true

    if (validateParams()) {
        displayMessage("Please verify that all fields are filled out.", 'error', 30_000)
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

    const { data, error } = await useFetch('/api/product/createProduct', {
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
        console.error('Error al crear producto:', error)
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
    border-radius: var(--radius-b);
    padding: 1.5rem;
}

.grid-left,
.grid-right {
    border: 1px solid var(--border-a);
    background: var(--background-a);
    border-radius: var(--radius-b);
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>