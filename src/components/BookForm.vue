<script>
import ModulesRepository from '../repositories/modules.repository.js'
import BooksRepository from '../repositories/books.repository.js'
import AppMessages from './AppMessages.vue'
import { store } from '../stores/store';
import { mapActions } from 'pinia';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {
    AppMessages,
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object({
      idModule: yup.string().required('La selección de módulo es obligatoria'),
      publisher: yup.string().required('La editorial es obligatoria'),
      price: yup.number().positive('El precio debe ser positivo').required('El precio es obligatorio'),
      pages: yup.number().min(1, 'El número de páginas debe ser al menos 1').required('El número de páginas es obligatorio'),
      status: yup.string().required('El estado es obligatorio'),
      comments: yup.string().trim().max(500, 'Los comentarios no pueden exceder los 500 caracteres'),
    });

    return {
      schema,
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

    this.addMensaje('Formulario cargado')
  },
  methods: {
    ...mapActions(store, ['addMensaje', 'updateBook', 'anyadirBook']),

    libroYaExiste() {
      this.bookRepository = new BooksRepository();
      return  this.bookRepository.bookExists(this.book.idModule);
;
    
    },

    async addBook() {
      this.bookRepository = new BooksRepository()

      if (this.$route.params.id) {
        await this.bookRepository.changeBook(this.book)
        this.addMensaje('Libro modificado en el repositorio')
        this.updateBook(this.book)
        
      } else {
        const exists = await this.libroYaExiste(this.book.idModule);
        if (exists) {
          this.addMensaje('Un libro con este módulo ya existe.');
          return;
        }else{
          await this.bookRepository.addBook(this.book)
          this.addMensaje('Libro añadido al repositorio')
          this.anyadirBook(this.book)
        
        }
      }
      this.resetForm()
      this.$router.push('/')
    },
    resetForm() {
      this.book = JSON.parse(JSON.stringify(this.bookDefecto))
    },
    formTitle() {
      return Object.keys(this.bookDefecto).length > 0 ? 'Editar libro' : 'Añadir libro'
    },
    submitButtonText() {
      return Object.keys(this.bookDefecto).length > 0 ? 'Guardar' : 'Añadir'
    }
  }
}
</script>

<template>
  <app-messages></app-messages>
  <div>
    <h1>{{ this.formTitle() }}</h1>
    <Form :validation-schema="schema" @submit="addBook">
      <div>
        <label>Módulo:</label>
        <Field name="idModule" as="select" v-model="book.idModule" required>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </Field>
        <ErrorMessage name="idModule" />
      </div>

      <div>
        <label>Editorial:</label>
        <Field name="publisher" type="text" v-model="book.publisher" required/>
        <ErrorMessage name="publisher" />
      </div>

      <div>
      <label>Precio:</label>
      <Field name="price" type="number" v-model="book.price" required min="0" step="0.01" />
      <ErrorMessage name="price" />
    </div>

    <div>
      <label>Páginas:</label>
      <Field name="pages" type="number" v-model="book.pages" min="0" required />
      <ErrorMessage name="pages" />
    </div>

    <div>
      <label>Estado:</label>
      <div>
        <Field name="status" type="radio" value="good" v-model="book.status" />
        <label>Bueno</label>
      </div>
      <div>
        <Field name="status" type="radio" value="sold" v-model="book.status" />
        <label>Vendido</label>
      </div>
      <div>
        <Field name="status" type="radio" value="new" v-model="book.status" />
        <label>Nuevo</label>
      </div>
      <ErrorMessage name="status" />
    </div>

    <div>
      <label>Comentarios:</label>
      <Field name="comments" as="textarea" v-model="book.comments" />
      <ErrorMessage name="comments" />
    </div>

    <button type="submit">{{ submitButtonText() }}</button>
    <button type="button" @click="resetForm">Reset</button>
  </Form>
  </div>
</template>

<style scoped>
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

span {
  color: red;
}
</style>
