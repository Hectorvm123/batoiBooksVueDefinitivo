<script>
import { store } from '../stores/store';
import { mapState, mapActions } from 'pinia';


import BooksRepository from '../repositories/books.repository.js'
import ModulesRepository from '../repositories/modules.repository.js';
import AppBook from './AppBook.vue'
import AppMessages from './AppMessages.vue'

export default {
  components: {
    AppBook,
    AppMessages
  },

  computed: {
    ...mapState(store, {
      mensajes: 'mensajes',
      books: 'books'
    })
  },

  async mounted() {
    this.moduleRepository = new ModulesRepository()
    this.fillModules( await this.moduleRepository.getAllModules())

    this.bookRepository = new BooksRepository()
    this.loadedBooks = await this.bookRepository.getAllBooks()
    this.fillBooks(this.loadedBooks)

    

    this.addMensaje('Libros cargados con computed')
  },

  methods: {
    ...mapActions(store, ['isBookInCart', 'fillBooks', 'addMensaje', 'fillModules','addToCart', 'deleteBook', 'getModuleName']),
    async bookMod(idBook) {
      this.$router.push({ name: 'form', params: { id: idBook } })
    }

  }
}
</script>

<template>
  <app-messages></app-messages>
  <div class="list">
    <app-book v-for="book in this.books[0]" :key="book.id" :book="book" ref="bookRef">
      <button class="addToCart" :disabled="isBookInCart(book)" @click="addToCart(book)">
        <span class="material-icons">add_shopping_cart</span>
      </button>

      <button class="bookMod" @click="bookMod(book.id)">
        <span class="material-icons">edit</span>
      </button>

      <button class="bookDel" @click="deleteBook(book.id)">
        <span class="material-icons">delete</span>
      </button>
    </app-book>
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
