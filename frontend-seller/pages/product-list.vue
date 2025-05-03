<template>
    <div class="card">
        <FolderComp :tabs="['Inventory', 'Statistics']" :icons="['pi-clipboard', 'pi-gauge']">

            <template #content="{ index }">
                <!----------------CONTENT---------------->

                <TableComp v-if="products.length" :columns="columns" :items="products" :limit="15" :count="productCount"
                    :images="true" :columnWidths="{ id: '7rem', category: '8rem', price: '7rem' }"
                    @onPrev="handleOnPrev" @onNext="handleOnNext">

                    <template #image="{ item }">

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
const dottedMenuOptions = ref([
    { label: "Delete Product", value: "delete" },
    { label: "Edit Product", value: "edit" },
    { label: "Open Page", value: "open" }
])

const productCount = ref(0);


const columns = ref([
    { label: "Image", field: "thumbnail_url" },
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
]);

const handleOnPrev = (event) => {
    console.log(event.created_at)


}

const handleOnNext = (event) => {

    console.log(event.created_at)

}

const handleDottedMenu = (event, value) => {
    console.log(event, value.id);

    if (event === 'delete') {
        beforeDeleteProduct(value);
        return;
    }

    if (event === 'edit') {
        editProduct(value.id);
        return;
    }
}

const limit = 16
const cursor = ref("NOT")
const products = ref([])
const nextCursor = ref(null)
const hasMore = ref(false)
const loading = ref(false)



const { data, error } = await useFetch('/api/product/getProducts', {
    method: 'POST',
    credentials: 'include',
    body: {
        cursor: cursor.value
    },
    async onResponseError({ response }) {
        throw new Error(JSON.stringify(response._data.data));
    }
})

if (data.value) {
    products.value = data.value.products
    nextCursor.value = data.value.nextCursor
    hasMore.value = data.value.hasMore
    productCount.value = data.value.totalCount
}




</script>

<style lang="css" scoped>
.card {
    padding: 1rem 1.5rem;
}
</style>