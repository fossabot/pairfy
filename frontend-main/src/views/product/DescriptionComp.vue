<template>
    <div>
        <div class="title">Description</div>
        <Skeleton v-if="!getProductData" width="100%" height="500px" />
        <editor-content v-if="getProductData" :editor="editor" />
    </div>
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import productAPI from '@/views/product/api/index';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { onMounted, ref, onBeforeUnmount, watch } from 'vue';

const { getProductData } = productAPI();

const editor = ref(null);

const setupEditor = async () => {
    editor.value = new Editor({
        editable: false,
        extensions: [
            StarterKit,
            TextStyle.configure({ types: [ListItem.name] }),
        ],
        editorProps: {
            attributes: {
                class: 'editor-class',
            },
        },
        content: "",
    })

    if (getProductData.value) {
        const features = JSON.parse(getProductData.value.features);

        editor.value.commands.setContent(features);
    }


}

const unwatchData = watch(getProductData, async (value) => {
    if (value) {
        const features = JSON.parse(value.features);

        if (editor.value) {

            editor.value.commands.setContent(features);
        }
    }

}, { immediate: true })


onMounted(() => {
    setupEditor();
})

onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy()
    }

    unwatchData()
})


</script>

<style lang="css" scoped>
::v-deep(.editor-class) {
    line-height: 2rem;
    font-size: var(--text-size-1);
}

.title {
    font-size: var(--text-size-c);
    font-weight: 600;
    line-height: 4rem;
}

/* Default styles apply to all devices */

/* Small phones (up to 480px) */
@media (max-width: 480px) {
    ::v-deep(.editor-class) {
        padding: 0 1rem; 
    }

    .title{
        padding: 0 1rem; 
        line-height: 3rem;
    }
}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
    /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
    /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
    /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
    /* Styles for large screens */
}
</style>