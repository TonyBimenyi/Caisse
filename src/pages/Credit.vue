<template>
<div>
 <div class="btn-align">
  <button @click="toggleForm"  class="btn btn-outline-info mr-2 mb-2" type="button" style="font-size:14px;">Demande de crédit <i class="fa fa-plus"></i> </button>
   <router-link to="/amortissement" active-class="active" tag="button" exact class="side-btn mb-2 btn btn-outline-info"> Tableau d'amortissement</router-link>
  </div>
  <modale-credit v-bind:comptes="comptes" v-bind:revele="revele" v-bind:toggleForm="toggleForm"/>
  <modale-demande-credit v-bind:reveleDemande="reveleDemande"  v-bind:toggleFormDemande="toggleFormDemande"/>
<credit-list/>
</div>
   
</template>
<script>
import CreditList from '../components/CreditList.vue'
import ModaleCredit from '../components/ModaleCredit.vue'
import ModaleDemandeCredit from '../components/ModaleDemandeCredit.vue'
import axios from "axios"

export default {
  components: {  CreditList, ModaleCredit , ModaleDemandeCredit },
  data() {
    return {
      comptes : [],
      revele : false,
      reveleDemande: false,

      }
  },
  mounted() {
      axios.get(this.$store.state.url+"/compte/",this.header)
      .then(res => {
          this.comptes = res.data
        
      })
      .catch(err => {
          console.error(err); 
      })
  },
  methods: {
        toggleForm(){
           this.revele = !this.revele
        axios.get(this.$store.state.url+"/compte/",this.header)
        .then(res => {
            this.comptes = res.data
        })
        .catch(err => {
            console.error(err); 
        })
        },
        toggleForm(){
          this.revele = !this.revele
        },
        toggleFormDemande(){
            this.reveleDemande = !this.reveleDemande 
        }
    },
    computed:{
        header(){
            return{
				headers :{
					"Authorization" : `Bearer ${this.$store.state.user.access}`
				}
			}
        },
        utilisateur(){
            return this.$store.state.user
        }
    },
}
</script>
<style scoped>
.btn{
    margin-right:10px;
    background-color:var(--info);
    border:none;
    color:white;
    font-size:15px;
    border-radius:5px;
}
.btn:hover{
    cursor: pointer;
    background-color: var(--warning);
    transition: .3s;
}
button{
    height:40px;
    width:210px;
    margin-top:90px;
    font-size:15px;
}
@media screen and (max-width: 576px) {
    .main-container {
      max-width: 430px;
    }  
  }
  .btn-align {
    text-align: right;
}
@media screen and (max-width:1100px){
    .btn{
        width:180px;
        font-size:12px;transition:.5s;
    }

}
@media screen and (max-width:576px) {
    .table-container {
        width: 430px;
        overflow-x: auto;
    }
    .btn-align {
        text-align: center;
    }
}
 @media screen and (max-width: 740px){
    .btn{
      margin-top: 55px;transition: .5s;
    }
  }
</style>