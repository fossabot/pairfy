<template>
    <div class="menu">
        <ButtonRounded @click="onClick" ref="overlayRef">
            <template #content>
                <i class="pi pi-ellipsis-v" />
            </template>
        </ButtonRounded>
        <div class="overlay" v-if="visible">
            <div class="overlay-item flex" v-for="item in props.value" :key="item.label"
                @click="onSelected(item.value)">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonRounded from '@/components/ButtonRounded.vue';
import { onClickOutside } from "@vueuse/core";
import { ref } from 'vue';

const props = defineProps(['value'])

const emit = defineEmits(['onSelected']);

const visible = ref(false);

const onClick = () => {
    visible.value = true
}

const overlayRef = ref(null);

onClickOutside(overlayRef, () => {
    visible.value = false;
});

const onSelected = (value) => {
    emit('onSelected', value)
}
</script>

<style lang="css" scoped>
.menu {
    position: relative;
}

.overlay {
    border: 1px solid var(--border-a);
    background: var(--background-a);
    box-shadow: var(--shadow-c);
    position: absolute;
    min-height: 100px;
    min-width: 100px;
    right: 0;
    z-index: 2;
    top: 40px;
    border-radius: 6px;
}

.overlay-item {
    padding: 1rem;
    cursor: pointer;
    white-space: nowrap;
    font-size: var(--text-size-0);
}

.overlay-item:hover {
    background: var(--background-b);
}
</style>