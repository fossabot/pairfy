<template>
  <main>
    <TableComp :columns="columns" :items="items" :keys="[1, 2, 3]" :limit="2"
    :count="1382" :images="true"  @onNext="handleOnNext"
      >

      <template #image="{ item }">
        <div class="image">
          xxxxxxx
        </div>
      </template>

      <template #action="{ item }">
        <button @click="handleClick(item)">
          Click Me
        </button>
      </template>

    </TableComp>

  </main>
</template>


<style scoped>
main {
  padding: 1rem;
}
</style>


<script setup>
import TableComp from '@/components/TableComp.vue';
import { ref } from "vue";


const items = ref([
  { id: 1, name: "Laptop", price: 120, category: "Electronics", created_at: 1 },
  { id: 2, name: "Smartphone", price: 800, category: "Electronics", created_at: 2 },
  { id: 3, name: "Shoes", price: 100, category: "Fashion", created_at: 3 },
  { id: 4, name: "Watch", price: 200, category: "Accessories", created_at: 4 },
]);

const columns = ref([
  { label: "Name", field: "name" },
  { label: "Price", field: "price" },
  { label: "Category", field: "category" },
]);

const handleOnNext = (cursor) => {
  console.log(cursor)
}
</script>