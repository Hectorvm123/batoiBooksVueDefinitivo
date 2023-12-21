<script>
import { store } from '../stores/store';
import { mapState } from 'pinia';

export default {
  computed: {
    ...mapState(store, {
      mensajes: 'mensajes',
    })
  }
}
</script>

<template>
  <div>{{ mensajes }}</div>
</template>
