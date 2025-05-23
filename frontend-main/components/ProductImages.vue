<template>
    <div class="p-media">
      <div class="p-media-nav">
        <div
          class="p-media-nav-item flex"
          :class="{ selected: selectedImageIndex === index }"
          v-for="(item, index) in visibleThumbnails"
          :key="'visible-' + index"
          @click="selectImage(index)"
          @mouseover="selectImage(index)"
          :aria-selected="selectedImageIndex === index"
          role="button"
          tabindex="0"
        >
          <img :src="getImageSrc(item)" :alt="'small ' + (index + 1)" />
        </div>
  
        <!-- More -->
        <div
          v-if="hiddenThumbnails.length"
          class="p-media-nav-item flex more-thumbnail"
          @click="openDialog"
          role="button"
          tabindex="0"
        >
          +{{ hiddenThumbnails.length }}
        </div>
      </div>
  
      <!-- Image -->
      <div class="p-media-image">
        <img
          :src="getImageSrc(productImageList[selectedImageIndex])"
          alt="Imagen del producto seleccionada"
        />
  
        <button
          class="btn-nav left"
          @click="prevImage"
          aria-label="Imagen anterior"
          v-if="productImageList.length > 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
  
        <button
          class="btn-nav right"
          @click="nextImage"
          aria-label="Siguiente imagen"
          v-if="productImageList.length > 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
  
      <!-- Modal -->
      <div v-if="isDialogOpen" class="modal-overlay" @click.self="closeDialog">
        <div class="modal">
          <h3>Imágenes adicionales</h3>
          <div class="modal-grid">
            <div
              v-for="(item, index) in hiddenThumbnails"
              :key="'hidden-' + index"
              class="modal-thumbnail"
              @click="selectImage(index + maxVisible); closeDialog()"
            >
              <img :src="getImageSrc(item)" :alt="'extra ' + (index + 1 + maxVisible)" />
            </div>
          </div>
          <button class="close-button" @click="closeDialog">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import placeholderImage from '@/assets/placeholder/image.svg'
  
  const productStore = useProductStore()
  const product = computed(() => productStore.product)
  const media = computed(() => productStore.media)
  
  const productImageList = computed(() =>
    media.value.map(item => item.resolutions.large)
  )
  
  const selectedImageIndex = ref(0)
  
  const selectImage = (index) => {
    selectedImageIndex.value = index
  }
  
  const prevImage = () => {
    const total = productImageList.value.length
    selectedImageIndex.value = (selectedImageIndex.value - 1 + total) % total
  }
  
  const nextImage = () => {
    const total = productImageList.value.length
    selectedImageIndex.value = (selectedImageIndex.value + 1) % total
  }
  
  function getImageSrc(item) {
    return item ? useMediaUrl(item) : placeholderImage
  }
  
  const maxVisible = 5
  const visibleThumbnails = computed(() =>
    productImageList.value.slice(0, maxVisible)
  )
  const hiddenThumbnails = computed(() =>
    productImageList.value.slice(maxVisible)
  )
  
  const isDialogOpen = ref(false)
  const openDialog = () => {
    isDialogOpen.value = true
  }
  const closeDialog = () => {
    isDialogOpen.value = false
  }
  </script>
  
  <style scoped>
  .p-media {
    background: var(--background-a);
    border-radius: var(--radius-d);
    position: relative;
    display: flex;
  }
  
  .p-media-nav {
    display: flex;
    flex-direction: column;
  }
  
  .p-media-nav-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: var(--transition-a);
    border-radius: var(--radius-b);
    justify-content: center;
    margin-bottom: 1rem;
    overflow: hidden;
    cursor: pointer;
    height: 3.5rem;
    width: 3.5rem;
    display: flex;
    align-items: center;
  }
  
  .p-media-nav-item.selected {
    border: 1px solid rgba(0, 0, 0, 0.8);
  }
  
  .p-media-nav-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .more-thumbnail {
    background: rgba(0, 0, 0, 0.05);
    font-weight: bold;
    font-size: 1rem;
    justify-content: center;
    align-items: center;
    color: #333;
  }
  
  .p-media-image {
    width: 550px;
    height: 550px;
    display: flex;
    margin: 0 auto;
    position: relative;
    align-items: center;
  }
  
  .p-media-image img {
    transition: opacity 0.3s ease;
    width: 100%;
  }
  
  .btn-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background: rgba(0, 0, 0, 0.04);
    border: none;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    z-index: 10;
    transition: var(--transition-a);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .btn-nav:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  
  .btn-nav.left {
    left: -8rem;
  }
  
  .btn-nav.right {
    right: -8rem;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    border-radius: var(--radius-c);
    padding: 2rem;
    max-width: 90%;
    max-height: 80%;
    overflow-y: auto;
  }
  
  .modal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .modal-thumbnail {
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: var(--radius-a);
    overflow: hidden;
  }
  
  .modal-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .close-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    background: #ddd;
    cursor: pointer;
    border-radius: var(--radius-a);
  }
  
  /* Mobile */
  @media (max-width: 480px) {
    .p-media {
      display: none;
    }
  }
  </style>
  