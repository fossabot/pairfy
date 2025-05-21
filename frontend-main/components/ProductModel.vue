<template>
    <div class="ProductModel flex">
        <div class="icon flex">
            <img src="https://m.media-amazon.com/images/I/61cCf94xIEL.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="">
        </div>

        <div class="body">
            <div class="model flex">
                <span>Model S9-C52025</span>
                <span class="divider" />
                <span class="color" />
            </div>

            <div class="price">
                <span>$38 USD</span>
                <span class="discount">-10% OFF</span>
                <span class="saved">Save $250</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.ProductModel {
    border: 1px solid rgba(0, 0, 0, 50%);
    transition: var(--transition-a);
    border-radius: var(--radius-c);
    font-weight: 600;
    cursor: pointer;
    padding: 1rem;
}

.ProductModel:focus {
    outline: 1px solid var(--primary-a);
}

.ProductModel:hover {
    border: 1px solid var(--primary-a);
}

.body {
    display: flex;
    flex-direction: column;
}

.color {
    border-radius: 50%;
    background: gray;
    height: 1rem;
    width: 1rem;
}

.price {
    margin-top: 0.5rem;
    font-weight: 400;
}

.icon {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    object-fit: contain;
}

.icon img {
    width: 100%;
}

.price span {
    margin-right: 1rem;
}

.discount,
.saved {
    font-size: var(--text-size-1);
}

.discount {
    color: var(--red-a);
    font-weight: 600;
}

.saved {
    color: var(--text-b);
}

.divider {
    width: 1px;
    height: 0.75rem;
    margin: 0 0.75rem;
    background: var(--text-b)
}
</style>
