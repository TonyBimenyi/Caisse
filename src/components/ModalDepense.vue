<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay"></div>
    <div class="modale card">
      <div class="btn btn-danger close-btn" @click="close">X</div>
      <h5>Nouvelle Depense</h5>
      <div class="card-modal mt-4">

        <div class="field mt-2">
          <label for="somme">MONTANT</label>
          <input class="" type="number" v-model.number="form.montant" name="" />
        </div>
        <div class="field mt-2">
          <label for="somme">TYPE DE DEPENSE</label>
          
          <select class="" v-model="form.type">
            <option value="entraide">ENTRAIDE</option>
            <option value="epargne">CREDIT ET EPARGNE</option>
          </select>
        </div>
        <div class="field mt-3">
        <label for="somme">DESCRIPTION</label>
          <textarea v-model="form.details" class="details"></textarea>
        </div>
        <div class="field mt-3">
        <div v-if="loader" class="d-flex justify-content-center">
          <div class="spinner-border text-warning" role="status">
              <span class="sr-only">Loading...</span>
          </div>
        </div>
          <label for="montant"> </label>
          <button v-if="!loader" @click="saveDepense" class="btn btn-info">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["revele", "toggleForm", "comptes","depense"],

  data() {
    return {
      form: {
         montant: 0,
        details: "",
        type: "",
      },
      depense_id : "",
      loader : false,
      b : {}
    };
  },
  watch:{
      depense(new_val){
    
          if(new_val){
              this.form = JSON.parse(JSON.stringify(new_val))
          }else{
              this.depense_id = null;

          }

      }
  }
  ,
  methods: {
    close(){
      this.form = {
         montant: 0,
        details: "",
        type: "",
      }
      this.depense_id = "",
      this.loader = false,
      this.b = {}

      this.$emit("close")

    },
    saveDepense() {
      this.loader = true
      axios.post(this.$store.state.url + "/depense/", this.form, this.header)
        .then((res) => {
          this.$store.state.depenses.unshift(res.data);
          this.toggleForm();
          this.loader  = false

          this.form = {
               montant: 0,
               details: "",

          }
         
        })
        .catch((err) => {
          alert("ERROR ");
          console.error(err);
        });
    },
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

.details{
    display: block;
    width: 100%;
}
.field {
  display: flex;
  justify-content: space-around;
  flex-direction: column;

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
.field{
  padding-bottom: 30px;
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
.modale{
  background-color: white;
    padding:40px 50px 0px 50px;
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
select{
    height:30px;
    width:300px;
    border-radius: 0px;
    border:2px solid var(--info);
    
}select:hover{
    box-shadow: inset 0px 0px 6px 2px var(--info);
    transition: .4s;

}
textarea{
    height:30px;
    width:300px;
    border-radius: 0px;
    border:2px solid var(--info);
    
}textarea:hover{
    box-shadow: inset 0px 0px 6px 2px var(--info);
    transition: .4s;

}
.input-group{
    padding-bottom:20px;
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
.close-btn{
    position: absolute;
    top:5px;
    right:5px;
    cursor:pointer;
   background-color:var(--danger);
   padding: 10px 15px 10px 15px;
   color:white
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
 label{
    display: inline-block;
    width: 100px;
    text-align: left;
    font-weight: bolder;
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

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  
}
h5{
  font-family: bitter;
  font-size: 20px;
}
</style>