<script>
import ModulesRepository from '../repositories/modules.repository.js'
import BooksRepository from '../repositories/books.repository.js'
import AppMessages from './AppMessages.vue'
import { store } from '@/store/store'

export default {
  components: {
    AppMessages
  },
  data() {
    return {
      book: {},
      bookDefecto: {},
      modules: []
    }
  },
  async mounted() {
    this.moduleRepository = new ModulesRepository()
    let modulos = await this.moduleRepository.getAllModules()
    this.modules = modulos

    if (this.$route.params.id) {
      this.bookRepository = new BooksRepository()
      this.book = await this.bookRepository.getBookById(this.$route.params.id)
      this.bookDefecto = JSON.parse(JSON.stringify(this.book))
    }

    store.addMensaje('Formulario cargado')
  },
  methods: {
    async addBook() {
      this.bookRepository = new BooksRepository()

      if (this.$route.params.id) {
        await this.bookRepository.changeBook(this.book)
        store.addMensaje('Libro modificado en el repositorio')
        store.updateBook(this.book)
        this.resetForm()
        this.$router.push('/')
      } else {
        await this.bookRepository.addBook(this.book)
        store.addMensaje('Libro añadido al repositorio')
        store.fillBooks(this.book)
        this.resetForm()
        this.$router.push('/')
      }
    },
    resetForm() {
      this.book = JSON.parse(JSON.stringify(this.bookDefecto))
    },
    formTitle() {
      return Object.keys(this.book).length > 0 ? 'Editar libro' : 'Añadir libro'
    },
    submitButtonText() {
      return Object.keys(this.book).length > 0 ? 'Guardar' : 'Añadir'
    }
  }
}
</script>

<template>
  <app-messages></app-messages>
  <div>
    <h1>{{ this.formTitle() }}</h1>
    <form id="bookForm" @submit.prevent="addBook">
      <div><input type="text" v-model="book.id" hidden /><br /></div>
      <div>
        <label>Módulo:</label>
        <select v-model="book.idModule" required>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option></select
        ><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Editorial:</label>
        <input type="text" v-model="book.publisher" required /><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" v-model="book.price" required min="0" step="0.01" /><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Páginas:</label>
        <input type="number" v-model="book.pages" min="0" required /><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Estado:</label>
        <input type="radio" v-model="book.status" name="estado" value="good" required />
        <label>Bueno</label>

        <input type="radio" v-model="book.status" name="estado" value="sold" />
        <label>Vendido</label>

        <input type="radio" v-model="book.status" name="estado" value="new" default />
        <label>Nuevo</label><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Comentarios:</label>
        <textarea v-model="book.comments"></textarea>
      </div>

      <button type="submit">{{ submitButtonText() }}</button>
      <button type="button" @click="resetForm">Reset</button>
    </form>
  </div>
</template>

<style>
form {
  text-align: center;
}

label {
  margin-right: 10px;
}

select,
input,
textarea {
  margin-bottom: 10px;
}
</style>
