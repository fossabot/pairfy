<template>
    <div class="notification">
        <OverlayBadge value="1" severity="danger" @click="toggle" id="notifications">
            <div class="button flex">
                <i class="pi pi-bars" />
                <audio src="@/assets/notification.mp3" muted="false" preload="auto"/>
            </div>
        </OverlayBadge>
        <Popover ref="op">
            <section>
                <div class="nav">
                    <div class="nav-item" :class="{ selected: currentNav === 0 }" @click="currentNav = 0">
                        New
                    </div>
                    <div class="nav-item" :class="{ selected: currentNav === 1 }" @click="currentNav = 1">
                        Seen
                    </div>
                </div>

                <div class="drop" v-if="currentNav === 0">
                    <div class="empty-legend" v-if="!unseen.length"> <span>No news</span></div>
                    <div class="drop-item" v-for="item in unseen" :key="item">
                        <OverlayBadge value="" severity="danger">
                            <div class="drop-image" @click="onHandleClick(item)">
                                <i class="pi pi-shopping-cart" />
                            </div>
                        </OverlayBadge>
                        <div class="drop-box">
                            <div class="drop-title" @click="onHandleClick(item)">
                                {{ item.title }}

                                <span>{{ getTimeAgo(item.created_at) }}</span>
                            </div>
                            <div class="drop-message" @click="onHandleClick(item)">
                                {{ item.message }}
                            </div>

                            <div class="drop-pad" @click="handleSeen(item.id)">
                                <span>Mark as read</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="drop" v-if="currentNav === 1">
                    <div class="empty-legend" v-if="!seen.length"> <span>No news</span></div>
                    <div class="drop-item" v-for="item in seen" :key="item">

                        <OverlayBadge value="" severity="secondary">
                            <div class="drop-image" @click="onHandleClick(item)">
                                <i class="pi pi-shopping-cart" />
                            </div>
                        </OverlayBadge>
                        <div class="drop-box">
                            <div class="drop-title" @click="onHandleClick(item)">
                                {{ item.title }}

                                <span>{{ getTimeAgo(item.created_at) }}</span>
                            </div>
                            <div class="drop-message" @click="onHandleClick(item)">
                                {{ item.message }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Popover>
    </div>
</template>

<script setup>
import gql from 'graphql-tag';
import notificationSound from '@/assets/notification.mp3';
import { ref, watch, reactive, computed } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { format } from 'timeago.js';

const router = useRouter();

const op = ref(true);

const toggle = (event) => {
    op.value.toggle(event);
}

const currentNav = ref(0);

const { playNotification } = setupAudio();

//////////////////////////////////////////////////////////////////////////////

const queryOptions = {
    pollInterval: 60000,
    clientId: 'notification'
}

const unseenSet = reactive({
    value: new Set()
});

const seenSet = reactive({
    value: new Set()
});

const unseen = computed(() => Array.from(unseenSet.value));

const seen = computed(() => Array.from(seenSet.value));

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
    const items = value.getNotifications;

    items.forEach((element, index) => {
        if (!element.seen) {
            if (!unseenSet.value.has(element)) {
                unseenSet.value.add(element)
                if (index === items.length - 1) {
                    playNotification()
                    showBox()
                }
            }
        } else {
            if (!seenSet.value.has(element)) {
                seenSet.value.add(element)
            }
        }

    })
});

onGetNotificationsError(error => {
    console.log(error)
})

//////////////////////////////////////////////////////////////////////////////

const { mutate: updateNotification } = useMutation(gql`
      mutation updateNotification ($updateNotificationVariable: UpdateNotificationInput!) {
        updateNotification (updateNotificationInput: $updateNotificationVariable) {
          success
        }
      }
    `, {
    clientId: 'notification'
})

const handleSeen = (id) => {
    updateNotification({
        "updateNotificationVariable": {
            notification_id: id
        }
    })

    showBox()
}

//////////////////////////////////////////////////////////////////////////////

const showBox = () => {
    const div = document.getElementById('notifications');

    if (div) {
        div.click();
    }
}

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


//////////////////////////////////////////////////////////////////////////////

function setupAudio() {
    const audio = ref(new Audio(notificationSound));

    audio.muted = false;

    audio.value.load();

    audio.value.volume = 0.4;

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
section {
    min-height: 300px;
}

.notification {
    margin: 0 2rem;
    display: flex;
    align-items: center;
}

.button i {
    font-size: var(--text-size-c);
}

.drop {
    width: 350px;
    word-break: break-all;
}

.drop-item {
    border-bottom: 1px solid var(--border-a);
    display: flex;
    padding: 1rem 0;
    transition: 0.2s;
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
    cursor: pointer;
}

.drop-pad {
    margin-top: 0.5rem;
    cursor: pointer;
}

.drop-pad span {
    background: var(--background-b);
    font-size: var(--text-size-a);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
}

.nav {
    display: flex;
}

.nav-item {
    padding: 0.5rem 1rem;
    font-size: var(--text-size-a);
    border-bottom: 2px solid var(--border-a);
    cursor: pointer;
}

.nav-item.selected {
    border-bottom: 2px solid var(--primary-c);
}

.empty-legend {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    color: var(--text-b);
}
</style>