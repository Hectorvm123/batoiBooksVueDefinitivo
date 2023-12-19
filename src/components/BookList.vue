<script>
import BooksRepository from "../repositories/books.repository.js";
import AppBook from "./AppBook.vue";

export default {
  data() {
    return {
      books: [],
    }
  },
  components:{
    AppBook,
  },
  
  async mounted() {
    this.repository = new BooksRepository();
    this.books = await this.repository.getAllBooks();
  },

  methods: {
    async bookDel(id){
      await this.repository.removeBook(id);
    }

  }
}
</script>

<template>
<div class="list">
  <app-book v-for="book in books" :book="book"></app-book>
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