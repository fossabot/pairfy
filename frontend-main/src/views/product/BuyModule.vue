<template>
    <div class="buy">
        <Dialog v-model:visible="showBuyDialog" modal header="Confirmation" :style="{ width: '25rem' }" :draggable="false">
            <template #header>

            </template>
            <div class="dialog-msg">
                <Message size="small" icon="pi pi-exclamation-circle" severity="info">
                    The time limit for sending the transaction is 3 minutes. The seller has 15 minutes to accept the
                    purchase. Otherwise you can get your money back.
                </Message>
            </div>

            <div class="dialog-sub">Are you sure to buy ({{ selectedQuantity.code }}) units of...</div>

            <div class="dialog-name">
                Razer - Blade 16 - 16" Gaming Laptop -
                    OLED QHD + 240 Hz
                    - Intel i9 -14900HX - NVIDIA GeForce RTX 4080 - 32 GB RAM - 1 TB SSD - Black
            </div>


            <template #footer>
                <Button label="Cancel" text severity="secondary" @click="showBuyDialog = false" autofocus />
                <Button label="Buy" outlined severity="secondary" @click="visible = false" autofocus />
            </template>
        </Dialog>


        <Skeleton v-if="!getProductData" width="100%" height="500px" />

        <div v-if="getProductData">


            <div class="buy-legend">
                SKU: {{ getProductData.sku.split(":")[0] }}
            </div>
            <div class="buy-legend">
                Model: {{ getProductData.model }}
            </div>
            <div class="buy-legend">
                Brand: {{ getProductData.brand }}
            </div>
            <div class="buy-legend">
                Collateral: {{ getProductData.collateral }} USD
            </div>

            <div class="buy-legend">
                Keeping Stock: 15
            </div>

            <div class="buy-rating">
                <Rating v-model="productRating" :stars="5" readonly />
                <span> 4.5 (1250 reviews)</span>
            </div>

            <div class="buy-stock" :class="{ green: 15 > 0, }">
                {{ getStockLabel(15) }}
            </div>

            <div class="buy-available">
                Available (15)
            </div>

            <div class="buy-control">
                <Select v-model="selectedQuantity" :options="quantityOptions" optionLabel="name" placeholder="Units"
                    variant="filled" size="small" />
                <Button label="Buy Now" fluid @click="openBuyDialog()" />
                <Button label="Add to Cart" fluid outlined />
            </div>
        </div>
    </div>
</template>

<script setup>
import productAPI from '@/views/product/api/index';
import { ref } from "vue";

const { getProductData } = productAPI();

const selectedQuantity = ref({ name: '1', code: 1 });

const quantityOptions = ref([
    { name: '1', code: 1 },
    { name: '2', code: 2 },
    { name: '3', code: 3 },
    { name: '4', code: 4 },
    { name: '5', code: 5 },
    { name: '6', code: 6 },
    { name: '7', code: 7 },
    { name: '8', code: 8 },
    { name: '9', code: 9 },
    { name: '10', code: 10 }
]);

const productRating = ref(4);

const getStockLabel = (readyStock) => {
    return readyStock > 0 ? "In Stock" : "Out Stock";
}

const showBuyDialog = ref(false);

const openBuyDialog = () => {
    showBuyDialog.value = true;
}

</script>

<style lang="css" scoped>
.buy {
    border: 1px solid var(--border-a);
    border-radius: 8px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.buy-control {
    display: grid;
    gap: 0.5rem;
    margin-top: 0.5rem; 
}

.buy-available {
    margin-top: 1rem;
    font-size: var(--text-size-a);
    color: var(--text-b);
}

.buy-legend {
    display: flex;
    font-size: var(--text-size-a);
    line-height: 1.75rem;
}

.buy-rating {
    margin-top: 1rem;
    display: flex;
}

.buy-rating span {
    margin-left: 0.5rem;
    font-size: var(--text-size-a);
}

.buy-stock {
    color: var(--red-a);
    font-weight: 500;
    margin-top: 1rem;
}

.buy-stock.green {
    color: var(--green-a);
}

.dialog-name {
    margin-top: 1rem;
}

.dialog-sub {
    margin-top: 1rem;
    font-weight: 500;
}
</style>