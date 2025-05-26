<template>
    <div class="SearchPrompt flex center">
        <form class="SearchPrompt-form" @submit.prevent="submitPrompt">
            <div class="SearchPrompt-input flex">
                <textarea v-model="prompt" aria-label="Prompt" @keydown.enter.exact.prevent="submitPrompt" rows="1"
                    @focus="onFocusOrClick" @click="onFocusOrClick" placeholder="Search for what you want" />
            </div>
            <button class="send-button flex center" type="submit" :disabled="isSubmitting || !prompt.trim()"
                title="Enviar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-arrow-up-icon lucide-arrow-up">
                    <path d="m5 12 7-7 7 7" />
                    <path d="M12 19V5" />
                </svg>
            </button>
        </form>
    </div>
</template>

<script setup>
const prompt = ref('')

const isSubmitting = ref(false)

const typedPlaceholder = ref('asdsdasd')

function submitPrompt() {
    const trimmed = prompt.value.trim()
    if (!trimmed) return

    isSubmitting.value = true

    setTimeout(() => {
        prompt.value = ''
        isSubmitting.value = false
    }, 1000)
}

</script>
<style scoped>
.SearchPrompt {
    width: 100%;
    box-sizing: border-box;
}

.SearchPrompt-form {
    width: inherit;
    display: flex;
    padding: 1rem;
    margin-top: 4rem;
    max-width: 800px;
    margin: 2rem auto;
    position: relative;
    align-items: center;
    box-sizing: border-box;
    background: transparent;
    box-shadow: var(--shadow-a);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: var(--radius-d);
    transition: var(--transition-a);
}

.SearchPrompt-form:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.SearchPrompt-input {
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;
}

.SearchPrompt-input textarea {
    z-index: 2;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    height: 4rem;
    line-height: 1.5rem;
    position: relative;
    color: var(--text-a);
    background: transparent;
    font-size: var(--text-size-2);
}

.SearchPrompt-input textarea::placeholder {
    color: var(--text-b);
    font-size: inherit;
    opacity: 0.6;
}


.send-button {
    background: black;
    color: var(--text-w);
    border: none;
    width: 36px;
    height: 36px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.2s ease;
}

.send-button:hover {
    background: #333;
}

.send-button:disabled {
    background: black;
    pointer-events: none;
}
</style>