<template>
    <div class="chat">
        <div class="header">

        </div>
        <div class="content">
            <div class="message" v-for="item in messages" :key="item">
                <BuyerMessage v-if="item.agent === 'buyer'" :content="item.content" />
            </div>
        </div>
        <div class="footer">

        </div>

    </div>
</template>

<script setup>
import gql from 'graphql-tag'
import BuyerMessage from '@/views/order/BuyerMessage.vue'
import { useSubscription } from "@vue/apollo-composable"
import { watch, ref, onBeforeUnmount, inject } from "vue"

const { setupAudio } = inject('utils');

const { playNotification } = setupAudio();

const { result, onError } = useSubscription(gql`
      subscription newMessages{
         newMessages {
          id
          agent
          content
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

const messages = ref([
    { id: '0', agent: 'seller', content: 'Message 1' }])

const unwatchChat = watch(
    result,
    data => {
        console.log("New message received:", data.newMessages);

        messages.value.push(data.newMessages)

        //playNotification()
    },
    {
        lazy: false
    }
)

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