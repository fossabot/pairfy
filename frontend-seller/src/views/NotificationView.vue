<template>
    <main>
        <Toolbar>
            <template #start>
                <Button icon="pi pi-chevron-left" class="mr-2" text severity="secondary" @click="goBack" />
                <Breadcrumb :model="navItems">
                    <template #item="{ item }">
                        <span style="font-weight: 600;">{{ item.label }}</span>
                    </template>
                    <template #separator> / </template>
                </Breadcrumb>
            </template>

            <template #center>

            </template>

            <template #end>
                <IconField style="margin-right: 1rem;">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </IconField>

                <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
            </template>
        </Toolbar>
        <div class="card">

            <DataTable class="card-datatable" ref="dt" :value="notificationList" dataKey="id" :paginator="true"
                :rows="15" :filters="filters" @page="updateCursor()" @rowSelect="onSelect" selectionMode="single"
                paginatorTemplate="PrevPageLink   NextPageLink  CurrentPageReport"
                currentPageReportTemplate="Showing {first} to {last}">
                <template #paginatorstart>
                    <div style="color: var(--text-b);">
                        <span>{{ notificationCount }} Elements</span>
                    </div>
                </template>


                <Column header="Icon" style="max-width: 2rem">
                    <template #body="slotProps">
                        <div class="datatable-image">
                            <OverlayBadge value="" severity="danger">
                                <i class="pi pi-cart-plus" v-if="slotProps.data.type === 'order'" />
                            </OverlayBadge>
                        </div>
                    </template>
                </Column>

                <Column field="type" header="Type" sortable style="max-width: 2rem; ">
                    <template #sorticon="{ sortOrder }">
                        <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                        <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                        <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                    </template>
                    <template #body="slotProps">
                        {{ slotProps.data.type }}
                    </template>
                </Column>

                <Column field="title" header="Title" sortable style="max-width: 2rem">
                    <template #sorticon="{ sortOrder }">
                        <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                        <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                        <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                    </template>
                    <template #body="slotProps">
                        {{ slotProps.data.title }}
                    </template>
                </Column>

                <Column field="message" header="Message" sortable style="max-width: 8rem; word-break: break-all;">
                    <template #sorticon="{ sortOrder }">
                        <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                        <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                        <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                    </template>
                    <template #body="slotProps">
                        {{ slotProps.data.message }}
                    </template>
                </Column>

                <Column field="created_at" header="Date" sortable style="max-width: 2rem">
                    <template #body="slotProps">
                        {{ convertDate(slotProps.data.created_at) }}
                    </template>
                    <template #sorticon="{ sortOrder }">
                        <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                        <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                        <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                    </template>
                </Column>

                <Column :exportable="false" style="max-width: 2rem">
                    <template #body="slotProps">
                        <div class="datatable-control">
                            <Button icon="pi pi-arrow-up-right" outlined size="small" rounded
                                @click="beforeDeleteProduct(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>

        </div>
    </main>
</template>

<script setup>
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import { useQuery } from '@vue/apollo-composable';
import { onBeforeUnmount, ref, watch } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useRouter } from 'vue-router';
import { HOST } from '@/api';

const router = useRouter();

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Notifications' }
]);

const queryOptions = {
    pollInterval: 60000,
    clientId: 'notification'
}

const notificationList = ref([]);

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

const watchNotifications = watch(onGetNotification, value => {
    notificationList.value = value?.getNotifications;
}, { immediate: true });

const onSelect = (row) => {
    console.log(row);

    const notification = row.data;

    if (notification.type === 'order') {
        const { threadtoken, seller_address } = JSON.parse(notification.data);

        window.open(`http://localhost:5174/order/${threadtoken}/?mode=seller&address=${seller_address}`, '_blank');

    }
}

const notificationCount = ref(0);

const goBack = () => {
    router.go(-1)
}

const convertDate = (timestamp) => {
    const date = dayjs(parseInt(timestamp));

    return date.format('YYYY-MM-DD:mm:ss');
}

onBeforeUnmount(() => {
    watchNotifications()
})

</script>

<style lang="css" scoped>
main {
    padding: 1rem 2rem;
    flex: 1 1 auto;
    position: relative;
}

.card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-a);
    border-radius: 1rem;
    margin-top: 1rem;
    overflow: hidden;
}

.datatable-image {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--background-b);
    border-radius: 8px;
}

.datatable-image i {
    font-size: 20px;
}

.datatable-control {
    display: flex;
    justify-content: center;
}

.arrow {
    font-size: 12px;
}
</style>