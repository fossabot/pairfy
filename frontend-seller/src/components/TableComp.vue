<template>
  <div class="datatable">
    <!-- Search Input -->

    <div class="datatable-head flex">
      <div class="datatable-head-left">
        <div class="datatable-head-search flex">
          <i class="pi pi-search" />
          <input v-model="searchQuery" type="text" placeholder="Search" class="p-2 border rounded w-full mb-3" />
        </div>
      </div>

      <div class="datatable-head-right">
        <span>1-50 of 1,320</span>

        <span>Page {{ currentPage }} of {{ totalPages }}</span>

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
          <th class="column" v-for="column in columns" :key="column.field" @click="sortBy(column.field)">

            <div class="box">
              <span class="label"> {{ column.label }}</span>

              <div class="sort">

                <span class="arrow up" :class="{ enabled: sortOrder === 1 }" />


                <span class="arrow down" :class="{ enabled: sortOrder === -1 }" />

              </div>

            </div>

          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedItems" :key="product.id" class="rows">
          <td class="row">{{ product.name }}</td>
          <td class="row">{{ formatCurrency(product.price) }}</td>
          <td class="row">{{ product.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(['items', 'columns'])

const items = computed(() => props.items)

const columns = computed(() => props.columns);

const searchQuery = ref("");
const sortField = ref(null);
const sortOrder = ref(0);
const rowsPerPage = ref(15);
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
};

const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
</script>

<style scoped>
.datatable {
  background: var(--background-a);
  font-size: var(--text-size-1);
  flex-direction: column;
  box-shadow: var(--shadow-b);
  color: var(-text-a);
  border-radius: 12px;
}

.datatable-head {
  border-bottom: 1px solid var(--border-a);
  justify-content: space-between;
  padding: 1rem 1rem;
}

.datatable-head-right {
  font-size: var(--text-size-0);
}

.datatable-head .datatable-head-right button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

.datatable-head-search {
  background: var(--background-b);
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0 1rem;
}

.datatable-head-search i {}

.datatable-head-search input {
  background: transparent;
  padding: 0.75rem 1rem;
  width: 400px;
  border: none;
  outline: none;
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
  border-radius: 2px;
  margin: 1px;
}

.arrow.up.enabled {
  border-bottom: 4px solid red;
}

.arrow.down.enabled {
  border-top: 4px solid red;
}

.up {
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);
}

.down {
  border-top: 4px solid rgba(0, 0, 0, 0.2);
}

.table {
  border-spacing: 0rem;
  font-size: var(--text-size-1);
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
  padding: 0.5rem 0 0.5rem 0;
}

.rows {
  border-top: 1px solid var(--border-a);
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9; /* Light gray */
}

tbody tr:nth-child(even) {
  background-color: #ffffff; /* White */
}
</style>