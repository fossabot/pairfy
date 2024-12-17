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

                <template #header>
                    {{ notificationList }}
                </template>


                <Column header="Image">
                    <template #body="slotProps">
                        x
                    </template>
                </Column>

                <Column field="id" header="ID" sortable style="max-width: 8rem">
                    <template #sorticon="{ sortOrder }">
                        <i v-if="sortOrder === 0" class="pi pi-sort-alt arrow" />
                        <i v-else-if="sortOrder === 1" class="pi pi-arrow-up arrow" />
                        <i v-else-if="sortOrder === -1" class="pi pi-arrow-down arrow" />
                    </template>
                    <template #body="slotProps">
                        {{ slotProps.data.id }}
                    </template>
                </Column>

                <Column :exportable="false" style="min-width: 4rem">
                    <template #body="slotProps">
                        <div class="datatable-control">
                            <Button icon="pi pi-trash" outlined size="small" rounded
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
import { useQuery } from '@vue/apollo-composable';
import { ref, watch } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

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

watch(onGetNotification, value => {
    notificationList.value = value.getNotifications;
});

const onSelect = () => {

}

const notificationCount = ref(0);

const goBack = () => {
    router.go(-1)
}


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
    padding: 1.5rem;
    margin-top: 1rem;
}
</style>