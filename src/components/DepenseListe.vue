<template>
    <div class="table-container">
     <h4 class="mt-3">Liste des depenses</h4>
     <div class="">
         <div class="buttons">
     <button class="btn btn-primary" @click="entraide">Entraide</button>
     <button class="btn btn-info" @click="epargne">Epargne</button>
     </div>
     </div>

     <table class="table-cont">
        <thead>
        <tr>
        <th>DESCRIPTION</th>
        <th>MONTANT</th>
        <th>TYPE</th>
        <th>DATE</th>
        <th>ACTION</th>
        </tr>
        </thead>
         <tbody>
             <tr v-for="depense  in depenses" :key="depense.id">
                 <td>{{depense.details}}</td>
                 <td>{{depense.montant}}</td>
                 <td>{{depense.type.toUpperCase()}}</td>
                 <td>{{datetime(depense.date)}}</td>
                 <td class="d-flex">
                  <button @click="deleteDepense(depense.id)" class="btn btn-danger mr-2">Supprimer</button>                 
                 </td>
             </tr>
             <tr>
                <td><b>TOTAL</b></td>
                <td><b>{{ depensesTotal }}</b></td>
                <td></td>
             </tr>
         </tbody>
     </table>

     <div class="pagination" v-if="page_counts>1">
        <button v-for="no in page_counts"
            :class="{'active':$route.params['current_page']==no}" :key="no"
            @click="goto(no)">
            {{no}}
        </button>
    </div>
    
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            depenses :  this.$store.state.depenses,
            page_counts : 0,
            depense : null

        }
    },
    watch:{
        "$store.state.depenses"(new_val){
            this.depenses = new_val
        }
    },
    mounted() {
        this.fetchData()
        
    },
    methods: {
        entraide(){
            this.depenses = this.$store.state.depenses.filter(e => e.type == "entraide")
        },
        epargne(){
            this.depenses = this.$store.state.depenses.filter(e => e.type == "epargne")
        },
        goto(no){
            this.$router.push("/depense/"+no);
            this.fetchData()
        },
        fetchData(){
            axios.get(this.$store.state.url+`/depense/?page=${this.$route.params.current_page}`,this.header)
            .then(res => {
                this.$store.state.depenses = res.data.results
                this.page_counts = Math.ceil(res.data.count/this.$store.state.page_count)
            })
            .catch(err => {
                console.error(err); 
            })
        },
        deleteDepense(ele){
            if (!confirm("Are you sure !!")) {
                return
                
            }

            axios.delete(this.$store.state.url+`/depense/${ele}/`,this.header)
            .then(res => {
                this.fetchData();
            })
            .catch(err => {
                alert("la somme n'est pas disponible");
                console.error(err); 
            })

        },
        updateDepense(depense){
            this.toggleForm()
        }
    },
    computed:{
        header(){
            return {
                headers :{
					"Authorization" : `Bearer ${this.$store.state.user.access}`
				}

            }
        },
        depensesTotal(){
            let total = 0;

            for (let index = 0; index < this.depenses.length; index++) {
                total += this.depenses[index].montant;   
            }
            return total;
        }
    }
    
}
</script>


<style scoped>
h4{
    font-family: bitter;
    font-size: 30px;
    font-weight: bolder;

}
.pagination button{
    padding: 5px 10px;
    margin: 2px;
    background-color: #0000;
}
button.active{
   
    background-color: #33bf7a;
}
button:hover{
    cursor: pointer;
}
table{
    margin:0 auto;
    border-collapse: collapse;
}
.table-container {
    overflow-x: auto;

}
thead tr th{
  padding: 7px 80px 7px 80px;
  background-color: dark;
  border-bottom:6px solid var(--special);
  font-size:15px;
}
tbody tr td{
  padding: 10px 0px 10px 0px;
  border-bottom:1px solid var(--special);
}

    .table-container{
        padding-left:20px;
        padding-right: 20px;
    }


.buttons{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;}
    
.buttons button{
    padding:10px 50px 10px 50px;
    background-color: var(--info);
    border:none;
    font-size: 18px;
    color:white;
    border-radius: 5px;
}
@media screen and (max-width: 600px) {
    
    .table-cont {
        width: 700px;
    }	
}
@media screen and (max-width: 1100px){
    .buttons button{
        padding:10px 35px 10px 35px;
        font-size: 13px;transition:.5s;
    }
    h4{
        font-size: 25px;
        transition: .5s;
    }
    .table-container{
        margin-left: 5%;margin-right:5%;
    }
}
</style>
