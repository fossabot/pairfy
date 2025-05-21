<template>
    <div class="ProductButton flex">
        <div class="icon">
            <img src="https://m.media-amazon.com/images/I/61cCf94xIEL.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="">
        </div>

        <div class="body">
            <div class="model">
                <span>Model S9-C52025</span>
                <span class="color" />
            </div>

            <div class="price">
                <span>$38 USD</span>
                <span class="discount">-10%</span>
                <span class="saved">$250 saved</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.ProductButton {
    border: 1px solid rgba(0, 0, 0, 50%);
    transition: var(--transition-a);
    border-radius: var(--radius-c);
    font-weight: 600;
    cursor: pointer;
    padding: 1rem;
}

.ProductButton:focus {
    outline: 1px solid var(--primary-a);
}

.ProductButton:hover {
    border: 1px solid var(--primary-a);
}


.body {
    display: flex;
    flex-direction: column;
}

.icon {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
}

.model {
    display: flex;
    align-items: center;
}

.color {
    background: black;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-left: 0.5rem;
}

.price {
    font-weight: 400;
    margin-top: 0.5rem;
}

.icon {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
    margin-right: 1rem;
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
}

.saved {
    color: var(--green-a);
}
</style>
