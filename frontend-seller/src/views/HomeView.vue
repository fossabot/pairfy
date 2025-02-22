<template>
  <main>
    <TableComp :items="items" />
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

const categories = ["Electronics", "Fashion", "Accessories", "Home", "Sports"];

const addRandomItem = () => {
  const newItem = {
    id: items.value.length + 1, // Increment ID
    name: `Item ${items.value.length + 1}`, // Random name
    price: Math.floor(Math.random() * 1000) + 50, // Random price between 50-1050
    category: categories[Math.floor(Math.random() * categories.length)], // Random category
  };
  items.value.push(newItem);
};

let interval;

onMounted(() => {
  interval = setInterval(addRandomItem, 10000);
});
</script>