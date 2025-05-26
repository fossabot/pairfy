<template>
  <div class="ProductGrid">

    <div class="ProductGrid-body">
      <div class="ProductGrid-grid">
        <div class="product-card" v-for="(item, index) in content" :key="item.id + '-' + index">
          <ProductCard :data="item" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { gsap } from 'gsap'

const content = ref([])

const search = useSearchStore()

onMounted(() => {
  setTimeout(() => {
    content.value = [...search.result]

    requestAnimationFrame(() => {
      gsap.from('.product-card', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      })
    })
  }, 200)
})

</script>

<style lang="css" scoped>
.ProductGrid {
  padding-right: 2rem;
  display: flex;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
}

.ProductGrid-body {
  width: inherit;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: var(--radius-a);
}

.ProductGrid-grid {
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  justify-content: center;
  display: grid;
  gap: 2rem;
}

@media (max-width: 480px) {
  .ProductGrid-body {
    padding: 0 0.5rem;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    row-gap: 1rem;
  }
}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
  /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
  /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
  /* Styles for large screens */
}
</style>