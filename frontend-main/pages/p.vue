<template>
  <div class="ProductPage">
    <div class="ProductPage-body">
      <div class="left">
        <ProductImages /> 
      </div>


      <div class="right-container">
        <div class="right" id="buySection" ref="buySection">
          <div class="buy-box">
            <label>Cantidad:</label>
            <input type="number" min="1" value="1" />

            <label>Método de pago:</label>
            <select>
              <option>Tarjeta</option>
              <option>Transferencia</option>
              <option>Efectivo</option>
            </select>

            <button>Comprar Ahora</button>
          </div>

        
          <div class="right-debug-text">
            <p v-for="i in 40" :key="i">[DERECHA] Detalle adicional {{ i }}: Información del producto o promociones.</p>
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
  background: var(--background-a);
  max-width: var(--body-a);
  min-height: 100vh;
  margin-top: 3rem;
  width: inherit;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  margin-top: 10rem;
}

.left {
}

.product-image {
  width: 100%;
  height: 400px;
  background: #ddd;
  margin-bottom: 1rem;
}

.description {
  height: auto;
}

.right-container {
  position: relative;
  height: 100vh;
}

.right {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
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

.buy-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.buy-box input,
.buy-box select,
.buy-box button {
  padding: 0.75rem;
  font-size: 1rem;
}

.right-debug-text p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}
</style>
