<template>
    <div class="p-InputEmail">
        <p class="title-text">Email</p>
        <input ref="inputRef" type="email" :value="modelValue" @input="onInput" placeholder="example@gmail.com"
            class="p-InputEmail-input" :class="{ 'is-invalid': errorMessage }" />
        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    focus: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)
const errorMessage = ref('')

const emailRegex = /^(?=.{1,254}$)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

onMounted(() => {
    if (props.focus) {
        inputRef.value?.focus()
    }
})

watch(() => props.focus, (newVal) => {
    if (newVal) {
        inputRef.value?.focus()
    }
})

const onInput = (e) => {
    const value = e.target.value
    emit('update:modelValue', value)
    validateEmail(value)
}

const validateEmail = (email) => {
    if (!email) {
        errorMessage.value = 'Email is required.'
    }

    else if (email.length > 254) {
        errorMessage.value = 'Email max length.'
    }

    else if (!emailRegex.test(email)) {
        errorMessage.value = 'The email is not valid.'
    } else {
        errorMessage.value = ''
    }
}

watch(() => props.modelValue, (val) => {
    validateEmail(val)
}, { immediate: true })
</script>

<style scoped>
.p-InputEmail {
    display: flex;
    flex-direction: column;
    max-width: 300px;
}

.p-InputEmail-input {
    border: 1px solid var(--border-a);
    border-radius: var(--input-radius);
    padding: 0.75rem 1rem;
    outline: none;
}

.p-InputEmail-input:focus-within {
    border: 1px solid var(--primary-a);
}

.p-InputEmail-input.is-invalid {
    border-color: red;
}

.title-text {
    font-size: var(--text-size-1);
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.error-text {
    font-size: var(--text-size-0);
    margin-top: 0.5rem;
    color: red;
}
</style>