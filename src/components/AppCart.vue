<script>
import { store } from '@/store/store'

store
export default {
  computed: {
    cart() {
      return store.state.cart
    }
  }
}
</script>

<template>
  <h1>Libros en el carrito</h1>
  <p>Lorem ipsum blablablablablablablablablablablablablablabla</p>
</template>
