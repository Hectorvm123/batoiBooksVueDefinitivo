import { reactive } from 'vue'
import BooksRepository from '../repositories/books.repository.js'

export const store = {
  debug: true,
  state: reactive({
    mensajes: '',
    cart: [],
    books: []
  }),
  addMensaje(newMessage) {
    if (newMessage) {
      this.state.mensajes = newMessage
    }
  },
  addToCart(newBook) {
    if (newBook) {
      this.state.cart.push({ newBook })
    }
  },
  fillBooks(books) {
    this.state.books.push(books)
  },
  async deleteBook(id) {
    this.repository = new BooksRepository()

    if (confirm('¿Deseas borrar toda la lista de cosas a hacer?')) {
      await this.repository.removeBook(id)
      const index = this.state.books[0].findIndex((book) => book.id === id)
      if (index > -1) {
        this.state.books[0].splice(index, 1)
      }
    }
  },
  async updateBook(changedBook) {
    this.repository = new BooksRepository()

    const index = this.state.books[0].findIndex((book) => book.id === changedBook.id)
    if (index > -1) {
      this.state.books[0][index] = changedBook
    }
  }
}
