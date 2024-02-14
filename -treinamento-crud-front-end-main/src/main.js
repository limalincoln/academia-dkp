import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import AlunosFormVue from './components/AlunosForm.vue';
import DisciplinaFormVue from './components/DisciplinaForm.vue';

Vue.use(VueRouter);

// Defina suas rotas
const routes = [
  { path: '/', component: AlunosFormVue },
  { path: '/alunos', component: AlunosFormVue },
  { path: '/disciplinas', component: DisciplinaFormVue }
];

// Crie uma instância do VueRouter e passe as rotas
const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false

new Vue({
  router, // Adicione o router à instância Vue
  render: h => h(App),
}).$mount('#app')

export default router;
