<template>
    <div class="container" @wheel.prevent="handleScroll">
      <div class="left">
        <div ref="leftScroll" class="scrollable">
          <div class="content">
            <h2>Descripción larga del producto</h2>
            <p v-for="i in 30" :key="'left-' + i">Contenido extenso en la columna izquierda... {{ i }}</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div ref="rightScroll" class="scrollable">
          <div class="content">
            <h2>Detalles</h2>
            <p v-for="i in 15" :key="'right-' + i">Detalles adicionales... {{ i }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const leftScroll = ref(null)
  const rightScroll = ref(null)
  
  const handleScroll = (e) => {
    const delta = e.deltaY
    const right = rightScroll.value
    const left = leftScroll.value
  
    const scrollingDown = delta > 0
    const rightAtBottom = right.scrollTop + right.clientHeight >= right.scrollHeight
    const leftAtBottom = left.scrollTop + left.clientHeight >= left.scrollHeight
  
    if (scrollingDown) {
      if (!rightAtBottom) {
        right.scrollTop += delta
      } else if (!leftAtBottom) {
        left.scrollTop += delta
      }
    } else {
      if (left.scrollTop > 0) {
        left.scrollTop += delta
      } else if (right.scrollTop > 0) {
        right.scrollTop += delta
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 300px;
    height: 100vh;
    overflow: hidden;
  }
  
  .left,
  .right {
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
  }
  
  .left {
    background-color: #f0f0f0;
  }
  
  .right {
    background-color: #ffffff;
  }
  
  .scrollable {
    height: 100%;
    overflow-y: scroll;
  }
  
  .content {
    height: 200%;
  }
  </style>
  