<template>
  <main>
    <TableComp :columns="columns" :items="items" />
  </main>
</template>


<style scoped>
main {
  padding: 1rem;
}
</style>


<script setup>
import TableComp from '@/components/TableComp.vue';
import { ref, onMounted } from "vue";


const items = ref([
  { id: 1, name: "Laptop", price: 120, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 800, category: "Electronics" },
  { id: 3, name: "Shoes", price: 100, category: "Fashion" },
  { id: 4, name: "Watch", price: 200, category: "Accessories" },
]);

const columns = ref([
  { label: "Name", field: "name" },
  { label: "Price", field: "price" },
  { label: "Category", field: "category" },
]);

</script>