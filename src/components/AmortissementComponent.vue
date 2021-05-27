<template>
  <div>
  
    <button @click="toggleForm" class="btn btn-info">Voir le tableau d'amortissement</button>
    <modal-amortissement
      @doSomething="caculerAmortissement"
      v-bind:revele="revele"
      v-bind:toggleForm="toggleForm"
    />

   

    <table class="table">
      <thead>
        <tr>
        <th>Echéance</th>
        <th>Capital restant dû</th>
        <th>Capital remboursé</th>
        <th>Intérêts</th>
        <th>Mensualité</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in tableau_amortissement" :key="element.id">
          <td>{{ element.echeance +1}}</td>
          <td>{{formatNumber(element.capital_restant)}}</td>
          <td>{{formatNumber(element.capital_rembourse)}}</td>
          <td>{{formatNumber(element.interet_mensuel)}}</td>
          <td>{{formatNumber(element.mensualite)}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import ModalAmortissement from "./ModalAmortissement.vue";
export default {
  components: { ModalAmortissement },
  data() {
    return {
      tableau_amortissement: [],
      revele: false,
    };
  },

  methods: {
    
    toggleForm() {
      this.revele = !this.revele;
    },
    caculerAmortissement(data){
      let capital_emprunter = data.montant
      let taux_interet_mensuel = data.taux /100/12
      let dure_pret = data.periode
      let mensualite = capital_emprunter * (taux_interet_mensuel / (1 - (1 + taux_interet_mensuel)**(-dure_pret)))

      let tableau_amortissement = []

      let interet_mensuel = capital_emprunter * taux_interet_mensuel
      let capital_rembourse = mensualite - interet_mensuel 
      let capital_restant = capital_emprunter - capital_rembourse 

      let paiement_mensuel = {
        capital_restant : capital_restant,
        interet_mensuel : interet_mensuel,
        capital_rembourse : capital_rembourse,
        mensualite : mensualite,
        echeance : 0,
      }

      tableau_amortissement.push(paiement_mensuel)

      for(let i =1; i< dure_pret; i++){

        interet_mensuel = tableau_amortissement[i-1]["capital_restant"] * taux_interet_mensuel
        capital_rembourse = (mensualite - interet_mensuel) + tableau_amortissement[i-1]["capital_rembourse"]
        capital_restant = tableau_amortissement[i-1]["capital_restant"] - (mensualite - interet_mensuel)

       paiement_mensuel = {
          capital_restant : capital_restant,
          interet_mensuel : interet_mensuel,
          capital_rembourse : capital_rembourse,
          mensualite : mensualite,
          echeance : i,
      }

      tableau_amortissement.push(paiement_mensuel)

      }

      this.tableau_amortissement = tableau_amortissement
    }
  
  },
};
</script>

<style>
/* table{
    width: 100%;
    border-collapse: collapse;
}
table , th, tr,td{
    border: 1px solid black;
} */

tr:hover{
 
}
button{
  background-color: var(--info);
  border:none;
  color: white;
  padding:10px 20px 10px 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

</style>