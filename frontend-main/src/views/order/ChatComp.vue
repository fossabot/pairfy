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
            playNotification()
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
    height: 700px;
    background: var(--background-c);
    border: 2px solid var(--border-b);
    border-radius: 20px;
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
    height: 100px;
    background: rgba(255, 0, 0, 0.062);
}
</style>