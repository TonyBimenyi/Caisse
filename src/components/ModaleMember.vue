<template>
    <div class="bloc-modale">
        <div class="overlay"> </div>
        <div class="modale card">
            <div class="btn btn-danger close-btn" @click="close">X</div>   
            <h5>{{titleModal}} </h5>
        <div class="card-modal mt-1">
            <div class="field mt-2">
                <label for="" class="mb-0">NOM</label>
                <input id="" v-model="form.user.first_name" class="form-control" type="text" placeholder="nom">
            </div>
            <div class="field mt-2">
                <label for="" class="mb-0">PRENOM</label>
                <input id="" v-model="form.user.last_name"  class="form-control" type="text" >
            </div>
            <div class="field mt-2">
                <label for="" class="mb-0">EMAIL</label>
                <input id="" v-model="form.user.email" class="form-control" type="email" >
            </div>
            <div class="field mt-2">
                <label for="" class="mb-0">TELEPHONE</label>
                <input id="" v-model="form.telephone" class="form-control" type="text" >
            </div>
            <div class="field mt-2">
                <label for="" class="mb-0">NOM D'UTILISATEUR</label>
                <input id="" v-model="form.user.username" class="form-control" type="text" >
            </div>
            <div class="field mt-2">
                <label for="" class="mb-0">MOT DE PASSE</label>
                <input id="" v-model="form.user.password" class="form-control" type="password" >
            </div>
            <div class="field mt-2">
                <label for="" class="mb-0">EPARGNE</label>
                <input id="" v-model="form.somme_epargne" class="form-control" type="number" >
            </div>
            <div class="field mt-2">
                <label for="" class="mb-0">ENTRAIDE</label>
                <input id="" v-model="form.somme_entraide" class="form-control" type="number" >
            </div>
            <div v-if="save"  class="field offset-md-6 col-md-6 ">
             <label for="" class="mb-0"> </label>
                 <button class="btn btn-info btn-block" @click="saveMember" >Enregistrer</button>
            </div>
            <div v-else class="field offset-md-6 col-md-6 ">
             <label for="" class="mb-0"> </label>
                 <button class="btn btn-warning btn-block" @click="updateMembre" >Modifier</button>
            </div>
        </div>
       </div>
    </div>
</template>
<script>

import axios from 'axios'
export default {
     props:["revele","toggleForm","selectedMembre"],
     data(){
         return{
            form:{
                    user: {
                    password: "",
                    is_superuser: false,
                    username: "",
                    first_name: "",
                    last_name:"",
                    email: ""
                },
                telephone: "",
                somme_epargne: null,
                somme_entraide: null
            },
            titleModal : "Nouveau Membre",
            val : {},
            save : true,
            membre_id : "",
         }
     },
     mounted() {
                
     },
     watch:{
         "$store.state.selectedMembre"(new_val){
            if(!!new_val){
               
                this.form.user.username = new_val.user.username
                this.form.user.is_superuser = new_val.user.is_superuser
                this.form.user.first_name = new_val.user.first_name
                this.form.user.last_name = new_val.user.last_name
                this.form.user.email = new_val.user.email
                this.form.telephone = new_val.telephone
                this.form.somme_epargne  = new_val.somme_epargne
                this.form.somme_entraide = new_val.somme_entraide
                this.membre_id = new_val.id                
                this.titleModal = "Modifier le Membre"
                this.save = !this.save
            }else{
                this.titleModal = "Nouveau Membre"
                this.save = true 
                this.membre_id = ""
            }      
         }
    }
    ,
  computed:{
        header(){
			return{
				headers :{
					"Authorization" : `Bearer ${this.$store.state.user.access}`
				}
			}
		},
    },
    methods: {
        saveMember(){
            axios.post(this.$store.state.url + "/compte/", this.form, this.header)
            .then(res => {
                console.log(res)
                this.$emit("updateMessage", "Enregistrement réussi")
                this.fetchData()
                this.close()
            })
            .catch(err => {
                alert("ERREUR")
                console.error(err); 
            })
        },
        updateMembre(){
            axios.patch(this.$store.state.url + "/compte/"+this.membre_id+"/",this.form ,this.header)
            .then(res => {
                this.$emit("updateMessage", "Modification réussi")
                this.fetchData()
                this.close()

            })
            .catch(err => {
                alert("ERROR")
                this.$emit("toggleForm")
                console.error(err); 
            })
        },
        close(){
            this.form={
                    user: {
                    password: "",
                    is_superuser: false,
                    username: "",
                    first_name: "",
                    last_name:"",
                    email: ""
                },
                telephone: "",
                somme_epargne: null,
                somme_entraide: null
            },
            this.$emit("close", null)
        },
        fetchData(){
      axios
      .get(this.$store.state.url + "/compte/?page=1", this.header)
      .then((res) => {
        console.log(res)
        this.$store.state.members = res.data.results;
        //this.page_counts = Math.ceil(res.data.count/this.$store.state.page_count)
        this.page_counts = Math.ceil(res.data.count/this.$store.state.page_count)
      })
      .catch((err) => {
        console.error(err);
      });
    }
    },
};
</script>
<style scoped>

.field label{
    color: rgb(175, 19, 19);
    text-align: left;
}
.field input{
    border: 1px solid rgb(66, 66, 66);
}
select{
    border: 1px solid black;
}
/* .field *{
    display: block!important;
} */
/** POUR LE MODAL */
.bloc-modale{
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 250;
}
.overlay{
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

}
.modale{
    position:fixed;
    top:10%;
    max-height: 100%;
    overflow-y: visible;
}
.card-modal{
    padding: 0 20px 90px;
    display: flexs;
    flex-wrap: wrap;
    justify-content: space-between;
}  
.card-modal .field{
    width: 48%;
}
.close-btn{
    position: absolute;
    top:5px;
    right:5px;
    cursor:pointer;
}
.card {
    max-width: 45rem;
    height: auto;
}
.modale{
  background-color: white;
    padding:40px 0px 0px 30px;
}
input{
    height:20px;
    width:150px;
    border-radius: 0px;
    border:2px solid var(--info);
    align-items: center;
    display: flex;
    justify-content: center;
}input:hover{
    box-shadow: inset 0px 0px 6px 2px var(--info);
    transition: .4s;

}
.field{
  padding-bottom: 5px;
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

@media screen and (max-width: 576px){
    .card{
        max-width: 25rem;
    }
    .card{
        display: block;
        height: 572px;
    }
    .card-modal .field {
        width: 100%;
    }
}
</style>
