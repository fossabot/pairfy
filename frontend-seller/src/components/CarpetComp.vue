<template>
    <div class="carpet flex">

        <div class="body">
            <div class="tabs flex">
                <div class="tab flex" v-for="(item, index) in props.tabs" :key="item"
                    :class="{ enabled: activeTab === index }" @click="onSelect(index)">

                    <div class="icon flex">
                        <i class="pi" :class="props.icons[index]" />
                    </div>
                    <span> {{ item }}</span>
                </div>
            </div>
       
            <slot name="content" :index="activeTab"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(['tabs', 'icons'])

const activeTab = ref(0);

const onSelect = (index) => {
    activeTab.value = index;
}
</script>

<style lang="css" scoped>
.carpet {
    border: 1px solid var(--border-a);
    border-radius: var(--radius-b);
    overflow: hidden;
    transition: 0.2s;
    width: 100%;
}

.body {
    background: var(--background-c);
    flex-direction: column;
    padding: 0.25rem;
    width: inherit;
    display: flex;
}

.tab {
    background: var(--background-b);
    font-size: var(--text-size-1);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    justify-content: flex-start;
    box-shadow: var(--shadow-a); 
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-left: 0.75rem;
    padding: 0.75rem 1rem;
}

.tab.enabled {
    background: var(--background-a);
    color: var(--primary-a);
}

.content {
    min-height: 100vh;
    background: var(--background-a);
}

.icon {
    justify-content: center;
    margin-right: 0.5rem;
}

.icon i {
    font-size: var(--text-size-3);
}
</style>