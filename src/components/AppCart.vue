<script>
import { store } from '../stores/store';
import { mapState, mapActions } from 'pinia';
import AppBook from './AppBook.vue'
import AppMessages from './AppMessages.vue'

export default {
  components: {
    AppBook,
    AppMessages
  },
  computed: {
    ...mapState(store, {
      cart: 'cart',
    })
  },
  methods: {
    ...mapActions(store, ['removeFromCart', 'totalPrice'])
  }
}
</script>

<template>
  <h1>Libros en el carrito</h1>
  <app-messages></app-messages>
  <div class="list">
    <app-book v-for="book in this.cart" :key="book.id" :book="book" ref="bookRef">
      <button class="removeCart" @click="removeFromCart(book.id)">
        <span class="material-icons">cart-off</span>
      </button>
    </app-book>
  </div>

  <h1>Total de libros: {{ cart.length }}</h1>
  <h2>Precio total: {{ this.totalPrice() }}</h2>
</template>
