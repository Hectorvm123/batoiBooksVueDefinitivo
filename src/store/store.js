import { reactive } from 'vue'

export const store = {
  debug: true,
  state: reactive({
    mensajes: '',
    cart: []
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
  }
}
