<template>
    <div class="todo">
        <div class="custom-scrollbar-container">
            <div class="custom-scrollbar-thumb" :style="{ height: thumbHeight + 'px', top: thumbTop + 'px' }"
                @mousedown="startDrag"></div>
        </div>


        <div class="container">

            <div class="grid">
                <div class="left">

                    <div ref="leftScroll" class="scrollable hide-scrollbar">
                        <div class="content">
                            <ProductImages />
                            <DividerComp />
                            <ProductCarousel style="max-width: 1000px;" />
                            <p v-for="n in 100" :key="n">
                                Este es un párrafo repetido.
                            </p>

                        </div>
                    </div>
                </div>

                <div class="right">
                    <div ref="rightScroll" class="scrollable sticky-box hide-scrollbar">
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

                            <ProductModel />

                            <div class="subtitle">
                                Finish. <span>Choose your network.</span>
                            </div>

                            <ProductButton>
                                <template #icon>
                                    <img class="icon" src="@/assets/icon/cardano.svg" alt="">
                                </template>
                                Cardano Network
                            </ProductButton>

                            <ProductButton style="margin-top: 1rem;">
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
import { ref, onMounted, onUnmounted } from 'vue'

const leftScroll = ref(null)
const rightScroll = ref(null)

const thumbHeight = ref(60) // cambiará dinámicamente
const thumbTop = ref(0)

const isDragging = ref(false)
const dragStartY = ref(0)
const startScrollY = ref(0)

const updateThumb = () => {
    const right = rightScroll.value
    const left = leftScroll.value

    const totalScrollable =
        right.scrollHeight - right.clientHeight +
        left.scrollHeight - left.clientHeight

    const totalScrollTop =
        Math.min(right.scrollTop, right.scrollHeight - right.clientHeight) +
        Math.max(0, left.scrollTop)

    const containerHeight = window.innerHeight
    thumbHeight.value = Math.max(
        40,
        (containerHeight / (containerHeight + totalScrollable)) * containerHeight
    )
    thumbTop.value = (totalScrollTop / totalScrollable) * (containerHeight - thumbHeight.value)
}

const syncScroll = (deltaY) => {
    const right = rightScroll.value
    const left = leftScroll.value

    const rightMax = right.scrollHeight - right.clientHeight
    const leftMax = left.scrollHeight - left.clientHeight

    const threshold = rightMax * 0.5

    if (deltaY > 0) {
        // scrolling down
        if (right.scrollTop < threshold) {
            right.scrollTop = Math.min(right.scrollTop + deltaY, threshold)
        } else if (right.scrollTop < rightMax) {
            const rightDelta = Math.min(deltaY * 0.5, rightMax - right.scrollTop)
            const leftDelta = deltaY - rightDelta
            right.scrollTop += rightDelta
            left.scrollTop = Math.min(left.scrollTop + leftDelta, leftMax)
        } else {
            left.scrollTop = Math.min(left.scrollTop + deltaY, leftMax)
        }
    } else {
        // scrolling up
        if (left.scrollTop > 0) {
            const leftDelta = Math.min(Math.abs(deltaY), left.scrollTop)
            const rightDelta = Math.abs(deltaY) - leftDelta
            left.scrollTop -= leftDelta
            right.scrollTop = Math.max(right.scrollTop - rightDelta, 0)
        } else {
            right.scrollTop = Math.max(right.scrollTop + deltaY, 0)
        }
    }

    updateThumb()
}


const handleWheel = (e) => {
    e.preventDefault()
    syncScroll(e.deltaY)
}

const startDrag = (e) => {
    isDragging.value = true
    dragStartY.value = e.clientY
    startScrollY.value = thumbTop.value

    document.body.style.userSelect = 'none'
    document.body.style.pointerEvents = 'none'

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
    if (!isDragging.value) return

    const delta = e.clientY - dragStartY.value
    const trackHeight = window.innerHeight - thumbHeight.value

    const scrollRatio = delta / trackHeight

    const right = rightScroll.value
    const left = leftScroll.value

    const totalScrollable =
        right.scrollHeight - right.clientHeight +
        left.scrollHeight - left.clientHeight

    const scrollAmount = scrollRatio * totalScrollable

    const newTotalScroll =
        startScrollY.value / trackHeight * totalScrollable + scrollAmount

    // distribuir el scroll entre right y left
    const rightMax = right.scrollHeight - right.clientHeight
    const leftMax = left.scrollHeight - left.clientHeight

    if (newTotalScroll <= rightMax) {
        right.scrollTop = newTotalScroll
        left.scrollTop = 0
    } else {
        right.scrollTop = rightMax
        left.scrollTop = newTotalScroll - rightMax
    }

    updateThumb()
}

const stopDrag = () => {
    isDragging.value = false
    document.body.style.userSelect = ''
    document.body.style.pointerEvents = ''

    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
}

onMounted(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('wheel', handleWheel, { passive: false })
    updateThumb()
})

onUnmounted(() => {
    document.body.style.overflow = ''
    window.removeEventListener('wheel', handleWheel)
})
</script>


<style scoped>
.todo {
    justify-content: center;
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
    grid-template-columns: 1fr 380px;
    overflow: hidden;
    height: 100vh;
    gap: 3rem;
}

.left,
.right {
    box-sizing: border-box;
    padding-top: 8rem;
    overflow: hidden;
}

.left {
    height: 100vh;
}

.right {
    height: 100vh;
}

.busy-box {
    height: 100px;
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
    height: 100%;
}


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

.productName {
    font-size: var(--text-size-3);
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
    font-size: var(--text-size-3);
    font-weight: 700;
}

.subtitle {
    font-size: var(--text-size-4);
    color: var(--text-a);
    margin-bottom: 2rem;
    margin-top: 2rem;
    font-weight: 600;
}

.subtitle span {
    color: var(--text-b);
}






.custom-scrollbar-thumb {
    position: absolute;
    right: 2px;
    width: 10px;
    background-color: rgba(100, 100, 100, 0.5);
    border-radius: 4px;
    cursor: grab;
    transition: background-color 0.3s;
}

.custom-scrollbar-thumb:active {
    cursor: grabbing;
}

.custom-scrollbar-container {
    position: fixed;
    top: 0;
    right: 0;
    width: 12px;
    height: 100vh;
    background-color: transparent;
    z-index: 1000;
}
</style>
