<template>
    <div>
      <h2>ProductV1 Total Objects: {{ count }}</h2>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const count = ref<number>(0);
  
  const fetchCount = async () => {
    const res = await fetch(`http://localhost:8080/v1/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            Aggregate {
              ProductV1 {
                meta {
                  count
                }
              }
            }
          }
        `
      })
    });
  
    const data = await res.json();
    count.value = data.data.Aggregate.ProductV1[0].meta.count || 0;
  };
  
  onMounted(fetchCount);
  </script>
  