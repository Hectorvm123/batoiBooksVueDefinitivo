import { defineStore } from 'pinia'
import BooksRepository from '../repositories/books.repository.js'

export const store = defineStore('appStore', {
  state: () => ({
    mensajes: '',
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    books: [],
    modules: JSON.parse(localStorage.getItem('modules') || '[]')
  }),

  actions: {
    addMensaje(newMessage) {
      if (newMessage) {
        this.mensajes = newMessage
      }
    },
    addToCart(newBook) {
      if (newBook) {
        this.cart.push(newBook)
        this.cart = [...new Set(this.cart)]
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    totalPrice() {
      let sum = 0
      this.cart.forEach((book) => {
        sum += book.price
      })

      return sum
    },
    removeFromCart(id) {
      if (id) {
        const index = this.cart.findIndex((item) => item.id === id)
        if (index > -1) {
          this.cart.splice(index, 1)
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    async fillModules(modules) {
      this.modules.push(modules)
      localStorage.setItem('modules', JSON.stringify(this.modules))
    },
    getModuleName(code) {
      return this.modules[0].find((module) => module.code === code).cliteral
    },
    fillBooks(books) {
      this.books.push(books)
    },
    anyadirBook(book) {
      this.books[0].push(book)
    },
    async deleteBook(id) {
      this.repository = new BooksRepository()

      if (confirm('¿Deseas borrar toda la lista de cosas a hacer?')) {
        await this.repository.removeBook(id)
        const index = this.books[0].findIndex((book) => book.id === id)
        if (index > -1) {
          this.books[0].splice(index, 1)
        }
      }
    },
    async updateBook(changedBook) {
      this.repository = new BooksRepository()

      const index = this.books[0].findIndex((book) => book.id === changedBook.id)
      if (index > -1) {
        this.books[0][index] = changedBook
      }
    },
    isBookInCart(cartBook) {
      const index = this.cart.findIndex((book) => book.id === cartBook.id)
      if (index > -1) {
        return true
      }
      return false
    }
  }
})
