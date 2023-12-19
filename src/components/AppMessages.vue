<script>
import { store } from '../store/store.js'

export default{
  computed:{
    mensaje(){
      return store.state.mensajes;
    }
  },
}
</script>

<template>
<div>{{ mensaje }}</div>
</template>