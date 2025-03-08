<template>
    <div class="container">
        <div class="item">
            <div class="item-head flex">
                <div class="title">Top best sellers of the week</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="item-content">

            </div>
        </div>
        <div class="item">
            <div class="item-head flex">
                <div class="title">Supplies for your work</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="item-content">

            </div>
        </div>
        <div class="item">
            <div class="item-head flex">
                <div class="title">Create your gaming station</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="item-content">

            </div>
        </div>
        <div class="item">
            <div class="item-head flex">
                <div class="title">Gym accessories</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="item-content">

            </div>
        </div>
        <div class="item">
            <div class="item-head flex">
                <div class="title">Decorate your room</div>
                <div class="arrow">
                    <i class="pi pi-angle-right" />
                </div>
            </div>

            <div class="item-content">

            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(150px, auto);
    gap: 1rem;
}

.item {
    background: var(--background-b);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    text-align: center;
    padding: 0 1rem;
    display: flex;
    width: 100%;
}

.item:nth-child(1) {
    grid-column: span 2;
}

.item:nth-child(4) {
    grid-column: span 1;
}

.item-head {
    justify-content: space-between;
    padding: 0.75rem 0;
    width: inherit;
}

.item-head .title {
    font-size: var(--text-size-2);
    font-weight: 600;
}

.item-head .arrow {
    font-weight: 100;
}

.item-content {
    width: inherit;
    height: 100%;
}

@media (max-width: 768px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
    }

    .item:nth-child(1) {
        grid-column: span 1;
    }
}

@media (max-width: 480px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>