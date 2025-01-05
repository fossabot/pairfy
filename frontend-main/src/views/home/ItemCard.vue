<template>
    <div class="card">
        <img src="https://ae01.alicdn.com/kf/Sbeea600553724205913a3ec0acf666f2c.jpg_760x760q75.jpg" alt="">

        <div class="body">
            <span class="title">Libros educativos para niños, libros...</span>
            <span class="price">
                $7.80
            </span>

            <div class="shipping flex green">
                <span>Free shipping</span>
                <i class="pi pi-bolt green" />
                <span class="full">FULL</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.card {
    overflow: hidden;
}

.card img {
    width: 100%;
    max-width: 250px;
    height: 250px;
    object-fit: contain;
    border-radius: 16px;
    background: var(--background-a);
}

.body {
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    font-size: var(--text-size-1);
}

.price {
    font-weight: 500;
    font-size: var(--text-size-3);
}

.full {
    font-weight: 700;
    font-style: italic;
}

.shipping{
    font-weight: 600;
}

.shipping i{
    margin: 0 0.25rem;  
}

</style>