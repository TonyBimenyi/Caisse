<template>
    <div class="table-container">
        <h1>MES CREDITS</h1>
    
        <table class="table">
            <thead class="text-center">
            <tr>
            <td>DEMANDE DE CREDIT NO</td>
            <td>COMPTE</td>
            <td>MONTANT</td>
            <td>PERIODE</td>
            <td>DATE DE DEMANDE</td>
            <td>ACTION</td>
            </tr>
            </thead>
            <tbody>
                <tr v-for="credit in credits.results" :key="credit.id">
                    <td>{{credit.id}}</td>
                    <td>{{credit.compte}}</td>
                    <td>{{credit.montant}}</td>
                    <td>{{credit.periode}}</td>
                    <td>{{datetime(credit.date)}}</td>  
                    <td> 
                    <button class="btn btn-info mr-2">Validé</button> 
                    <button class="btn btn-danger">Annulé</button> 
                    </td>
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
            credits : []
        }
    },
    mounted() {
        axios.get(this.$store.state.url+"/demande_credit/",this.header)
        .then(res => {
            console.log(res)
            //this.$store.state.credits = res.data
            this.credits = res.data
        })
        .catch(err => {
            console.error(err); 
        })
    },
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

<style scoped>
    .table-container {
        overflow-x: auto    ;
    }

</style>