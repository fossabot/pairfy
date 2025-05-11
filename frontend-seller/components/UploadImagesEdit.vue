<template>
  <div class="uploader">
    <ToastComp ref="toastRef" />
    <input type="file" ref="fileInput" multiple accept="image/jpeg,image/png,image/webp,image/avif"
      style="display: none" @change="onFilesSelected" />

    <div class="header" v-show="images.length">
      <div class="counter">
        <span :style="{ color: !images.length ? 'red' : 'black' }">
          {{ images.length }}
        </span>
        <span>{{ ` / ${maxImages}` }}</span>
      </div>
    </div>

    <div class="empty-template" v-if="!images.length">
      <button class="upload-button" @click="triggerFileInput" :disabled="images.length >= maxImages">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload-icon lucide-upload">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      </button>
    </div>

    <div class="image-grid" ref="grid" v-show="images.length">
      <div class="image-item" v-for="(img, index) in images" :key="img.id">
        <img :src="img.local ? img.url : useMediaUrl(img.resolutions.large)" alt="uploaded image" />
        <button class="delete-button" @click="removeImage(img.id)">✖</button>
        <span class="index-badge">{{ index + 1 }}</span>
        <span v-if="img.local" class="local-label">Local</span>
        <span v-if="img.deleted" class="deleted-label">Deleted</span>
      </div>

      <div class="image-item no-drag" data-nodrag>
        <button class="upload-button" @click="triggerFileInput" :disabled="images.length >= maxImages">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-plus-icon lucide-plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from 'vue';
import Sortable from 'sortablejs';

const toastRef = ref<any>(null);

const displayMessage = (message: any, type: string) => {
  toastRef.value?.showToast(message, type)!
}

interface UploadedImg {
  id: string;
  file: File;
  url: string;
  resolutions: {
    large: string;
    small: string;
    medium: string;
    thumbnail: string;
  };
  local?: boolean;
  deleted?: boolean;
}

const props = defineProps({
  modelValue: {
    type: Array as () => UploadedImg[],
    required: true
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: UploadedImg[]): void;
}>();

const maxImages = 10;
const fileInput = ref<HTMLInputElement | null>(null);
const grid = ref<HTMLDivElement | null>(null);

const images = ref<UploadedImg[]>([...props.modelValue]);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onFilesSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  const availableSlots = maxImages - images.value.length;
  const filesToAdd = Array.from(files).slice(0, availableSlots);

  filesToAdd.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const newImage: UploadedImg = {
          id: crypto.randomUUID(),
          file,
          url: e.target?.result as string,  // Local file URL
          local: true
        };

        // Add the new image to the images array
        images.value.push(newImage);

        // Emit the updated images to update the parent v-model
        emit('update:modelValue', images.value);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
  target.value = '';
};

onMounted(() => {
  if (grid.value) {
    Sortable.create(grid.value, {
      animation: 200,
      ghostClass: 'sortable-ghost',
      draggable: '.image-item:not(.no-drag)',
      onEnd: (evt) => {
        if (evt.oldIndex === undefined || evt.newIndex === undefined || evt.oldIndex === evt.newIndex) {
          return;
        }

        const newOrder = Array.from(grid.value!.querySelectorAll('.image-item:not(.no-drag)')).map((child) => {
          const imgElement = child.querySelector('img') as HTMLImageElement;
          return images.value.find((img) => img.url === imgElement.src)?.id || '';
        });

        if (newOrder.includes('') || newOrder.length !== images.value.length) {
          displayMessage('❌ Inconsistent drag order: invalid image ID detected.', 'error');
          return;
        }

        images.value.sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
        emit('update:modelValue', images.value);
      }
    });
  }
});

const removeImage = (id: string) => {
  const image = images.value.find(img => img.id === id);
  if (image) {
    image.deleted = true;
    // Emit the updated images to update the parent v-model
    emit('update:modelValue', images.value);
  }
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
  justify-content: center;
  color: var(--text-b);
  align-items: center;
  cursor: pointer;
  display: flex;
  border: none;
  height: 100%;
  width: 100%;
}

.upload-button svg {
  width: 6rem;
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.counter {
  font-size: var(--text-size-0);
  color: var(--text-b);
  margin-left: 1rem;
}

.empty-template {
  align-items: center;
  height: 20rem;
  display: flex;
}

.image-grid {
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  border-top: 1px solid var(--border-a);
  box-sizing: border-box;
  min-height: 20rem;
  display: grid;
  padding: 1rem;
  width: 100%;
  gap: 1rem;
}

.image-item {
  border: 1px solid var(--border-a);
  border-radius: var(--radius-c);
  justify-content: center;
  align-items: center;
  position: relative;
  height: 10rem;
  overflow: hidden;
  display: flex;
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

.local-label, .deleted-label {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 5px;
  font-size: 0.8rem;
  border-radius: 3px;
}

.local-label {
  background: rgba(0, 255, 0, 0.7);
}

.deleted-label {
  background: rgba(255, 0, 0, 0.7);
}

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
