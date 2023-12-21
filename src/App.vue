<script>
import { RouterView } from 'vue-router'
import AppMenu from './components/AppMenu.vue';
export default {
  components: {
    RouterView,
    AppMenu
  }
}
</script>

<template>
  <header>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/logoBatoi.png" class="logo" alt="Vite logo" />
      </a>
      <h1>Batoi Books</h1>
    </div>
    <div>
      <AppMenu></AppMenu>
    </div>
  </header>
  <RouterView />
  <footer>Hector Valls Mira</footer>
</template>