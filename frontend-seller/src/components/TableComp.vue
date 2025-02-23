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
          <span>1-50 of {{ count }}</span>

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
          <td>
            <slot name="image" :item="item" />
          </td>

          <td class="row" v-for="column in columns" :key="column.field">
            <slot :name="`col-${column.field}`" :value="item[column.field]" :item="item">
              {{ item[column.field] }}
            </slot>
          </td>

          <slot name="action" :item="item" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";


const props = defineProps(['items', 'columns', "limit", "count", "images"]);

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
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;

  emit('onNext', "434")
};

const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
</script>

<style scoped>
.datatable {
  background: var(--background-a);
  font-size: var(--text-size-1);
  box-shadow: var(--shadow-b);
  flex-direction: column;
  color: var(-text-a);
  border-radius: 12px;
  width: 100%;
}

.header {
  border-bottom: 1px solid var(--border-a);
  justify-content: space-between;
  padding: 1rem 1rem;
}

.header-right {
  font-size: var(--text-size-0);
}

.header .header-right button {
  background: var(--background-a);
  transition: 0.2s;
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
  border-radius: 999px;
  padding: 0 1rem;
}

.search input {
  background: transparent;
  padding: 0.75rem 1rem;
  min-width: 300px;
  border: none;
  outline: none;
}

.search input::placeholder {
  color: var(--text-b);
  font-size: var(--text-size-1);
}

.column {
  text-align: left;
  min-width: 100px;
  padding: 0.5rem 0;
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
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);
}

.down {
  border-top: 4px solid rgba(0, 0, 0, 0.2);
}

.table {
  font-size: var(--text-size-1);
  border-spacing: 0rem;
  width: inherit;
  padding: 1rem;
}

.box {
  display: flex;
  align-items: center;
}

.label {
  margin-right: 0.25rem;
}

.sort {
  display: flex;
  flex-direction: column;
}

.row {
  padding: 0.5rem 0rem;
  padding-right: 1rem;
  max-width: 300px;
}

.row.hidden {
  display: none;
}

.rows {
  border-top: 1px solid var(--border-a);
}

tbody tr:nth-child(odd) {
  background: var(--background-c);
}

tbody tr:nth-child(even) {
  background: var(--background-a);
}

.pagination {}

.pagination span {
  margin: 0 0.5rem;
}
</style>