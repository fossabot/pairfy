<template>
    <div class="carpet flex">

        <div class="body">
            <div class="tabs flex">
                <div class="tab flex" v-for="(item, index) in props.tabs" :key="item"
                    :class="{ enabled: activeTab === index }" @click="onSelect(index)">

                    <div class="icon flex">
                        <slot :name="`icon-${index}`"/>
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
    border-radius: var(--radius-b);
    overflow: hidden;
    transition: 0.2s;
    width: 100%;
}

.body {

    flex-direction: column;
    padding: 0.25rem;
    width: inherit;
    display: flex;
}

.tab {
    border-top-right-radius: var(--radius-b);
    border-top-left-radius: var(--radius-b);
    background: rgb(255 255 255 / 50%);
    font-size: var(--text-size-1);
    justify-content: flex-start;
    font-weight: 600;
    cursor: pointer;
    margin-left: 0.75rem;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--border-a);
    border-bottom: none;
    backdrop-filter: blur(12px);
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