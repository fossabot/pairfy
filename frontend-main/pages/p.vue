<template>
  <div class="ProductPage">

    <div class="ProductPage-body">
      <DividerComp />
      <div class="ProductPage-grid">
        <div class="left">
          <ProductImages />
          <DividerComp />



          <h2>MacBook Air 13&quot; with M4 Chip — Power Meets Portability with Apple Intelligence</h2>

          <p><strong>Speed of Lightness</strong><br>
            The new <strong>MacBook Air with the M4 chip</strong> lets you blaze through work, creativity, and
            entertainment. Its ultra-thin and lightweight design makes it easy to take anywhere, while the <strong>up to
              18-hour battery life</strong> keeps you powered all day long.</p>

          <p><strong>Supercharged by M4</strong><br>
            The Apple M4 chip delivers exceptional speed and responsiveness for everything you do—whether you're
            multitasking across apps, editing high-resolution videos, or gaming with demanding graphics.</p>

          <p><strong>Built for Apple Intelligence*</strong><br>
            Apple Intelligence is your personal AI system that helps you write, create, and get things done with ease.
            With <strong>groundbreaking privacy protections</strong>, your data stays secure and private — even from
            Apple.</p>

          <p><strong>All-Day Battery Life</strong><br>
            Enjoy up to <strong>18 hours of battery life</strong>, whether you're plugged in or on the go. The
            efficiency of the M4 ensures peak performance across every task.</p>

          <p><strong>Brilliant 13.6&quot; Liquid Retina Display</strong><br>
            Experience stunning visuals with a Liquid Retina display that supports <strong>1 billion colors</strong>.
            Text appears ultra-sharp, and your photos and videos pop with rich contrast and vivid detail.</p>

          <p><strong>Look and Sound Amazing</strong><br>
            Elevate your video calls and content creation with a <strong>12MP front-facing camera</strong> featuring
            Center Stage, a <strong>three-mic array</strong>, and <strong>four-speaker system</strong> with Spatial
            Audio for immersive sound.</p>

          <p><strong>Modern Connectivity Options</strong><br>
            Includes <strong>MagSafe charging</strong>, <strong>two Thunderbolt 4 ports</strong>, <strong>Wi‑Fi
              6E*</strong>, <strong>Bluetooth 5.3</strong>, a <strong>headphone jack</strong>, and support for
            <strong>up to two external displays</strong>.
          </p>




        </div>


        <div class="right-container">

          <div class="right" id="buySection" ref="buySection">
            <div class="productName">
              Apple 2025 MacBook Air 13-inch Laptop with M4 chip: Built for Apple Intelligence, 13.6-inch Liquid Retina
              Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID; Sky Blue
            </div>

            <div class="productRating">
              <span>4.3</span>
              <RatingComp />
              <span>(3849)</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const buySection = ref(null)

onMounted(() => {
  const el = buySection.value
  if (!el) return

  el.addEventListener('wheel', (e) => {
    const isScrollable = el.scrollHeight > el.clientHeight
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight

    if (isScrollable && !atBottom) return

    if (atBottom) {
      el.style.overflowY = 'hidden'
      setTimeout(() => { el.style.overflowY = 'auto' }, 100)
    }
  })
})

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
  grid-template-columns: 1fr 500px;
  background: var(--background-a);
  min-height: 100vh;
  width: inherit;
  display: grid;
  gap: 2rem;
}

.left {}

.right-container {
  position: relative;
  height: 100vh;
}

.right {
  top: 0;
  padding: 2rem;
  overflow-y: auto;
  position: sticky;
  min-height: 100vh;
  border-radius: var(--radius-d);
  background: var(--background-b);
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
  line-height: 1.75rem;
  font-weight: 600;
}

.productRating {
  margin-top: 1rem;
  display: flex;
}

.productRating span {
  font-size: var(--text-size-1);
  font-weight: 400;
}

.productRating span:nth-child(1) {
  margin-right: 1rem;
  font-weight: 600;
}

.productRating span:nth-child(3) {
  margin-left: 1rem; 
}


</style>
