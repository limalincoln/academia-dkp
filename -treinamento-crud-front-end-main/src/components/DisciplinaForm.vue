<template>
  <div class="hello">
    <h1>Cadastro</h1>
    <h2>Cadastro de Alunos</h2>
    <hr>

    <div class="componente-form-table">
      <form action="">
        <label for="btn-cadastrar">Nome.:</label>
        <input 
          type="text" 
          id="btn-cadastrar" 
          name="btn-cadastrar"
          v-model="nome"
        />
        <br><br>
        <input 
          type="submit" 
          value="Cadastrar"
          @click="cadastrarNovoFuncionario($event)"
        />
      </form>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="funcionario in funcionarios"
            :key="funcionario.id"
          >
            <td>{{ funcionario.id }}</td>
            <td>{{ funcionario.nome }}</td>
            <td>
                <button @click="atualizarFuncionario(funcionario.id)">Alterar</button>
                <button @click="excluirFuncionario(funcionario.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FuncionarioForm',
  props: {
    msg: String,
  },
  data() {
    return {
      nome: '',
      funcionarios: [],
    }
  },
  mounted() {
    this.listar()
  },
  methods: {
    cadastrarNovoFuncionario(e) {

      e.preventDefault();

      axios
        .post('http://localhost:3000/routes/funcionarios/cadastrar', {
          "nome": this.nome
        })
        .then(response => {
          console.log(response);
          this.listar()
        })
        .catch(error => console.log(error))
    },
    listar() {
      axios
        .get('http://localhost:3000/routes/funcionarios/listar')
        .then(response => {

          this.funcionarios = response.data.data
        })
        .catch(error => console.log(error))
    },
    atualizarFuncionario(id) {

      axios
          .get(`http://localhost:3000/routes/funcionarios/${id}`)
          .then(response => {

            var nome_funcionario = window.prompt("Nome do funcionário:", response.data.data.nome);

            if (nome_funcionario !== null) {

              axios
                  .patch(`http://localhost:3000/routes/funcionarios/alterar/${id}`, {
                    nome: nome_funcionario,
                  })
                  .then(response => {
                      console.log(response);
                      this.listar();
                  })
                  .catch(error => console.log(error))

            } else {
              // Se o usuário clicou em "Cancelar" ou fechou a caixa de diálogo
              console.log("Você cancelou a operação.");
            }

          })
          .catch(error => console.log(error))

      },
      excluirFuncionario(id) {

        // Exibe uma caixa de diálogo com uma pergunta
        var result = window.confirm("Você tem certeza que deseja excluir este Funcionário?");

        // Verifica o resultado da ação do usuário
        if (result) {
          axios
            .delete(`http://localhost:3000/routes/funcionarios/excluir/${id}`)
            .then(response => {
              console.log(response);
              this.listar()
            })
            .catch(error => console.log(error))
        } else {
          // Se o usuário clicar em "Cancelar" ou fechar a caixa de diálogo, executa o código aqui
          window.alert("O usuário cancelou a exclusão.");
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
hr {
  width: 40%;
  margin-bottom: 1rem;
}
input {
  margin-left: .5rem;
}
</style>
