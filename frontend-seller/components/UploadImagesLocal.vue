<template>
  <div class="uploader">
    <input type="file" ref="fileInput" multiple accept="image/*" style="display: none" @change="onFilesSelected" />

    <div class="header">
      <button class="upload-button" @click="triggerFileInput" :disabled="images.length >= maxImages">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload-icon lucide-upload">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      </button>
      <div class="counter">

        <span :style="{ color: !images.length ? 'red' : 'black' }">
          {{ images.length }}
        </span>

        <span>{{ ` / ${maxImages}` }}</span> 
      </div>
    </div>

    <div class="empty-template" v-if="!images.length">
      empty
    </div>

    <div class="image-grid" ref="grid" v-show="images.length">
      <div v-for="(img, index) in images" :key="img.id" class="image-item">
        <img :src="img.url" alt="uploaded image" />
        <button class="delete-button" @click="removeImage(img.id)">✖</button>
        <span class="index-badge">{{ index + 1 }}</span>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import Sortable from 'sortablejs';

interface UploadedImg {
  id: string;
  file: File;
  url: string;
}

const emit = defineEmits<{
  (
    e: 'valid',
    payload:
      | { valid: true; value: { images: UploadedImg[]; positions: string[] } }
      | { valid: false; value: null }
  ): void;
}>();

const maxImages = 10;
const fileInput = ref<HTMLInputElement | null>(null);
const grid = ref<HTMLDivElement | null>(null);

const images = ref<UploadedImg[]>([]);
const positions = ref<string[]>([]);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onFilesSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  const availableSlots = maxImages - images.value.length;
  const filesToAdd = Array.from(files).slice(0, availableSlots);

  for (const file of filesToAdd) {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.value.push({
        id: crypto.randomUUID(),
        file,
        url: e.target?.result as string,
      });
      updatePositions();
      emitValidation();
    };
    reader.readAsDataURL(file);
  }

  target.value = '';
};

onMounted(() => {
  if (grid.value) {
    Sortable.create(grid.value, {
      animation: 200,
      ghostClass: 'sortable-ghost',
      onEnd: () => {
        const newOrder = Array.from(grid.value!.children).map((child) => {
          const imgElement = child.querySelector('img') as HTMLImageElement;
          return images.value.find((img) => img.url === imgElement.src)?.id || '';
        });
        images.value.sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
        updatePositions();
        emitValidation();
      },
    });
  }
});

const updatePositions = () => {
  positions.value = images.value.map((img) => img.id);
};

const emitValidation = () => {
  if (images.value.length > 0) {
    emit('valid', {
      valid: true,
      value: {
        images: images.value,
        positions: positions.value,
      },
    });
  } else {
    emit('valid', {
      valid: false,
      value: null,
    });
  }
};


const removeImage = (id: string) => {
  images.value = images.value.filter((img) => img.id !== id);
  updatePositions();
  emitValidation();
};
</script>

<style scoped>
.uploader {
  border: 1px solid var(--border-a);
  flex-direction: column;
  align-items: center;
  border-radius: var(--radius-b);
  display: flex;
}

.header {
  align-items: center;
  display: flex;
  height: 3rem;
  width: 100%;
}

.upload-button {
  background: transparent;
  padding: 0.5rem 1rem;
  color: var(--text-b);
  font-size: 1rem;
  cursor: pointer;
  border: none;
}

.upload-button svg {
  width: 2rem;
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.counter {
  font-size: var(--text-size-0);
  color: var(--text-b); 
}

.empty-template {
  height: 20rem;
}

.image-grid {
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  border-top: 1px solid var(--border-a);
  box-sizing: border-box;
  display: grid;
  padding: 1rem;
  width: 100%;
  gap: 1rem;
}

.image-item {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.image-item img {
  width: 100%;
  height: 10rem;
  object-fit: cover;
}

.index-badge {
  position: absolute;
  top: 5px;
  left: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 5px;
  font-size: 0.8rem;
  border-radius: 3px;
}

/* 🆕 Estilo del botón de eliminar */
.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-button:hover {
  background: rgba(255, 0, 0, 1);
}

.sortable-ghost {
  opacity: 0.4;
}
</style>