<template>
    <div class="chat">
        <div class="header">

        </div>
        <div class="content" id="scrollable">
            <div class="message" v-for="(item, index) in messages" :key="index" :id="`m-${index}`">
                <BuyerMessage v-if="item.agent === 'buyer'" :data="item" />
                <SellerMessage v-if="item.agent === 'seller'" :data="item" />
            </div>
        </div>
        <div class="footer">
            <div class="footer-top flex">
                <button class="flex">
                    <i class="pi pi-image" />
                </button>
            </div>

            <div class="footer-bottom flex">
                <Textarea class="chat-input" id="chatInput" unstyled rows="1" cols="30" v-model="chatInput" autoResize
                    @keydown="handleEnter" placeholder="Chat with the other party..." />

                <div class="chat-send flex">
                    <i class="pi pi-send" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gql from 'graphql-tag'
import BuyerMessage from '@/views/order/BuyerMessage.vue'
import SellerMessage from '@/views/order/SellerMessage.vue'
import { useSubscription } from "@vue/apollo-composable"
import { watch, ref, onBeforeUnmount, inject, nextTick, onMounted, onUnmounted } from "vue"

const { setupAudio } = inject('utils');

const { playNotification } = setupAudio();

const userViewing = ref(true);

const chatInput = ref("");

const { result, onError } = useSubscription(gql`
      subscription newMessages{
         newMessages {
          id
          agent
          content
          seen
          created_at
        }
      }
    `,

    null,
    {
        clientId: "chat"
    }

)


onError((error, context) => {
    console.error(error, context)
})

const messages = ref([])

const unwatchChat = watch(
    result,
    data => {
        console.log("New message received:", data.newMessages);

        messages.value.push(data.newMessages);

        scrollToBottom();

        if (!userViewing.value) {
            //playNotification()
            document.title = `${document.title} | New Message`;
        }

    },
    {
        lazy: false
    }
)

function scrollToBottom() {
    nextTick(() => {
        const element = document.getElementById(`m-${messages.value.length - 1}`);

        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end" });
        }

    })
}

function handleVisibilityChange() {
    if (document.hidden) {
        userViewing.value = false;
    } else {
        userViewing.value = true;
    }
};

const handleEnter = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        const textarea = document.getElementById('chatInput');
        const cursorPos = textarea.selectionStart;
        chatInput.value =
            chatInput.value.slice(0, cursorPos) +
            '\n' +
            chatInput.value.slice(cursorPos);

        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
        });
    } else if (event.key === 'Enter') {
        event.preventDefault();
        console.log(chatInput.value);
        chatInput.value = ""
    }
};

onMounted(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeUnmount(() => {
    unwatchChat()
})
</script>

<style lang="css" scoped>
.chat {
    width: 100%;
    min-height: 700px;
    background: var(--background-c);
    border: 2px solid var(--border-b);
    border-radius: 20px;
    overflow: hidden;
    transition: 0.2s;
}

.content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 500px;
    font-size: var(--text-size-1);
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

.content::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.content::-webkit-scrollbar-thumb {
    background-color: var(--text-b);
    border-radius: 2px;
}

.content::-webkit-scrollbar-thumb:hover {
    background-color: #ffffff;
}

.content::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
}

.header {
    height: 100px;
    border-bottom: 1px solid var(--border-b);
}

.footer {
    border-top: 1px solid var(--border-b);
    width: inherit;
}

.footer-top {
    padding-top: 1rem;
    padding-left: 1rem;
    padding-bottom: 0;
}

.footer-top button {
    background: transparent;
    border: none;
    color: var(--text-w);
    justify-content: center;
    cursor: pointer;
}

.footer-bottom {
    width: inherit;
    padding: 1rem;
}

.chat-input {
    padding: 0.75rem;
    outline: none;
    color: inherit;
    font-family: inherit;
    font-size: var(--text-size-1);
    transition: 0.2s;
    max-height: 100px;
    border: 1px solid var(--border-b);
    border-radius: 8px;
    background: color-mix(in srgb, black, transparent 90%);
    resize: none;
    width: inherit;
}

.chat-input:focus-within {
    border: 1px solid var(--primary-b);
}

.chat-input textarea::placeholder {
    color: var(--text-b);
}

.chat-send {
    justify-content: center;
    width: 60px;
    height: inherit;
    cursor: pointer;
}

.chat-send i {
    color: var(--text-w);
    font-size: var(--text-size-3);
    transform: rotate(45deg);

}
</style>