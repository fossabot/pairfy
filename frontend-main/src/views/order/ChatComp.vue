<template>
    <div class="chat">
        <div class="header">

        </div>
        <div class="content" id="scrollable">
            <div class="message" v-for="(item, index) in messageList" :key="index" :id="`m-${index}`">
                <MyMessage v-if="currentAgent === item.agent" :data="item" />
                <PartyMessage v-if="currentAgent !== item.agent" :data="item" />
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
import orderAPI from '@/views/order/api/index'
import MyMessage from '@/views/order/MyMessage.vue'
import PartyMessage from '@/views/order/PartyMessage.vue'
import { useSubscription, useMutation, useQuery } from "@vue/apollo-composable"
import { computed, watch, ref, onBeforeUnmount, inject, nextTick, onMounted, onUnmounted } from "vue"
import headerAPI from '@/components/header/api'

const { getCurrentSeller, getCurrentUser } = headerAPI();

const currentAgent = computed(() => {
    return getCurrentSeller.value?.id || getCurrentUser.value?.pubkeyhash
})

const { getOrderData } = orderAPI();

const { setupAudio } = inject('utils');

const { playNotification } = setupAudio();

const userViewing = ref(true);

const chatInput = ref("");

const messageList = ref([]);


///////////////////////////////////////////////////////////////////////////////////////////////

const getMessagesVariables = ref({
    "getMessagesVariables": {
        session: "1907728b2d0dc51df7cef8001246803d1eb9c36e3411e62343d823a7:746bff9fb367bf3bb1b25fe24a272bb288d62a2cad1aad2e37a8173f:687609784237305307",
    }

})

const { result: onGetMessagesResult } = useQuery(gql`
      query getMessages($getMessagesVariables: GetMessagesInput!) {
        getMessages(getMessagesInput: $getMessagesVariables) {
          id
          agent
          role
          content
          seen
          created_at
        }
      }
    `,
    getMessagesVariables,
    {
        clientId: 'chat'
    })


watch(onGetMessagesResult, value => {
    messageList.value.push(...value.getMessages);
    scrollToBottom();
})

///////////////////////////////////////////////////////////////////////////////////////////////

const { result: onNewMessagesResult, onError: onNewMessagesError } = useSubscription(gql`
      subscription newMessages($orderId:  ID!){
         newMessages(order_id: $orderId) {
          id
          agent
          role
          content
          seen
          created_at
        }
      }
    `,

    () => ({
        orderId: "1907728b2d0dc51df7cef8001246803d1eb9c36e3411e62343d823a7"
    }),
    {
        clientId: "chat",
        enabled: true
    }

)


onNewMessagesError((error, context) => {
    console.error(error, context)
})

const unwatchChat = watch(
    onNewMessagesResult,
    data => {
        console.log("New message received:", data.newMessages);

        messageList.value.push(data.newMessages);

        scrollToBottom();

        if (!userViewing.value) {
            //playNotification()
            document.title = `${document.title} | New Message`;
        }

    },
    {
        lazy: true
    }
)


///////////////////////////////////////////////////////////////////////////////////////////////

const { mutate: createMessage, onDone: onCreateMessageDone } = useMutation(gql`
  mutation createMessage ($createMessageVariable: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageVariable) {
      success
    }
  }
`,
    {
        clientId: "chat"
    })


onCreateMessageDone(() => {
    console.log(chatInput.value);
    chatInput.value = ""
})

const sendMessage = () => {
    createMessage({
        "createMessageVariable": {
            session: getOrderData.value?.session,
            content: chatInput.value
        }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////

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
        sendMessage()
    }
};

function scrollToBottom() {
    nextTick(() => {
        const element = document.getElementById(`m-${messageList.value.length - 1}`);

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