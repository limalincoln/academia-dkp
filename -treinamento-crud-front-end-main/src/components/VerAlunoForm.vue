<template>
    <div class="container">
     
    </div>
</template>
<script>
import axios from 'axios';

export default 
  name: 'FuncionarioForm',
  props: {
    msg: String,
  },
  data() {
    return {
      nome: '',
      alunos: [],
    }
  },
  mounted() {
    this.listar()
  },
  methods: {
    listar() {
      axios
        .get('http://localhost:3000/routes/alunos/listar')
        .then(response => {

          this.alunos = response.data.data
        })
        .catch(error => console.log(error))
    },
}
</script>