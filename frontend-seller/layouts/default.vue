<!-- layouts/default.vue -->
<template>
    <div class="layout">
      <aside class="sidebar">
        <nav>
          <NuxtLink to="/">🏠 Home</NuxtLink><br />
          <NuxtLink to="/dashboard">📊 Dashboard</NuxtLink><br />
          <NuxtLink to="/settings">⚙️ Settings</NuxtLink>
        </nav>
      </aside>
  
      <main class="content">
        <slot />
      </main>
    </div>
  </template>
  
  <style scoped>
  .layout {
    display: flex;
    height: 100vh;
  }
  .sidebar {
    width: 220px;
    background-color: #1e1e2f;
    color: white;
    padding: 20px;
  }
  .content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  }
  </style>
  