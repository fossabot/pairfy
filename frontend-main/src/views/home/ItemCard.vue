<template>
    <div class="card">
        <img :src="props.content.image" :alt="props.content.alt">

        <div class="body">
            <span class="title">{{ props.content.title }}</span>
            <span class="price">
                <span class="dollar">$</span>{{ formatPriceToUSD(props.content.price) }}
            </span>

            <div class="tag" v-if="props.content.discount">
                <span>-{{ props.content.discount_value }}%</span>
            </div>

            <div class="shipping flex green">
                <span>Free shipping</span>
                <i class="pi pi-bolt green" />
                <span class="full">FULL</span>
            </div>

        </div>
    </div>
</template>

<script setup>

const props = defineProps(['content'])

function formatPriceToUSD(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}


</script>

<style lang="css" scoped>
.card {
    overflow: hidden;
    cursor: pointer;
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
    font-weight: 600;
    font-size: var(--text-size-3);

}

.full {
    font-weight: 700;
    font-style: italic;
}

.shipping {
    font-weight: 600;
    margin-top: 0.5rem;
}

.shipping i {
    margin: 0 0.25rem;
}

.dollar {
    font-size: var(--text-size-1);
    margin-right: 2px;
}

.tag{
    margin-top: 0.25rem;
    background: var(--red-a);
    width: 50px;
    text-align: center;
    border-radius: 2px;
    color: var(--text-w);
    font-weight: 600;
    font-size: var(--text-size-0);
}
</style>