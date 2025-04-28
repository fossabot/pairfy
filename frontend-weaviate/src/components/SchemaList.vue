<template>
    <div>
      <h2>Schemas</h2>
      <ul>
        <li v-for="schema in schemas" :key="schema.class">{{ schema.class }}</li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const schemas = ref<any[]>([]);
  
  const fetchSchemas = async () => {
    const res = await fetch(`http://localhost:8080/v1/schema`);
    const data = await res.json();
    schemas.value = data.classes || [];
  };
  
  onMounted(fetchSchemas);
  </script>
  