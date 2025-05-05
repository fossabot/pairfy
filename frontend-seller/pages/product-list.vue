<template>
    <div class="card">
        <FolderComp :tabs="['Products', 'Statistics']">

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

                <TableComp v-if="products.length" :columns="columns" :items="products" :limit="limit" :hasMore="hasMore"
                    :page="page" :range="range" :count="productCount" :images="true" @onPrev="handleOnPrev"
                    @onNext="handleOnNext" :columnWidths="{ id: '7rem', category: '8rem', price: '7rem' }">

                    <template #image="{ item }">
                        <ImageComp :src="getImageSrc(item)" :image-style="{ width: '4rem' }" />

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

                    <template #col-discount="{ value, item }">
                        <span class="discount">
                            {{ `-${item.discount_value}%` }}
                        </span>
                    </template>

                    <template #col-created_at="{ value }">
                        {{ value }}
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

function getImageSrc(item) {
    return item.thumbnail_url ? useMediaUrl(item.thumbnail_url) : placeholderImage
}

const dottedMenuOptions = ref([
    { label: "Delete Product", value: "delete" },
    { label: "Edit Product", value: "edit" },
    { label: "Open Page", value: "open" }
])

const productCount = ref(0)
const columns = ref([
    { label: "ID", field: "id" },
    { label: "Sku", field: "sku" },
    { label: "Status", field: "status" },
    { label: "Name", field: "name" },
    { label: "Price", field: "price" },
    { label: "Model", field: "model" },
    { label: "Discount", field: "discount" },
    { label: "Category", field: "category" },
    { label: "Moderated", field: "moderated" },
    { label: "Date", field: "created_at" }
])

const products = ref([])
const nextCursor = ref(null)
const hasMore = ref(false)
const loading = ref(false)
const page = ref(1)
const limit = ref(16)

const range = computed(() => {
  const start = (page.value - 1) * limit.value + 1
  const end = start + products.value.length - 1
  return `${start} - ${end} of ${productCount.value}`
})



const loadProducts = async ({ cursor = null, reverseCursor = null } = {}) => {
    loading.value = true

    const { data, error } = await useFetch('/api/product/getProducts', {
        method: 'POST',
        credentials: 'include',
        body: {
            cursor: cursor || undefined,
            reverseCursor: reverseCursor || undefined
        },
        async onResponseError({ response }) {
            throw new Error(JSON.stringify(response._data.data))
        }
    })

    if (data.value) {
        products.value = data.value.products
        nextCursor.value = data.value.nextCursor
        hasMore.value = data.value.hasMore
        productCount.value = data.value.totalCount
    }

    loading.value = false
}

const handleOnPrev = async (item) => {
    const reverseCursor = `${item.created_at}_${item.id}`
    await loadProducts({ reverseCursor })
    if (page.value > 1) page.value -= 1
}

const handleOnNext = async (item) => {
    const cursor = `${item.created_at}_${item.id}`
    await loadProducts({ cursor })
    page.value += 1
}

const handleDottedMenu = (event, value) => {
    if (event === 'delete') {
        beforeDeleteProduct(value)
        return
    }

    if (event === 'edit') {
        editProduct(value.id)
        return
    }
}


await loadProducts()
</script>



<style lang="css" scoped>
.card {
    padding: 1rem;
}
</style>