<template>
    <div class="chat">
        x
    </div>
</template>

<script setup>
import gql from 'graphql-tag'
import { useSubscription } from "@vue/apollo-composable"
import { watch } from "vue"

const { result, onError } = useSubscription(gql`
      subscription newMessages{
         newMessages {
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

watch(
    result,
    data => {
        console.log("New message received:", data.newMessages)
    },
    {
        lazy: true // Don't immediately execute handler
    }
)

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