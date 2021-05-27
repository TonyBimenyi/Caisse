import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user : null,
    // url: "/api",
    url: "https://csdteam.org/api",
    logged_in : false,
    epargnes : [],
    credits : [],
    members : [],
    selectedMembre : null ,
    depenses : [],
    retraits : [],
    page_count: 20,
    operations : [],
    depots : {},
    users : [],
    comptes : [],
    keyword : "",
    dashboard: {
      somme_entraide: 0,
      somme_epargne: 0,
      benefice: 0,
      depense: 0,
    },
    exercices:{},
    profile:{},
    comptePrincipal : {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
