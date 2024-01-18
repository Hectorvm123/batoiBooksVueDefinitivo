<script>
import { store } from '../stores/store'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(store, {
      mensajes: 'mensajes'
    })
  }
}
</script>

<template>
  <div class="mensajes">{{ mensajes }}</div>
</template>

<style>
.mensajes {
  color: red;
}
</style>
