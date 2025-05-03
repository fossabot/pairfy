<template>
    <div class="card">
        <FolderComp :tabs="['Inventory', 'Statistics']" :icons="['pi-clipboard', 'pi-gauge']">

            <template #content="{ index }">
                <!----------------CONTENT---------------->

                <TableComp :columns="columns" :items="products" :limit="15" :count="productCount" :images="true"
                    :columnWidths="{ id: '7rem', category: '8rem', price: '7rem' }" @onPrev="handleOnPrev"
                    @onNext="handleOnNext">

                    <template #image="{ item }">

                    </template>

                    <template #col-id="{ value }">
                        {{ value }}
                    </template>

                    <template #col-sku="{ value }">
                        {{ formatSKU(value) }}
                    </template>

                    <template #col-price="{ item }">
                        <span>{{ }}</span>

                        <span v-if="item.discount">{{ ` (-${getDiscount(item.price, item.discount_value)})` }}</span>
                    </template>

                    <template #col-discount="{ value, item }">
                        <span class="discount" :class="{ disabled: !value }">
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

const productCount = computed(() => 0);


const productsTemp = ref({});

const products = computed(() => Object.values(productsTemp.value));

const columns = ref([
    { label: "ID", field: "id" },
    { label: "Sku", field: "sku" },
    { label: "Name", field: "name" },
    { label: "Price", field: "price" },
    { label: "Discount", field: "discount" },
    { label: "Category", field: "category" },
    { label: "Date", field: "created_at" },
    { label: "Paused", field: "paused" },
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

function reduceArrayByIndex(data, index) {
  const result = data.reduce((acc, item) => {
    acc[item[index]] = item
    return acc
  }, {})

  return result
}

const processProductData = () => {

    const reduce = reduceArrayByIndex(value.getProducts.products, "id");

    for (const [key, value] of Object.entries(reduce)) {
        productsTemp.value[key] = value;
    }

}
</script>

<style lang="css" scoped>
.card {
    padding: 1rem 1.5rem;
}
</style>