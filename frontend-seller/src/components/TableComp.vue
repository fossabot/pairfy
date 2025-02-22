<template>
  <div class="p-datatable">
    <!-- Search Input -->

    <div class="p-datatable-pad flex">
      <input v-model="searchQuery" type="text" placeholder="Search..." class="p-2 border rounded w-full mb-3" />

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button @click="prevPage" :disabled="currentPage === 1">
        Prev
      </button>
      
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>

    <!-- Table -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th v-for="column in columns" :key="column.field" @click="sortBy(column.field)"
            class="border border-gray-300 p-2 cursor-pointer">
            {{ column.label }} <span v-if="sortField === column.field">{{ sortOrder === 1 ? '▲' : '▼' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedItems" :key="product.id" class="hover:bg-gray-100">
          <td class="border border-gray-300 p-2">{{ product.name }}</td>
          <td class="border border-gray-300 p-2">{{ formatCurrency(product.price) }}</td>
          <td class="border border-gray-300 p-2">{{ product.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Sample Data
const products = ref([
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 800, category: "Electronics" },
  { id: 3, name: "Shoes", price: 100, category: "Fashion" },
  { id: 4, name: "Watch", price: 200, category: "Accessories" },
]);

// Table Configuration
const columns = ref([
  { label: "Product Name", field: "name" },
  { label: "Price", field: "price" },
  { label: "Category", field: "category" },
]);

const searchQuery = ref("");
const sortField = ref(null);
const sortOrder = ref(1);
const rowsPerPage = ref(2);
const currentPage = ref(1);

// Computed: Filtered & Sorted Data
const filteredItems = computed(() => {
  return products.value
    .filter((product) =>
      Object.values(product).some((value) =>
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
.p-datatable {
  background: var(--background-a);

  border-radius: 12px;
}

.p-datatable-pad {
  border-top: 1px solid var(--border-a);
  height: 50px;

}

.p-datatable-pad button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>