<template>
  <div class="ProductGrid">
    <div class="ProductGrid-body">
      <div class="title">
        Results for {{ `"${prompt}"` }} <span>({{ count }}) </span>
      </div>
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

const prompt = computed(() => search.prompt || 'keyword')

const count = computed(() => search.result.length)

watch(
  () => search.result,
  (result) => {
    content.value = [...result]
    animateCards()
  },
  { deep: true, immediate: false }
)

function animateCards() {
  requestAnimationFrame(() => {
    gsap.from('.product-card', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    })
  })
}
</script>


<style lang="css" scoped>
.ProductGrid {
  width: 100%;
  display: flex;
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
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  justify-content: center;
  margin-top: 1rem;
  display: grid;
  gap: 2rem;
}

.title {
  font-size: var(--text-size-4);
  font-weight: 600;
}

.title span {
  font-weight: 400;
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