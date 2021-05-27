<template>
    <div class="table-container">
    <!-- {{retraits}} -->
    <div> <button v-if="utilisateur.is_admin"  type="button" @click="fetchData" class="btn btn-primary mb-4">Tout les retraits </button> </div>
   
    <table class="table">
        <thead>
            <tr>
                <th>COMPTE</th>
                <th>SOMME TOTAL</th>
                <th>SOMME  RETIRE</th>
                <th>SOMME RESTANT</th>
                <th>DATE</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="retrait in retraits" :key="retrait.id">
                <td>{{ retrait.compte }}</td>
                <td>{{ retrait.somme_total }}</td>
                <td>{{ retrait.somme_retire }}</td>
                <td>{{ retrait.somme_restant }}</td>
                <td>{{ datetime(retrait.generated_at) }}</td>
            </tr>
            <tr>
                <td>TOTAL</td>
                <td><b>{{ formatNumber(retraitsTotal.somme_total) }} </b></td>
                <td><b>{{ formatNumber(retraitsTotal.somme_retire) }}</b></td>
                <td><b>{{ formatNumber(retraitsTotal.somme_restant) }}</b></td>
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
            retraits : this.$store.state.retraits,
            page_counts : 0
        }
        
    },
    watch:{
        "$store.state.retraits":{
            deep:true,
            handler( new_val){
                this.retraits = new_val
            }
        }

    },
    mounted(){
        this.fetchDataForConnectedUser()     
    },
    methods: {
        fetchDataForConnectedUser(){
            axios.get(this.$store.state.url+`/retrait/me/`,this.header)
        .then(res => {
           
            this.$store.state.retraits = res.data
            this.page_counts = Math.ceil(res.data.count/this.$store.state.page_count)
        })
        .catch(err => {
            console.error(err); 
        })

        },
        fetchData(){
            axios.get(this.$store.state.url+`/retrait/?page=${this.$route.params.current_page}`,this.header)
        .then(res => {
           
            this.$store.state.retraits = res.data
            this.page_counts = Math.ceil(res.data.count/this.$store.state.page_count)
        })
        .catch(err => {
            console.error(err); 
        })

        },
        goto(no){
            this.$router.push("/retrait/"+no);
            this.fetchData()
        },
        genererRetrait(){
            axios.get(this.$store.state.url+"/retrait/generate/",this.header)
            .then(res => {
                this.response = "opération terminé"
            })
            .catch(err => {
            // console.error(err); 
                this.response = "already generated"
            })
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
        },
        retraitsTotal(){
                // retrait.somme_total }}</td>
                // <td>{{ retrait.somme_retire }}</td>
                // <td>{{ retrait.somme_restant
            let total = {
                somme_retire : 0,
                somme_restant : 0,
                somme_total : 0
            };

            for (let index = 0; index < this.retraits.length; index++) {
                //const element = array[index];
                total.somme_retire += this.retraits[index].somme_retire
                total.somme_restant += this.retraits[index].somme_restant
                total.somme_total += this.retraits[index].somme_total
                
            }
            return total
        }
    },
    
}
</script>

<style scoped>

</style>

<style scoped>
.pagination button{
    padding: 5px 10px;
    margin: 2px;
    background-color: #0000;

}
button.active{
   
    background-color: #33bf7a;

}
.table-container {
    overflow-x: auto;
    margin-top:10px;
}
.table-container button{
background-color:var(--cyan);
border:none;
align-items: center;
padding:15px 25px 15px 25px;border-radius: 5px;color:white;
font-size:17px;
font-weight: bold;
margin-bottom: 20px;
}
.table-container button:hover{
    background-color: cyan;
    cursor: pointer;
    color: black;
    transition:.3s;
}
table{
    border-collapse: collapse;
    width:0px;
    margin:0 auto;
}
thead th{
    padding: 10px 70px 10px 70px;
    background-color: dark;
    font-size: 15px;
    color: #fff;
    border-bottom:6px solid var(--special);
    
}
tbody td{
 padding: 8px 10px 8px 10px;
 border-bottom: 3px solid var(--special);
}
@media screen and (max-width: 1100px) {   
    .table-container button{
        font-size: 12px;
        padding:15px 9px 15px 9px;
        transition: .5s;
    }
    thead th{
        padding:5px 30px 5px 30px;
      
    }
    .table-container{
     margin-right: 5%;   
    margin-left:5%;  
      transition: .5s; 
}
}

</style>