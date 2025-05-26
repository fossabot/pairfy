<template>
    <div class="FolderComp flex">

        <div class="body">
            <div class="tabs flex">
                <div class="tab flex" v-for="(item, index) in props.tabs" :key="item"
                    :class="{ enabled: activeTab === index }" @click="onSelect(index)">

                    <div class="icon flex">
                        <slot :name="`icon-${index}`" />
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

const props = defineProps(['tabs'])

const activeTab = ref(0);

const onSelect = (index) => {
    activeTab.value = index;
}
</script>

<style lang="css" scoped>
.FolderComp {
    width: inherit;
    overflow: hidden;
    max-width: var(--body-a);
    transition: var(--transition-a);
    border-radius: var(--radius-b);
}

.body {
    flex-direction: column;
    width: inherit;
    display: flex;
}

.tab {
    border-top-right-radius: var(--radius-b);
    border-top-left-radius: var(--radius-b);
    border: 1px solid var(--border-a);
    transition: var(--transition-a);
    font-size: var(--text-size-1);
    backdrop-filter: blur(12px);
    justify-content: flex-start;
    border-bottom: none;
    font-weight: 600;
    cursor: pointer;
    margin-left: 0.75rem;
    padding: 0.75rem 1.5rem;

}

.tab:hover {
    color: var(--primary-a);
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
</style>