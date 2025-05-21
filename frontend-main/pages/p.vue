<template>
  <div class="page-wrapper">
    <DialogComp ref="dialogRef">
      <p>Contenido del diálogo</p>
    </DialogComp>

    <div class="container">
      <div class="left-column">
        <ProductImages />
        <DividerComp />
        <img class="test-image" v-for="n in 10" :key="n"
          src="https://m.media-amazon.com/images/G/01/apple/MacBook_Air_M4_Product_Page_LW__en-US_01._CB549121584_.jpg" />
      </div>


      <div class="right-column">
        <div class="fixed-box">
          <div class="right-scroll" ref="rightScrollRef">

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
              <span>(384)</span>
            </div>

            <div class="subtitle">
              Model. <span>Check variations.</span>
            </div>

            <ProductModel v-for="n in 1" :key="n" />

            <div class="subtitle text-gradient">
              Finish. <span>Choose your network.</span>
            </div>

            <ProductButton @click="openChildDialog">
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

            <div class="busy-box" />


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Lenis from 'lenis'

let lenis = null
let frameId;

function addLenis() {
  lenis = new Lenis({
    smooth: true,
  })

  const raf = (time) => {
    lenis?.raf(time)
    frameId = requestAnimationFrame(raf)
  }

  frameId = requestAnimationFrame(raf)
}


function removeLenis() {
  if (frameId) cancelAnimationFrame(frameId)
  lenis?.destroy()
}


const rightScrollRef = ref(null)

const syncScroll = () => {
  if (rightScrollRef.value) {
    rightScrollRef.value.scrollTop = window.scrollY
  }
}

useLenisMultiple([rightScrollRef])

onMounted(() => {
  addLenis()
  window.addEventListener('scroll', syncScroll)
})

onBeforeUnmount(() => {
  removeLenis()
  window.removeEventListener('scroll', syncScroll)
})




const dialogRef = ref(null);

function openChildDialog() {
  dialogRef.value?.openDialog();
}

</script>

<style scoped>
.page-wrapper {
  width: 100%;
  display: flex;
  padding-top: 12rem;
  justify-content: center;
}

.container {
  display: flex;
  width: inherit;
  max-width: var(--body-a);
  box-sizing: border-box;
}


.left-column {
  width: inherit;
  max-width: calc(var(--body-a) - 400px);
  box-sizing: border-box;
}


.right-column {
  width: 400px;
  box-sizing: border-box;
}


.fixed-box {
  position: fixed;
  top: 10rem;
  width: inherit;
  height: 100vh;
  right: 4rem;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 11000;
}

.right-scroll {
  height: 100%;
  overflow-y: auto;
}

.right-scroll {
  overflow-y: auto;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.right-scroll::-webkit-scrollbar {
  display: none;
  /* Safari y Chrome */
}

.product-section {
  margin-bottom: 40px;
}

.test-image {
  width: 100%;
}

.icon {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}

.busy-box {
  height: 200px;
}

.subtitle {
  font-size: var(--text-size-4);
  margin-bottom: 2rem;
  margin-top: 2rem;
  font-weight: 600;
}

.subtitle span{
  color: var(--text-a);
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

.productBrand {
  font-size: var(--text-size-3);
  font-weight: 700;
}

.productModel div {
  width: 1px;
  height: 10px;
  margin: auto 0.5rem;
  background: var(--text-b);
}
</style>
