<template>
    <div class="chat">
        {{ messages }}
    </div>
</template>

<script setup>
import gql from 'graphql-tag'
import { useSubscription } from "@vue/apollo-composable"
import { watch, ref, onBeforeUnmount } from "vue"

const { result, onError } = useSubscription(gql`
      subscription newMessages{
         newMessages {
          id
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

const messages = ref([])

const unwatchChat = watch(
    result,
    data => {
        console.log("New message received:", data.newMessages);

        messages.value.push(data.newMessages)
    },
    {
        lazy: true // Don't immediately execute handler
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
</style>