<script>
import { store } from "../store/store"

export default {
  props: ['book'],

  methods: {
    async bookDel(id){
      await store.deleteBook(id)
      store.addMensaje("Libro borrado")
    },
    async bookMod(idBook) {
      this.$router.push({ name: 'form', params: { id: idBook } })
    }
  }
}
</script>

<template>
  <div>
    <h5>Libro : {{ book.id }}</h5>
    <h5>{{ book.idModule }} ({{ book.id }})</h5>
    <h6>{{ book.publisher }}</h6>
    <p>Precio: {{ book.price }}</p>
    <p>Paginas: {{ book.pages }}</p>
    <p>Estado: {{ book.status }}</p>

    <p v-if="book.soldDate === ''">No vendido</p>
    <p v-else>Vendido el {{ book.soldDate }}</p>

    <p>Comentarios: {{ book.comments }}</p>

    <button class="addToCart">
      <span class="material-icons">add_shopping_cart</span>
    </button>

    <button class="bookMod" @click="bookMod(book.id)">
      <span class="material-icons">edit</span>
    </button>

    <button class="bookDel" @click="bookDel(book.id)">
      <span class="material-icons">delete</span>
    </button>
  </div>
</template>
