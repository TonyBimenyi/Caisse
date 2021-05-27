<template>
    <div class="bloc-modale" v-if="reveleDemande">
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="toggleFormDemande">X</div>
            <h5>Demande de  Crédit</h5>
            <div class="card-modal mt-4">

            {{form.compte.id}}

                <div class="input-group mt-3">
                          <label for="compte">COMPTE # </label>
                        <!-- <select id="" v-model="form.compte"  name="">
                            <option>... select</option>
                            <option v-for="compte in  comptes.results" :key="compte.id" v-bind:value="compte.id">
                            {{compte.num_compte}} : {{compte.user.first_name}} - {{compte.user.last_name}} 
                            </option>
                        </select> -->
                </div>
                <div class="input-group mt-3">
                    <label for="somme">MONTANT</label>
                    <input class="" type="number" v-model.number="form.montant" name="">
                </div>
                <div class="input-group mt-3">
                    <label for="somme">PERIODE</label>
                    <input class="" type="number" v-model.number="form.periode" name="">
                </div>
               
                <div class="input-group mt-3">
                    <div class="spinner-border text-warning" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <button @click="saveDemandeCredit" class="btn btn-info">Valider</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:["reveleDemande","toggleFormDemande","comptes"],

    data() {
        return {
          
             form:{
                montant: 5000,
                periode: 5,
                compte: this.$store.state.user.id
               
            }, 
           
        }
    },

    methods: {
        saveDemandeCredit(){
            axios.post(this.$store.state.url+"/demande_credit/",this.form,this.header)
            .then(res => {
                console.log(res)
                alert("Reussi")
            })
            .catch(err => {
                console.error(err); 
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

        }
    },
    watch:{
        
    }
    
}
</script>

<style scoped>

.input-group{
    display: flex;
    justify-content: space-around;
}
.input-group label,.input-group select,.input-group input,.input-group textarea{
    display: inline-block;
    width: 200px;
    color:black;
    text-align: left;
}

/** POUR LE MODAL */
.bloc-modale{
    position: fixed;
    top:40;
    left:0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay{
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

}

.modale{
    position:fixed;
    top:10%;
    height: auto;

     
}
.card-modal
{
    padding: 20px;
    width: auto;
    
    
}  

.close-btn{
    position: absolute;
    top:5px;
    right:5px;
    cursor:pointer;
   
}
</style>