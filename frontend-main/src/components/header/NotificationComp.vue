<template>
    <div class="notification">
        <OverlayBadge value="1" severity="danger" @click="toggle">
            <div class="notification-button flex">
                <i class="pi pi-bars" />
                <audio src="@/assets/notification.mp3" muted="false" preload="auto"></audio>
            </div>
        </OverlayBadge>
        <Popover ref="op">
            <div class="notifications">
                {{ notificationArray }}
            </div>
        </Popover>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import notificationSound from '@/assets/notification.mp3';
import { ref, watch, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';

const op = ref(true);

const toggle = (event) => {
    op.value.toggle(event);
}
const { playNotification } = setupAudio();

const queryOptions = {
    pollInterval: 60000,
    clientId: 'notification'
}

const notificationList = ref(new Set());

const notificationArray = computed(() => Array.from(notificationList.value));

const { result: onGetNotification, onError: onGetNotificationsError } = useQuery(gql`
      query getNotifications {
        getNotifications {
            id
            type
            title
            owner
            seen
            data
            message
            created_at
        }
      }
`,
    null,
    queryOptions
);

watch(onGetNotification, value => {
    value.getNotifications.forEach((element) => {
        if (!notificationList.value.has(element.id)) {
            notificationList.value.add(element)
            playNotification();
        }
    })
});

onGetNotificationsError(error => {
    console.log(error)
})

function setupAudio() {
    const audio = ref(new Audio(notificationSound));

    audio.muted = false;

    audio.volume = 1.0;

    audio.value.load();

    const playNotification = () => {
        audio.value
            .play()
            .then(() => {
                console.log("Notification");
            })
            .catch((error) => {
                console.error("Unable to play sound:", error);
            });
    };

    return { playNotification };
}






</script>

<style lang="css" scoped>
.notification {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.notifications {
    width: 300px;
}
</style>