<script>
export default {}
</script>

<template>
  <nav class="menu">
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>
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
