<template>
  <div class="ProductPage">

    <div class="ProductPage-body">
      <DividerComp />
      <div class="ProductPage-grid">
        <div class="left">
          <ProductImages />
          <DividerComp />
          <ProductCarousel style="max-width: 1200px;" />

          <p v-for="n in 40" :key="n">
            Este es un párrafo repetido.
          </p>


        </div>


        <div class="right-container">

          <div class="right" id="buySection" ref="buySection">
            <div class="productBrand">
              Samsung
            </div>

            <div class="productName">
              Apple 2025 MacBook Air 13-inch Laptop with M4 chip: Built for Apple Intelligence, 13.6-inch Liquid Retina
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

            <ProductButton>
              <template #icon>
                <img class="icon"
                  src="https://m.media-amazon.com/images/I/61cCf94xIEL.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="">
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

            <p v-for="n in 20" :key="n">
              Este es un párrafo repetido.
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

<script setup>

useHead({
  title: 'Pairfy - Cardano marketplace',
  meta: [
    { name: 'description', content: 'Buy and sell products on Cardano blockchain.' }
  ]
})
</script>

<style lang="css" scoped>
.ProductPage {
  justify-content: center;
  display: flex;
  width: 100%;
}

.ProductPage-body {
  width: inherit;
  display: flex;
  margin-top: 6rem;
  flex-direction: column;
  max-width: var(--body-a);
}

.ProductPage-grid {
  grid-template-columns: 1fr 400px;
  background: var(--background-a);
  min-height: 100vh;
  width: inherit;
  display: grid;
  gap: 2rem;
}

.left {
  max-width: calc(--body-a - 400px);
}

.right-container {
  position: relative;
}

.right {
  top: 0;
  padding: 1.5rem;
  overflow-y: auto;
  position: sticky;
  height: 100vh;
}

.right {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer y Edge Legacy */
}

.right::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Edge moderno */
}


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
