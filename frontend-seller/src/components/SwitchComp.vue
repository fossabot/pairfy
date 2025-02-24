<template>
    <button :aria-checked="isChecked" :aria-disabled="disabled" role="switch" class="switch"
        :class="{ 'switch-on': isChecked, disabled }" @click="toggle" @keydown.space.prevent="toggle">
        <span class="switch-thumb"></span>
    </button>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    modelValue: Boolean,
    disabled: Boolean
});

const emit = defineEmits(["onPaused"]);

const isChecked = ref(props.modelValue);

const toggle = () => {
    if (props.disabled) {
        return;
    }

    isChecked.value = !isChecked.value;

    emit("onPaused")
};
</script>

<style lang="css" scoped>
.switch {
    background: rgba(0, 0, 0, 0.2);
    transition: background 0.3s;
    justify-content: flex-start;
    border-radius: 99px;
    align-items: center;
    position: relative;
    padding: 0.25rem;
    height: 1.5rem;
    cursor: pointer;
    outline: none;
    display: flex;
    border: none;
    width: 2.5rem;
}

.switch-on {
    background: var(--primary-a);
}

.switch-thumb {
    width: 1rem;
    height: 1rem;
    background: var(--background-a);
    border-radius: 50%;
    transition: transform 0.3s;
    transform: translateX(0);
}

.switch-on .switch-thumb {
    transform: translateX(1rem);
}

.disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>