<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="toggleForm">X</div>
            <div class="card-modal mt-4">

                <div class="input-group mt-3">
                    <label for="montant">MONTANT</label>
                    <input class="" type="number" v-model="data.montant" name="">
                    
                </div>
                <div class="input-group mt-3">
                    <label for="montant">PERIODE</label>
                    <input class="" type="number" placeholder="EN MOIS" v-model="data.periode" name="">
                    
                </div>

                <div class="input-group mt-3">
                    <label for="montant">TAUX </label>
                    <input class="" type="number" v-model="data.taux" name="">
                   
                </div>
                
                
                <div class="input-group mt-0">
                    <label for="montant"> </label>
                    <button @click="saveEpargne" class="btn btn-info">Valider</button>
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
            data : {
                montant : "",
                periode : "",
                taux: "",

            },
            product : "JEAN LIONEL",
        }
    },
    methods:{
        saveEpargne(){
           
           this.$emit('doSomething', this.data)
           this.toggleForm()

        }

    },
    watch:{
        
    }
    
}
</script>

<style scoped>
.modale{
    background-color: white;
    padding:40px 10px 0px 10px;
}
.input-group{
    padding-bottom:20px;
}
input{
    height:30px;
    width:300px;
    border-radius: 0px;
    border:2px solid var(--info);
    
}input:hover{
    box-shadow: inset 0px 0px 6px 2px var(--info);
    transition: .4s;

}
button{
     height:35px;
    width:200px;
    border-radius: none;
    background-color: teal;
}
button:hover{
    background-color: var(--info);
    transition: .3s;
    cursor: pointer;
}
.input-group label{
    display: inline-block;
    width: 100px;
    text-align: left;
    font-weight: bolder;
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
   background-color:var(--danger);
   padding: 10px 15px 10px 15px;
   color:white
}
</style>