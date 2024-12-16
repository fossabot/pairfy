<template>
    <div class="notification">
        <OverlayBadge value="1" severity="danger" @click="toggle" id="notifications">
            <div class="button flex">
                <i class="pi pi-bars" />
                <audio src="@/assets/notification.mp3" muted="false" preload="auto"></audio>
            </div>
        </OverlayBadge>
        <Popover ref="op">
            <div class="drop">
                <div class="drop-item" v-for="item in notificationArray" :key="item">
                    <OverlayBadge value="" severity="danger">
                        <div class="drop-image" @click="onHandleClick(item)">
                            <i class="pi pi-shopping-cart" />
                        </div>
                    </OverlayBadge>
                    <div class="drop-box" @click="onHandleClick(item)">
                        <div class="drop-title">
                            {{ item.title }}

                            <span>{{ getTimeAgo(item.created_at) }}</span>
                        </div>
                        <div class="drop-message" @click="onHandleClick(item)">
                            {{ item.message }}
                        </div>

                        <div class="drop-pad">
                            <span>Mark as read</span>
                        </div>
                    </div>
                </div>
            </div>
        </Popover>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import notificationSound from '@/assets/notification.mp3';
import { ref, watch, computed, onMounted, nextTick } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { format } from 'timeago.js';

const router = useRouter();

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
            notificationList.value.add(element);
            playNotification();
        }
    })
});

onGetNotificationsError(error => {
    console.log(error)
})

//////////////////////////////////////////////////////////////////////////////

const getTimeAgo = (createdAt) => format(createdAt, 'en_US')


const onHandleClick = (notification) => {
    if (!notification) {
        return;
    }

    const { type, data } = notification;

    const datum = JSON.parse(data);

    if (type === 'order') {
        console.log(notification);

        router.push({
            name: 'order',
            params: {
                id: datum.threadtoken
            }
        })
            .then(() => window.location.reload())
            .catch((err) => {
                if (err.name !== 'NavigationDuplicated') {
                    console.error(err);
                }
            });
    }
}

onMounted(async () => {

    await nextTick();

    const div = document.getElementById('notifications');

    if (div) {
        div.click();
    }
})

//////////////////////////////////////////////////////////////////////////////

function setupAudio() {
    const audio = ref(new Audio(notificationSound));

    audio.muted = false;

    audio.volume = 0.9;

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
}

.button i {
    font-size: var(--text-size-c);
}

.drop {
    width: 300px;
    word-break: break-all;
}

.drop-item {
    border-bottom: 1px solid var(--border-a);
    display: flex;
    padding: 1rem 0;
}

.drop-image {
    width: 50px;
    height: 50px;
    background: var(--background-b);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
}

.drop-image i {
    font-size: 25px;
}

.drop-box {
    display: block;
    margin-left: 1rem;
}

.drop-title {
    font-weight: 700;
    text-align: start;
    font-size: var(--text-size-a);
    cursor: pointer;
}

.drop-title span {
    font-weight: 400;
    margin-left: 0.5rem;
}

.drop-message {
    text-align: left;
    margin-top: 0.25rem;
    font-size: var(--text-size-a);
    cursor: pointer;
}

.button {
    color: var(--text-w);
}

.drop-pad {
    margin-top: 0.5rem;
    cursor: default;
}

.drop-pad span {
    background: var(--background-b);
    font-size: var(--text-size-a);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
   
}
</style>