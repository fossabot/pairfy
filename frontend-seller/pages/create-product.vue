<template>
    <div class="card">
        <div class="grid">
            <div class="grid-left">

                <div class="grid-row">
                    <div class="grid-title">
                        Product
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
                        Origin
                    </div>
                    <div class="grid-subtitle">
                        Data required for calculating shipments.
                    </div>
                    <div class="grid-item">
                        <InputProductCountry id="create-product-country" />
                        <InputProductCity id="create-product-city" />
                    </div>
                    <div class="grid-item">
                        <InputProductPostal id="create-product-postal" />
                      
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        Description
                    </div>
                    <div class="grid-subtitle">
                        Create a product description using the AI tool.
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-title">
                        Description
                    </div>
                    <div class="grid-subtitle">
                        Create a product description using the AI tool.
                    </div>
                </div>


                
            </div>
            <div class="grid-right">Contenido secundario</div>
        </div>
    </div>
</template>

<script setup>

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

.grid-right {
    padding: 1rem;
}

.grid-title {
    font-size: var(--text-size-3);
    font-weight: bold;
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
    margin-top: 1rem;
    padding: 1.5rem;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>