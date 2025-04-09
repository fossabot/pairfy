<template>
    <div class="p-InputPassword">
        <p class="title-text">Password</p>
        <div class="input-wrapper">
            <input ref="inputRef" :type="isVisible ? 'text' : 'password'" :value="modelValue" @input="onInput"
                placeholder="Enter your password" class="p-InputPassword-input"
                :class="{ 'is-invalid': errorMessage }" />
            <button type="button" class="toggle-btn" @click="toggleVisibility">
                {{ isVisible ? '🙈' : '👁️' }}
            </button>
        </div>
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

const emit = defineEmits(['update:modelValue', 'valid'])

const inputRef = ref(null)
const isVisible = ref(false)
const errorMessage = ref('')


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/

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

const toggleVisibility = () => {
    isVisible.value = !isVisible.value
}

const onInput = (e) => {
    const value = e.target.value
    emit('update:modelValue', value)
    validatePassword(value)
}

const validatePassword = (password) => {
    if (!password) {
        errorMessage.value = 'Password is required.'
        emit('valid', false)
        return false
    } else if (password.length < 8) {
        errorMessage.value = 'Password must be at least 8 characters.'
        emit('valid', false)
        return false
    } else if (password.length > 64) {
        errorMessage.value = 'Password must be no more than 64 characters.'
        emit('valid', false)
        return false
    } else if (!passwordRegex.test(password)) {
        errorMessage.value = 'Password must include uppercase, lowercase, number, and symbol.'
        emit('valid', false)
        return false
    }

    errorMessage.value = ''
    emit('valid', true)
    return true
}


</script>

<style scoped>
.p-InputPassword {
    display: flex;
    flex-direction: column;
    max-width: 300px;
}

.input-wrapper {
    position: relative;
}

.p-InputPassword-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 1px solid var(--border-a);
    border-radius: var(--input-radius);
    outline: none;
    box-sizing: border-box;

}

.p-InputPassword-input:focus-within {
    border: 1px solid var(--primary-a);
}

.p-InputPassword-input.is-invalid {
    border-color: red;
}

.toggle-btn {
    position: absolute;
    top: 50%;
    right: 0.75rem;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
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