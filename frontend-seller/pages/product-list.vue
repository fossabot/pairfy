<template>
    <div class="card">
        <FolderComp :tabs="['Products', 'Statistics']" v-model="tabIndex">

            <template #icon-0>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-package-search-icon lucide-package-search">
                    <path
                        d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                    <path d="m7.5 4.27 9 5.15" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" x2="12" y1="22" y2="12" />
                    <circle cx="18.5" cy="15.5" r="2.5" />
                    <path d="M20.27 17.27 22 19" />
                </svg>
            </template>

            <template #icon-1>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-chart-pie-icon lucide-chart-pie">
                    <path
                        d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                </svg>
            </template>

            <template #content="{ index }">
                <!----------------CONTENT---------------->
                <TableComp v-if="products.length" :columns="columns" :items="products" :limit="limit"
                    :hasNextPage="hasNextPage" :hasPrevPage="hasPrevPage" :range="range" :page="page"
                    :count="productCount" :images="true" @onPrev="handleOnPrev" @onNext="handleOnNext"
                    :columnWidths="{ id: '8rem', category: '8rem', price: '6rem', created_at: '4rem', moderated: '4rem' }">

                    <template #image="{ item }">
                        <ImageComp :src="getImageSrc(item)" :image-style="{ width: '5rem' }" />
                    </template>

                    <template #col-id="{ value }">
                        {{ value }}
                    </template>

                    <template #col-sku="{ value }">
                        {{ value }}
                    </template>

                    <template #col-price="{ value }">
                        <span>{{ value }}</span>
                    </template>

                    <template #col-category="{ value }">
                        <span style="text-transform: lowercase;">{{ value }}</span> 
                    </template>

                    <template #col-discount="{ value, item }">
                        <span class="discount">
                            {{ `-${item.discount_value}%` }}
                        </span>
                    </template>

                    <template #col-created_at="{ value }">
                        {{ formatDate(value) }}
                    </template>

                    <template #action="{ item }">

                        <div class="flex center">
                            <DottedMenu :options="dottedMenuOptions" :value="item" @onSelected="handleDottedMenu" />
                        </div>

                    </template>

                </TableComp>




                <!----------------CONTENT---------------->
            </template>

        </FolderComp>
    </div>
</template>

<script setup>
import placeholderImage from '@/assets/placeholder/image.svg'

const router = useRouter()

const tabIndex = ref(0)

definePageMeta({
    key: () => `products-tab-${tabIndex.value}`
})

const products = ref([])
const nextCursor = ref(null)
const loading = ref(false)
const page = ref(1)
const limit = ref(16)
const productCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const dottedMenuOptions = ref([
    { label: "Edit this product", value: "edit" },
    { label: "Open product page", value: "open" },
    { label: "Delete this product", value: "delete" }
])

const columns = ref([
    { label: "ID", field: "id" },
    { label: "Sku", field: "sku" },
    { label: "Name", field: "name" },
    { label: "Price", field: "price" },
    { label: "Model", field: "model" },
    { label: "Discount", field: "discount" },
    { label: "Category", field: "category" },
    { label: "Moderated", field: "moderated" },
    { label: "Date", field: "created_at" }
])

const range = computed(() => {
    const start = (page.value - 1) * limit.value + 1
    const end = start + products.value.length - 1
    return `${start} - ${end} of ${productCount.value}`
})

const { data: initialData, error: getProductsError } = await useAsyncData('products', () =>
    $fetch('/api/product/getProducts', {
        method: 'POST',
        credentials: 'include',
        body: {},
        headers: useRequestHeaders(['cookie']),
        async onResponseError({ response }) {
            throw new Error(JSON.stringify(response._data.data));
        },
    })
)

onMounted(() => {
    if (getProductsError.value) {
        console.error('Error fetching the products:', getProductsError.value)
        displayMessage('The products could not be loaded. Please try again later.' + getProductsError.value, 'error', 10_000)
    }
})

if (initialData.value) {
    products.value = initialData.value.products
    nextCursor.value = initialData.value.nextCursor
    productCount.value = initialData.value.totalCount
    hasPrevPage.value = initialData.value.hasPrevMore
    hasNextPage.value = initialData.value.hasNextMore
}

const loadProducts = async ({ cursor = null, reverseCursor = null } = {}) => {
    loading.value = true
    try {
        const data = await $fetch('/api/product/getProducts', {
            method: 'POST',
            credentials: 'include',
            body: {
                cursor: cursor || undefined,
                reverseCursor: reverseCursor || undefined
            }
        })

        products.value = data.products
        nextCursor.value = data.nextCursor
        productCount.value = data.totalCount
        hasPrevPage.value = data.hasPrevMore
        hasNextPage.value = data.hasNextMore
    } catch (err) {
        console.error('Load error:', err)
    } finally {
        loading.value = false
    }
}

const handleOnNext = async (item) => {
    if (!hasNextPage.value) return
    const cursor = `${item.created_at}_${item.id}`
    await loadProducts({ cursor })
    page.value += 1
}

const handleOnPrev = async (item) => {
    if (!hasPrevPage.value) return
    const reverseCursor = `${item.created_at}_${item.id}`
    await loadProducts({ reverseCursor })
    if (page.value > 1) page.value -= 1
}

const handleDottedMenu = (event, value) => {
    if (event === 'delete') return beforeDeleteProduct(value)

    if (event === 'edit') {
        router.push({ name: 'edit-product', query: { id: value.id } })
    }
}

function getImageSrc(item) {
    return item.thumbnail_url ? useMediaUrl(item.thumbnail_url) : placeholderImage
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

</script>



<style lang="css" scoped>
.card {
    padding: 0.5rem;
}
</style>