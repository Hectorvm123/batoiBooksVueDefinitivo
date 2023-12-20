<script>
import { store } from '@/store/store'
import BooksRepository from '../repositories/books.repository.js'
import AppBook from './AppBook.vue'
import AppMessages from './AppMessages.vue'

export default {
  components: {
    AppBook,
    AppMessages
  },

  computed: {
    books() {
      return store.state.books
    }
  },

  async mounted() {
    this.repository = new BooksRepository()
    this.loadedBooks = await this.repository.getAllBooks()
    store.fillBooks(this.loadedBooks)
    store.addMensaje('Libros cargados con computed')
  }
}
</script>

<template>
  <app-messages></app-messages>
  <div class="list">
    <app-book v-for="book in this.books[0]" :key="book.id" :book="book"></app-book>
  </div>
</template>

<style>
.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-left: 7%;
}

.list div {
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgb(0, 119, 255);
}

@media (max-width: 480px) {
  #list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
    width: 100%;
  }
}
</style>
