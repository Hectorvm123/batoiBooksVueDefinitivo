<script>
import { RouterLink, RouterView } from 'vue-router'

export default{
  components: {
    RouterLink,
    RouterView
  },
}
</script>

<template>
  <header>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/logoBatoi.png" class="logo" alt="Vite logo" />
    </a>
    <h1>Batoi Books</h1>
  </div>
    <div>
      <nav class="menu">
        <ul>
        <li><RouterLink to="/">Ver Libros</RouterLink></li>
        <li><RouterLink to="/form">Form</RouterLink></li>
        <li><RouterLink to="/cart">Carrito</RouterLink></li>

        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
      </nav>
    </div>
  </header>
  <RouterView />
  <footer>Hector Valls Mira</footer>
</template>


<style>
.menu {
  position: fixed;  
  top: 0;           
  left: 0;          
  width: 10%;     
  height: 100%;     
  background-color: #06a1f4; 
  color: #fff;      
  padding: 20px;    
  font-size: 26px;
}

.menu ul {
  list-style: none; 
  padding: 0;
  margin: 0;
}


.menu li {
  margin: 20px 0;
}

.menu a {
  text-decoration: none; 
  color: #fff;          
}

</style>