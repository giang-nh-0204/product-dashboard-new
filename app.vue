<template>
  <div id="app">
    <ProductDashboard />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Product Dashboard - Quản lý sản phẩm',
  meta: [
    {
      name: 'description',
      content: 'Hệ thống quản lý và theo dõi sản phẩm với Vue 3 và Nuxt 3'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ]
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f7fa;
}

#app {
  min-height: 100vh;
}
</style>
