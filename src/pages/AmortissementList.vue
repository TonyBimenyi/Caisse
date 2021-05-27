<template>
  <div class="container">

  <table class="table">
      <thead>
      <tr>
            <th> A PAYE</th>
            <th> RESTE</th>
            <th> INTERET</th>
            <th> DATE PAYMENT</th>
            <th> DONE</th>
            <th> ECHEANCE</th>
            <th> CREDIT</th>
            <th> COMPTE</th>
       
      </tr>
      </thead>
      <tbody>
          <tr v-for="amortisement in amarortissements" :key="amortisement.id">
             
              <td>{{ amortisement.a_payer }} </td>
              <td>{{ amortisement.reste }} </td>
              <td>{{ amortisement.interet }} </td>
              <td>{{ amortisement.date_payment }} </td>
              <td>{{ amortisement.done }} </td>
              <td>{{ amortisement.echeance }} </td>
              <td>{{ amortisement.credit }} </td>
              <td>{{ amortisement.compte }} </td>
          </tr>
      </tbody>
  </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            amarortissements : []
        }
    },
    mounted(){
       const credit_id = this.$route.params.credit_id
       axios.get(this.$store.state.url+"/amortissement/?credit="+credit_id,this.header)
       .then(res => {
           console.log(res)
           this.amarortissements = res.data.results
       })
       .catch(err => {
           console.error(err); 
       })
    }
    ,
    computed:{
        header(){
            return{
				headers :{
					"Authorization" : `Bearer ${this.$store.state.user.access}`
				}
			}
        }
    },

}
</script>

<style>
.container{
    overflow-x: auto;
}
table{
    margin:0 auto;
    border-collapse: collapse;
    
}
thead tr th{
    background-color: var(--grey);
    padding:10px 60px 10px 60px;
    font-size: 15px;
    border-bottom: 6px solid var(--special);
}

</style>