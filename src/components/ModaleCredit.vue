<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay"></div>
    <div class="modale card">
      <div class="btn btn-danger close-btn" @click="toggleForm">X</div>
      <h5>Nouvelle Crédit</h5>
      <div class="card-modal mt-4">

        <div class="field mt-2">
          <label for="somme">MONTANT</label>
          <input class="" type="number" v-model.number="form.montant" name="" />
        </div>
        <div class="field mt-2">
          <label for="somme">PERIODE</label>
          <input class="" type="number" v-model.number="form.periode" name="" />
        </div>
        <div class="field mt-2" >
          <label for="somme">TAUX  %</label>
          <input class="" type="number" v-model.number="form.taux" :disabled="sans_interet" name="" />
        </div>
        
        <div class="check">
          
          <input class="" id="sans_interet" type="checkbox" v-model="sans_interet" name="" />
          <label for="sans_interet">CREDIT SANS INTERET</label>
        </div>



        <div class="field mt-3">
        <div v-if="loader" class="d-flex justify-content-center">
          <div class="spinner-border text-warning" role="status">
              <span class="sr-only">Loading...</span>
          </div>
        </div>
          <label for="montant"> </label>
  
          <button v-if="!loader" @click="saveCredit" class="btn btn-info">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["revele", "toggleForm", "comptes"],

  data() {
    return {
      form: {
        montant: "",
        periode: "",
        taux: 5,
    
      },
      sans_interet : false,
      loader : false
    };
  },
  watch:{
    sans_interet(new_val){
  
      if(new_val){
      
        this.form.taux = 0
      }else{
        this.form.taux = 5
      }
    }
  },
  methods: {
    saveCredit() {
      this.loader = true
      axios.post(this.$store.state.url + "/credit/", this.form, this.header)
        .then((res) => {
          //console.log(res.data)
            this.$store.state.credits.unshift(res.data);
            this.loader = false
            this.toggleForm();
          alert("REUSSI");
        })
        .catch((err) => {
           console.error(err);
           this.loader = false
          alert("ERROR ");
         
        });
    }
  },
  computed: {
    header() {
      return {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.access}`,
        },
      };
    },
  },

};
</script>

<style scoped>
.field {
  display: flex;
  justify-content: space-around;
  flex-direction: column;

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
.field label,
.field select,
.field input {
  display: block;
  width: 100%;
  color: black;
  text-align: left;
  margin: 0;
}
.field select,
.field input{
    height: 35px;
}
.check input{
  height: 15px;
  margin-right: -50px;
}
.check label{
    font-weight: bolder;
}
.field{
  padding-bottom: 30px;
}
.modale{
  background-color: white;
    padding:40px 30px 0px 30px;
}
input{
    height:30px;
    width:150px;
    border-radius: 0px;
    border:2px solid var(--info);
}input:hover{
    box-shadow: inset 0px 0px 6px 2px var(--info);
    transition: .4s;

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
.field label{
    font-weight: bolder;
}
/** POUR LE MODAL */
.bloc-modale {
  position: fixed;
  top: 15;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 250;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modale {
  position: fixed;
  top: 10%;
  height: auto;
}
.card-modal {
  padding: 20px;
  width: auto;
}
h5{
  font-family: bitter;
  font-size: 20px;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>