<template>
  <div class="body">
    <div class="container">
      <div class="top">
        <BannerComp />
      </div>
      <div class="bottom">
        <template v-for="(item, index) in feedData" :key="index">

          <section v-if="visibilityMap[index]" :class="{ 'visible': visibilityMap[index] }">
            <NormalGrid :content="item" :title="index" :visibleTitle="true" />

          </section>

          <span class="target" :class="{ 'visible': visibilityMap[index] }" :ref="el => setCategoryRef(el, index)" />
        </template>
      </div>

    </div>
  </div>
</template>

<script setup>
import gql from 'graphql-tag'
import NormalGrid from '@/views/home/NormalGrid.vue'
import BannerComp from '@/views/home/BannerComp.vue'
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useQuery } from '@vue/apollo-composable'


const root = ref(null)
const target = ref(null)
const isVisible = ref(false)


const feedData = ref({});

const { result } = useQuery(gql`
      query getFeed {
        getFeed 
      }
    `)

watch(result, value => {

  if (value.getFeed) {
    feedData.value = JSON.parse(value.getFeed);

    console.log(feedData.value)
  }

})



const { isActive, pause, resume } = useIntersectionObserver(
  target,
  ([entry]) => {
    isVisible.value = entry?.isIntersecting || false
  },
  { root },
)



const categoryRefs = ref({}); // Store refs for categories

const visibilityMap = reactive({}); // Track which categories are visible

// Initialize visibility map
Object.keys(feedData.value).forEach((category) => {
  visibilityMap[category] = false;
});

visibilityMap["Best Sellers"] = true;

const setCategoryRef = (el, category) => {
  if (el) {
    categoryRefs.value[category] = el;

    useIntersectionObserver(
      categoryRefs.value[category],
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          console.log("INTERSECTION", category)

          visibilityMap[category] = true;
        }
      }
    );

    return categoryRefs.value[category]
  }
};





</script>

<style lang="css" scoped>
.body {
  min-height: 100vh;
  display: grid;
  width: 100%;
}

section.visible {
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(5%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}


.target {
  background: transparent;
  width: 100%;
  height: 1px;
  margin-top: 100px;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}


.target.visible {
  margin-top: 0px;
}

.top {
  background: var(--background-b);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  display: flex;
}

.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0rem;
  padding-bottom: 200px;
}

/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {
  .bottom {
    padding-top: 0rem;
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