<script>
import { store } from '../stores/store'
import { mapState, mapActions } from 'pinia'

export default {
  props: ['book'],

  computed: {
    ...mapState(store, {
      mensajes: 'mensajes'
    })
  },

  methods: {
    ...mapActions(store, ['getModuleName'])
  }
}
</script>

<template>
  <div>
    <h5>Libro : {{ book.id }}</h5>
    <h5>{{ this.getModuleName(book.idModule) }} ({{ book.id }})</h5>
    <h6>{{ book.publisher }}</h6>
    <p>Precio: {{ book.price }}</p>
    <p>Paginas: {{ book.pages }}</p>
    <p>Estado: {{ book.status }}</p>

    <p v-if="book.soldDate === ''">No vendido</p>
    <p v-else>Vendido el {{ book.soldDate }}</p>

    <p>Comentarios: {{ book.comments }}</p>

    <slot></slot>
  </div>
</template>
