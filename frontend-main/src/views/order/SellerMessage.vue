<template>
    <div class="message">
        <div class="bubble" v-tooltip.right="date">
            {{ props.data.content }}          
        </div>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';

const { convertDate } = inject('utils');

const date = computed(() => convertDate(props.data.created_at, 2))

const props = defineProps(['data'])


</script>

<style lang="css" scoped>
.message {
    display: flex;
    justify-content: flex-start;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.bubble {
    padding: 1rem;
    border-radius: 12px;
    border-bottom-left-radius: 0px;
    background: color-mix(in srgb, black, transparent 80%);
    position: relative;
    box-sizing: border-box;
}

.marker {
    font-size: var(--text-size-0);
    position: absolute;
    bottom: 0px;
    color: var(--text-b);
}

.marker.seen {
    color: var(--primary-c);
}
</style>