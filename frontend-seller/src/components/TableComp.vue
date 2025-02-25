<template>
  <div class="datatable">
    <!-- Search Input -->

    <div class="header flex">
      <div class="header-left">
        <div class="search flex">
          <i class="pi pi-search" />
          <input v-model="searchQuery" type="text" placeholder="Search" class="p-2 border rounded w-full mb-3" />
        </div>
      </div>

      <div class="header-right flex">
        <div class="pagination flex">
          <span>{{ range }} of {{ count }}</span>

          <span>Page {{ currentPage }} of {{ totalPages }}</span>
        </div>

        <button @click="prevPage" :disabled="currentPage === 1">
          <i class="pi pi-angle-left" />
        </button>

        <button @click="nextPage" :disabled="currentPage === totalPages">
          <i class="pi pi-angle-right" />
        </button>
      </div>
    </div>

    <!-- Table -->
    <table class="table">
      <thead>
        <tr class="columns">
          <th class="column" v-if="images" />

          <th class="column" v-for="column in columns" :key="column.field" @click="sortBy(column.field)">

            <div class="box">
              <span class="label"> {{ column.label }}</span>

              <div class="sort">

                <span class="arrow up" :class="{ enabled: sortOrder === 1 && sortField === column.field }" />


                <span class="arrow down" :class="{ enabled: sortOrder === -1 && sortField === column.field }" />

              </div>

            </div>

          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="rows" v-for="item in paginatedItems" :key="item.id">
          <td class="image">
            <slot name="image" :item="item" />
          </td>

          <td class="row" v-for="column in columns" :key="column.field"
            :style="{ maxWidth: columnWidths[column.field] || 'auto' }">
            <slot :name="`col-${column.field}`" :value="item[column.field]" :item="item">
              {{ item[column.field] }}
            </slot>
          </td>

          <td class="row">
            <slot name="action" :item="item" />
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";


const props = defineProps(['items', 'columns', "limit", "count", "images", "columnWidths"]);

const emit = defineEmits(['onPrev', 'onNext']);

const items = computed(() => props.items)

const columns = computed(() => props.columns);

const count = computed(() => props.count);



const searchQuery = ref("");
const sortField = ref(null);
const sortOrder = ref(0);
const rowsPerPage = ref(props.limit);
const currentPage = ref(1);





// Computed: Filtered & Sorted Data
const filteredItems = computed(() => {
  return items.value
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortField.value) return 0;
      return sortOrder.value * (a[sortField.value] > b[sortField.value] ? 1 : -1);
    });
});

// Computed: Paginated Data
const totalPages = computed(() => Math.ceil(filteredItems.value.length / rowsPerPage.value));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return filteredItems.value.slice(start, start + rowsPerPage.value);
});

const range = computed(() => {

  const getRange = (totalElements, elementsPerPage, currentPage) => {
    if (currentPage < 1) currentPage = 1;

    const totalPages = Math.ceil(totalElements / elementsPerPage);

    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * elementsPerPage + 1;

    let end = start + elementsPerPage - 1;

    if (end > totalElements) end = totalElements;

    return `${start} - ${end}`;
  }

  return `${getRange(count.value, rowsPerPage.value, currentPage.value)}`
});





// Methods
const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value *= -1; // Toggle sorting order
  } else {
    sortField.value = field;
    sortOrder.value = 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;

  emit('onPrev', paginatedItems.value[0])
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;

  emit('onNext', paginatedItems.value[paginatedItems.value.length - 1])
};

</script>

<style scoped>
.datatable {
  background: var(--background-a);
  font-size: var(--text-size-1);
  flex-direction: column;
  color: var(--text-a);
  border-radius: 6px;
  transition: 0.2s;
  overflow: hidden;
  width: 100%;
}

.header {
  width: inherit;
  border-bottom: 1px solid var(--border-a);
  justify-content: space-between;
  padding: 0.75rem 1rem;
}

.header-left {
  width: 50%;
}

.header-right {
  width: 50%;
}

.pagination {
  font-size: var(--text-size-0);
  white-space: nowrap;
  margin-left: auto;
}

.header .header-right button {
  background: var(--background-a);
  flex-direction: column;
  padding: 0.75rem;
  display: flex;
  border: none;
  cursor: pointer;
  border-radius: 50%;
}

.header .header-right button:hover {
  background: var(--background-b);
}

.search {
  background: var(--background-b);
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 0 1rem;
}

.search input {
  background: transparent;
  padding: 0.75rem 1rem;
  min-width: 300px;
  width: 80%;
  border: none;
  outline: none;
}

.search input::placeholder {
  color: var(--text-b);
  font-size: var(--text-size-1);
}

.column {
  border-right: 1px solid var(--border-a);
  padding: 1rem 0.5rem;
  text-align: left;
  cursor: pointer;
}

.arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-radius: 4px;
  margin: 1px;
}

.arrow.up.enabled {
  border-bottom: 4px solid currentColor;
}

.arrow.down.enabled {
  border-top: 4px solid currentColor;
}

.up {
  border-bottom: 4px solid rgba(0, 0, 0, 0.3);
}

.down {
  border-top: 4px solid rgba(0, 0, 0, 0.3);
}

.table {
  font-size: var(--text-size-0);
  border-collapse: collapse;
  border-spacing: 0rem;
  width: inherit;
  padding: 1rem;
}

.box {
  display: flex;
  align-items: center;
}

.label {
  margin-right: auto;
}

.sort {
  display: flex;
  flex-direction: column;
}

.row {
  padding: 0.5rem;
  max-width: 20rem;
  text-align: left;
  padding-right: 1rem;
  border-left: 1px solid var(--border-a);
}

.row.hidden {
  display: none;
}

.rows {
  border-top: 1px solid var(--border-a);
}

tbody tr:nth-child(odd) {
  background: var(--background-a);
}

tbody tr:nth-child(even) {
  background: var(--background-a);
}

.pagination {}

.pagination span {
  margin: 0 0.5rem;
}

.image {
  padding: 0.5rem;
}
</style>