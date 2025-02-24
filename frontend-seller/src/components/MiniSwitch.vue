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
    border: 1px solid var(--border-a);
    background: var(--background-c);
    transition: background 0.3s;
    justify-content: flex-start;
    border-radius: 99px;
    align-items: center;
    position: relative;
    padding: 0.25rem;
    cursor: pointer;
    outline: none;
    display: flex;
    height: 1rem;
    width: 2rem;
}

.switch-on {
    background: var(--background-c);
}

.switch-thumb {
    width: 0.5rem;
    height: 0.5rem;
    background: var(--background-a);
    border-radius: 50%; 
    transition: transform 0.3s;
    transform: translateX(0);
    box-shadow: var(--shadow-b);
}

.switch-on .switch-thumb {
    transform: translateX(1rem);
}

.disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>