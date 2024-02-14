<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <nav>
      <router-link to="/alunos" active-class="active">Alunos</router-link>
      <router-link to="/disciplina" active-class="active">Disciplina</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  width: 70%;
  display: flex;
  margin: 2rem auto;
  justify-content: space-evenly;
}
nav a {
  text-decoration: none;
  color: #34496E;
  font-weight: bold;
}
.active {
  color: #41B883;
  border-bottom: 5px solid #41B883;
}


</style>
