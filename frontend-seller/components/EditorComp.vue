<template>
    <div class="editor" :class="{ invalid: false }" v-if="editor">
        <div class="editor-control">
            <div class="editor-control-group">
                <button @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linejoin="round"
                            d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
                    </svg>
                </button>

                <button @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" />
                    </svg>
                </button>

                <button @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617M3.75 12h16.5" />
                    </svg>
                </button>
            </div>

            <div class="editor-control-group">
                <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25" />
                    </svg>

                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21.75 19.5H16.5v-1.609a2.25 2.25 0 0 1 1.244-2.012l2.89-1.445c.651-.326 1.116-.955 1.116-1.683 0-.498-.04-.987-.118-1.463-.135-.825-.835-1.422-1.668-1.489a15.202 15.202 0 0 0-3.464.12M2.243 4.492v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501" />
                    </svg>

                </button>

                <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M20.905 14.626a4.52 4.52 0 0 1 .738 3.603c-.154.695-.794 1.143-1.504 1.208a15.194 15.194 0 0 1-3.639-.104m4.405-4.707a4.52 4.52 0 0 0 .738-3.603c-.154-.696-.794-1.144-1.504-1.209a15.19 15.19 0 0 0-3.639.104m4.405 4.708H18M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501" />
                    </svg>
                </button>
            </div>

            <div class="editor-control-group">
                <button @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                </button>
                <button @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                    </svg>
                </button>
            </div>

            <span class="editor-control-counter">
                {{ productEditorCounter }} / {{ editorLimit }}
            </span>
        </div>

        <div class="editor-content">

            <div class="editor-content-ai">
                <textarea id="editor-content-ai" v-model="editorAiContent" placeholder="Write everything about the product..." rows="4"></textarea>
            </div>

            <editor-content :editor="editor" />
        </div>

    </div>
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Editor, EditorContent } from '@tiptap/vue-3';

const editor = ref(null);

const editorLimit = ref(6000);

const setupEditor = async () => {
    await nextTick(() => {
        editor.value = new Editor({
            extensions: [
                StarterKit,
                Placeholder.configure({
                    placeholder: 'Output',
                }),
                CharacterCount.configure({
                    limit: editorLimit.value,
                }),
                TextStyle.configure({ types: [ListItem.name] }),
            ],
            editorProps: {
                attributes: {
                    class: 'editor-class',
                },
            },
            content: ``,
        })
    });
}

const editorAiContent = ref('')

const productEditorCounter = computed(() => {
    if (editor) {
        return editor.value?.storage.characterCount.characters()
    } else {
        return 0
    }
})

const productFeatures = computed(() => JSON.stringify(editor.value.getJSON()))

onMounted(() => {
    setupEditor();
})

onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy();
    }
});

</script>

<style scoped>
::v-deep(.editor-class) {
    font-size: var(--text-size-1);
    box-sizing: border-box;
    word-break: break-word;
    color: var(--text-a);
    overflow-y: scroll;
    height: auto;
    max-height: 90%;
    padding: 1rem;
    outline: none;

}

::v-deep(.editor-class::-webkit-scrollbar) {
    width: 13px;
}

::v-deep(.editor-class::-webkit-scrollbar-track) {
    background: transparent;
}

::v-deep(.editor-class::-webkit-scrollbar-thumb) {
    background-color: #888;
    border-radius: 4px;
    border: 2px solid #f1f1f1;
    cursor: pointer;
}

::v-deep(.editor-class::-webkit-scrollbar-thumb:hover) {
    background-color: #3b3b3b;
}

::v-deep(.is-editor-empty:first-child::before) {
    color: var(--text-b);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}

.editor {
    border: 1px solid var(--border-a);
    border-radius: var(--radius-b);
    overflow: hidden;
    display: block;
    height: 700px;
    max-height: 700px;
    width: 100%;
    position: relative;
}

.editor-content {
    display: grid;
    grid-template-rows: calc(150px + 2rem) 500px;
    grid-template-columns: 1fr;
    gap: 10px;
    height: 100%;
}

.editor-content-ai {
    border-bottom: 1px solid var(--border-a);
    display: flex;
    padding: 1rem;
}

.editor-content-ai textarea {
    border: 1px solid var(--border-a);
    background: var(--background-b);
    border-radius: var(--radius-c);
    font-size: var(--text-size-1);
    font-family: inherit;
    padding: 1rem;
    outline: none;
    resize: none;
    width: 100%;
}

.editor-content-ai textarea::placeholder {
    color: #999;
}

.editor-content-ai textarea:focus {
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
    border-color: var(--primary-a);
}

.editor-control {
    border-bottom: 1px solid var(--border-a);
    background: var(--background-a);
    align-items: center;
    position: sticky;
    padding: 0.5rem;
    display: flex;
    top: 0;
}

.editor-control-group {
    display: flex;
    margin-right: 1rem
}

.editor-control button {
    border: 1px solid var(--border-a);
    border-radius: var(--radius-b);
    background: transparent;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-b);
    margin-right: 0.5rem;
    cursor: pointer;
}

.editor-control button svg {
    width: var(--text-size-2);
    height: var(--text-size-2);
}

.editor-control button.is-active {
    border: 1px solid gray;
}

.editor-control-counter {
    font-size: var(--text-size-1);
    color: var(--text-b);
}


.invalid {
    border: 1px solid red;
    border-radius: 5px 5px 0 0;
}
</style>