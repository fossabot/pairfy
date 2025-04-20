<template>
  <div class="p-ProductDiscountComp">
    <label class="title-text">{{ label }}</label>


    <div class="discount-toggle">
      <label class="switch">
        <input type="checkbox" v-model="enabled" />
        <span class="slider" />
      </label>
    </div>

    <Transition name="fade">
      <div v-if="enabled" class="input-group">
        <label for="discount" class="label-small">Discount (%)</label>
        <input id="discount" type="number" min="1" max="100" step="1" v-model.number="discountPercent"
          class="discount-input" placeholder="e.g. 25" @keydown.prevent />
      </div>
    </Transition>

    <div v-if="enabled" class="final-price">
      Final Price:
      <span class="final-price-value">${{ discountedPrice.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, default: 'Enabled' },
  modelValue: { type: Object as () => { enabled: boolean; price: number; discount: number }, required: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: { enabled: boolean; price: number; discount: number }): void
}>()

const enabled = ref(props.modelValue.enabled)
const originalPrice = ref(props.modelValue.price)
const discountPercent = ref(props.modelValue.discount)

watch([enabled, originalPrice, discountPercent], () => {
  emit('update:modelValue', {
    enabled: enabled.value,
    price: originalPrice.value,
    discount: discountPercent.value,
  })
})

const discountedPrice = computed(() => {
  if (!enabled.value || !originalPrice.value || !discountPercent.value) return originalPrice.value || 0
  return originalPrice.value * (1 - discountPercent.value / 100)
})
</script>

<style scoped>
.p-ProductDiscountComp {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.title-text {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.discount-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 26px;
  transition: 0.3s;
}

.slider::before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}

.switch input:checked+.slider {
  background-color: var(--primary-a, #2563eb);
}

.switch input:checked+.slider::before {
  transform: translateX(22px);
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.label-small {
  font-size: var(--text-size-1);
  font-weight: 500;
  margin: 0.75rem 0;
}

.price-input,
.discount-input {
  border: 1px solid var(--border-a, #ccc);
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  background: white;
  outline: none;
  width: 100%;
}

.final-price {
  font-size: var(--text-size-);
  margin-top: 0.75rem;
  font-weight: 500;
}

.final-price-value {
  font-weight: 700;
  color: var(--primary-a, #2563eb);
  margin-left: 0.25rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>
