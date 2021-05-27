<template>
    <div class="table-container">
    <div v-if="message" class="alert alert-primary" role="alert">  
        {{message}}
    </div>
    
        <h1 class="mt-3 btn btn-primary">MES CREDITS</h1>

        
          <button v-if="utilisateur.is_admin" @click="toutCredits" class="btn btn-info ml-3">Tout les crédits</button>
        
        <table class="table">
            <thead class="text-center">
            <tr>
            <td>CREDIT NO</td>
            <td>COMPTE</td>
            <td>MONTANT</td>
            <td>TAUX</td>
            <td>RESTE</td>
            <td>DATE DU DEBUT</td>
            <td>MENSUALITE</td>
            <td>PERIODE</td>
            <td>ACTION</td>
            </tr>
            </thead>
            <tbody>
                <tr v-for="credit in  credits" :key="credit.id">
                    <td>{{credit.id}}</td>
                    <td>{{credit.compte.num_compte}}</td>
                    <td>{{credit.montant}}</td>
                    <td>{{credit.taux}}</td>
                    <td>{{credit.reste}}</td>
                    <td>{{credit.date_debut}}</td>
                    <td>{{formatNumber(credit.mensualite)}}</td>
                    <td>{{credit.periode}}</td>
                     <td > 
                     <button v-if="!credit.is_valid && utilisateur.is_admin"  class="btn btn-primary mr-2" @click="valideCredit(credit)">Valider</button>
                     <button v-if="!credit.is_valid && utilisateur.is_admin" class="btn btn-danger mr-2" @click="deleteCredit(credit)">Annuler</button> 
                     <button v-if="credit.is_valid" class="btn btn-info  mr-2" @click="showAmortissement(credit)">Detail</button> 
                     <button v-if="credit.is_valid && utilisateur.is_admin" class="btn btn-info  mr-2" @click="getLiquidation(credit)">Liquider</button> 
                     <button v-if="credit.is_valid && utilisateur.is_admin" class="btn btn-info  mr-2" @click="rambourser(credit)">Rembourser</button> 
                    </td> 
                   
                </tr>
            </tbody>
        </table>
         <modale-paiement  v-bind:showPaiement="showPaiement"/>
        
    </div>
</template>
<script>
import axios from 'axios'
import Paginate from 'vuejs-paginate'
import ModalePaiement from './ModalePaiement.vue'
export default {
    components:{Paginate, ModalePaiement, },
    data() {
        return {
            credits : this.$store.state.credits,
            checks : [],
            creditsValides : [],
            showPaiement : false,
            message : ""
        }
    },
    watch: {
        "$store.state.credits"(new_val){
            this.credits = new_val
        },
    },
    methods: {
        getLiquider(credit){
            axios.get(this.$store.state.url+"/credit/"+ credit.id+"/liquider/" ,this.header)
            .then(res => {
                alert("OPERATION REUSSI")
            })
            .catch(err => {
                console.error(err); 
            })
        },
        rambourser(credit){
            axios.get(this.$store.state.url+"/credit/"+ credit.id+"/rembourser/" ,this.header)
            .then(res => {
                alert("VOUS AVEZ PAYE : "
                     +res.data.a_payer + "\n AVEC INTERET : "
                    +res.data.interet + "\n IL VOUS RESTE A PAYER : " + res.data.reste
                )
            })
            .catch(err => {
                console.error(err); 
            })
        },
        getLiquidation(credit){
             // console.log(credit)
            axios.get(this.$store.state.url+"/credit/"+ credit.id+"/liquidation/" ,this.header)
            .then(res => {
                confirm("IL VOUS RESTE A PAYE : \n CAPITAL RESTANT : " +res.data.capital_restant + "\n BENEFICE : "+res.data.benefice + "\n")
            })
            .catch(err => {
                console.error(err); 
            })
        },
        showAmortissement(credit){
            this.$router.push("/amortissement-list/"+ credit.id)
        },
        valideCredit(credit){
            // console.log(credit)
            if(confirm("Vous êtes sûr  ?")){
                axios.get(this.$store.state.url+"/credit/"+ credit.id+"/validate/" ,this.header)
                .then(res => {
                    this.fetchData()
                })
                .catch(err => {
                    this.message = "la somme n'est pas disponible"
                    console.error(err); 
                })

            }
            
        },
         clickCallback: function(pageNum) {
                axios.get(this.$store.state.url+"/credit/?page="+pageNum,this.header)
                .then(res => {    
                    this.credits = res.data
                })
                .catch(err => {
                    console.error(err); 
                })
        },
        listcreditsValides(){},
        deleteCredit(credit){
            if(confirm("Vous êtes sûr d'annuler ce Crédit")){
                axios.delete(this.$store.state.url+"/credit/"+ credit.id+"/" ,this.header)
            .then(res => {
                this.fetchData()
                console.log(res)
                //this.$store.state.credits.results = this.$store.state.credits.results.filter(c => c.id != credit.id)
            })
            .catch(err => {
                console.error(err); 
            })

            }
            
        },
        fetchData(){
        axios.get(this.$store.state.url+"/credit/",this.header)
        .then(res => {
            this.$store.state.credits = res.data
        })
        .catch(err => {
            console.error(err); 
        })
        },
        fetchOneData(){
            axios.get(this.$store.state.url+"/credit/me/",this.header)
            .then(res => {
                this.$store.state.credits = res.data
            })
            .catch(err => {
                console.error(err); 
            })
        },
        toutCredits(){
            this.fetchData()
        }
    },
    mounted() {
        this.fetchOneData()
        
    },
    computed:{
        header(){
            return{
				headers :{
					"Authorization" : `Bearer ${this.$store.state.user.access}`
				}
			}
        },
        nombrePage(){
            return Math.ceil(this.credits.count / 10)
        },
        utilisateur(){
            return this.$store.state.user
        }
        
    },
}

</script>

<style scoped>
.table-container{
    overflow-x: auto;

}
h1{
    font-family: bitter;
    font-size: 30px;
    text-transform: capitalize;
    margin-bottom: -10px;
}
button{
    height:40px;
    width:180px;
    margin-top:20px;
    font-size:15px;
    margin-bottom:20px;
    background-color: #20c997;
    border:none;
    font-weight: bold;
    font-size:16px;
    border-radius: 5px;
}
button:hover{
    cursor: pointer;
    background-color:var(--info);
    transition:.3s;
    color:white;
}
h1{
    display: n;
}

.mt-3{
    margin-bottom:16px;
}
table{
    border-collapse: collapse;
    margin:0 auto;

}
thead tr td{
  padding: 10px 18px 10px 18px;
  background-color: dark;
  font-weight: bold;
  font-size:17px;
  border-bottom: 6px solid var(--special);
}
tbody tr td{
  padding: 6px 15px 6px 15px;
  border-bottom:3px solid var(--special);
}
@media screen and (max-width: 1100px){
    h1{
        font-size: 23px;transition: .5s;
    }
    button{
        font-size:13px;
        height:40px;
    width:150px;transition:.5s;
    }
    .table-container{
        margin-left:5%;margin-right:5%;transition:.5s;
    }
      thead tr td{
  padding: 0px 18px 0px 18px;
}
}
  
</style>