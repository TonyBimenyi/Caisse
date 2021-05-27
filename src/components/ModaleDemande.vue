<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="toggleForm">X</div>
            <div class="card-modal mt-4">
                <div class="input-group mt-3">
                    <label for="montant">MONTANT</label>
                    <input class="" type="number" v-model="form.montant" name="">
                    <span v-if="errors.montant" class="text-danger">{{ errors.montant}}</span>
                </div>
                

                <div class="input-group mt-3">
                    <label for="montant">TYPE</label>
                   
                    <select class="" v-model="form.credit_type" name="">
                        <option value="" seleted="">....</option>
                        <option value="1">SANS INTERET</option>
                        <option value="2">AVEC INTERET</option>
                     </select>
                    
                </div>
                <div class="input-group mt-3">
                    <label for="montant">PERIODE</label>
                    <input class="" type="" v-model="form.periode" name="">
                    <span v-if="errors.date" class="text-danger">{{ errors.date}}</span>
                </div>
                <div class="input-group mt-3">
                    <label for="montant"> </label>
                    <button @click="saveDemande" class="btn btn-info">Valider</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:["revele","toggleForm"],

    data() {
        return {
            form :{
                montant : "",
                periode : "",
                credit_type : "",
                membre : 1
            },
            compte : "",
            errors : {}
        }
    },
    methods: {
        saveDemande(){
            axios.post(this.$store.state.url+'/demande/', this.form, this.header)
            .then(res => {
                alert("REUSSI")
                this.$emit('demandeSaved', res)
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
        },    
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
.input-group label{
    display: inline-block;
    width: 100px;
    text-align: left;
}
.select{
    width: 1500px;
}

/** POUR LE MODAL */
.bloc-modale{
    position: fixed;
    top:0;
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
    top:30%;
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