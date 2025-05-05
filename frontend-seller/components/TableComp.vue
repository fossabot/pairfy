<template>
  <div class="datatable">
 
    <div class="header flex">
      <div class="header-left">
        <div class="search flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-search">
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Search" class="p-2 border rounded w-full mb-3" />
        </div>
      </div>

      <div class="header-right flex">
        <div class="pagination flex">
          <span>{{ range }}</span>
        </div>

        <button @click="prevPage" :disabled="page === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button @click="nextPage" :disabled="!hasMore">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <table class="table">
      <thead>
        <tr class="columns">
          <th class="column" v-if="images" />
          <th class="column" v-for="column in columns" :key="column.field" @click="sortBy(column.field)">
            <div class="box">
              <span class="label">{{ column.label }}</span>
              <div class="sort">
                <span class="arrow up" :class="{ enabled: sortOrder === 1 && sortField === column.field }" />
                <span class="arrow down" :class="{ enabled: sortOrder === -1 && sortField === column.field }" />
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr class="rows" v-for="item in filteredItems" :key="item.id">
          <td class="image" v-if="images">
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
import { ref, computed } from "vue"

const props = defineProps({
  items: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  limit: { type: Number, default: 16 },
  count: { type: Number, default: 0 },
  images: { type: Boolean, default: false },
  columnWidths: { type: Object, default: () => ({}) },
  hasMore: { type: Boolean, default: false },
  page: { type: Number, default: 1 },
  range: { type: String, default: "" }
})

const emit = defineEmits(["onPrev", "onNext"])

const searchQuery = ref("")
const sortField = ref(null)
const sortOrder = ref(0)

const filteredItems = computed(() => {
  return props.items
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortField.value) return 0
      return sortOrder.value * (a[sortField.value] > b[sortField.value] ? 1 : -1)
    })
})

const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value *= -1
  } else {
    sortField.value = field
    sortOrder.value = 1
  }
}

const prevPage = () => {
  if (filteredItems.value.length) {
    emit("onPrev", filteredItems.value[0])
  }
}

const nextPage = () => {
  if (filteredItems.value.length) {
    emit("onNext", filteredItems.value[filteredItems.value.length - 1])
  }
}
</script>




<style scoped>
.datatable {
  border: 1px solid var(--border-a);
  background: var(--background-a);
  border-radius: var(--radius-b);
  font-size: var(--text-size-1);
  flex-direction: column;
  color: var(--text-a);
  min-height: 100vh;
  border-top: none;
  transition: 0.2s;
  overflow: hidden;
  width: 100%;
}

.header {
  border-bottom: 1px solid var(--border-a);
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.75rem;
  width: inherit;
}

.header-left {
  width: 30%;
}

.header-right {
  width: 70%;
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
  border: 1px solid var(--border-a);
  background: var(--background-b);
  border-radius: var(--radius-b);
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
  border-bottom: 1px solid var(--border-a);
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
  border-left: 1px solid var(--border-a);
  padding: 0.5rem;
  max-width: 20rem;
  text-align: left;
  padding-right: 1rem;
  overflow-wrap: break-word;
  word-break: break-all;
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

.pagination {
  margin-right: 1rem;
}

.pagination span {
  margin: 0 0.5rem;
}

.image {}
</style>