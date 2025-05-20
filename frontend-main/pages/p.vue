<template>
    <div class="todo">
        <div class="container">
            <DividerComp />

            <div class="grid" @wheel.prevent="handleScroll">
                <div class="left">
                    <div ref="leftScroll" class="scrollable hide-scrollbar">
                        <div class="content">

                            <ProductImages />
                            <DividerComp />
                            <ProductCarousel style="max-width: 1200px;" />

                            <p v-for="n in 40" :key="n">
                                Este es un párrafo repetido.
                            </p>

                        </div>
                    </div>
                </div>



                <div class="right">
                    <div ref="rightScroll" class="scrollable sticky-box">
                        <div class="content">


                            <div class="productBrand">
                                Samsung
                            </div>

                            <div class="productName">
                                Apple 2025 MacBook Air 13-inch Laptop with M4 chip: Built for Apple Intelligence,
                                13.6-inch
                                Liquid Retina
                                Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID
                            </div>

                            <div class="productModel">
                                <span>SKU J83JXOQ</span>
                            </div>

                            <div class="productRating">
                                <span>4.3</span>
                                <RatingComp :rating="4" />
                                <span>(3849)</span>
                            </div>

                            <div class="subtitle">
                                Model. <span>Check variations.</span>
                            </div>

                            <ProductButton v-for="n in 0" :key="n">
                                <template #icon>
                                    <img class="icon"
                                        src="https://m.media-amazon.com/images/I/61cCf94xIEL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
                                        alt="">
                                </template>
                                <span>Model S9-C52025</span>
                            </ProductButton>

                            <div class="subtitle">
                                Finish. <span>Choose your preferred network.</span>
                            </div>

                            <ProductButton>
                                <template #icon>
                                    <img class="icon" src="@/assets/icon/cardano.svg" alt="">
                                </template>
                                Cardano Network
                            </ProductButton>

                            <ProductButton>
                                <template #icon>
                                    <img class="icon" src="@/assets/icon/midnight.svg" alt="">
                                </template>
                                Midnight Network
                            </ProductButton>

                            <div class="busy-box"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
    title: 'Pairfy - Cardano marketplace',
    meta: [
        { name: 'description', content: 'Buy and sell products on Cardano blockchain.' }
    ]
})



const leftScroll = ref(null)
const rightScroll = ref(null)

const handleScroll = (e) => {
    const delta = e.deltaY
    const right = rightScroll.value
    const left = leftScroll.value

    const scrollingDown = delta > 0
    const rightAtBottom = right.scrollTop + right.clientHeight >= right.scrollHeight
    const leftAtBottom = left.scrollTop + left.clientHeight >= left.scrollHeight

    if (scrollingDown) {
        if (!rightAtBottom) {
            right.scrollTop += delta
        } else if (!leftAtBottom) {
            left.scrollTop += delta
        }
    } else {
        if (left.scrollTop > 0) {
            left.scrollTop += delta
        } else if (right.scrollTop > 0) {
            right.scrollTop += delta
        }
    }
}
</script>

<style scoped>
.todo {
    justify-content: center;
    padding-top: 5rem;
    display: flex;
    width: 100%;
}

.container {
    display: flex;
    width: inherit;
    max-width: var(--body-a);
    flex-direction: column;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    height: 100vh;
    overflow: hidden;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    height: 100vh;
    overflow: hidden;
    gap: 3rem;
}

.left,
.right {
    box-sizing: border-box;

    overflow: hidden;
}

.left {
    height: 100vh;
}

.right {
    position: sticky;
    height: 100vh;
}

.busy-box {
    height: 200px;
}

.scrollable {
    height: 100%;
    overflow-y: scroll;
}

.sticky-box {
    position: sticky;
    top: 0;
}

.content {
    height: 200%;
}


/* Ocultar scrollbar en todos los navegadores compatibles */
.hide-scrollbar {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
}
</style>











<style lang="css" scoped>
.productName {
    font-size: var(--text-size-4);
    margin-top: 0.5rem;
    line-height: 2rem;
    font-weight: 400;
}

.productRating {
    display: flex;
    margin-top: 1rem;
    align-items: center;
    font-size: var(--text-size-1);
}

.productRating span {
    font-weight: 400;
}

.productRating span:nth-child(1) {
    margin-right: 0.5rem;
    font-weight: 600;
}

.productRating span:nth-child(3) {
    margin-left: 0.5rem;
}

.productModel {
    color: var(--text-b);
    align-items: center;
    margin-top: 1rem;
    display: flex;
}

.productModel div {
    width: 1px;
    height: 10px;
    margin: auto 0.5rem;
    background: var(--text-b);
}

.icon {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
}

.productBrand {
    font-size: var(--text-size-4);
    font-weight: 700;
}

.subtitle {
    font-size: var(--text-size-4);
    color: var(--text-a);
    margin-top: 2rem;
    font-weight: 600;
}

.subtitle span {
    color: var(--text-b);
}
</style>
