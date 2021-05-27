<template>
  <div class="table-container">
    <div class="buttons">
      <button @click="getActiveUser" class="btn btn-sm btn-primary mr-3">Liste des membres actifs</button>
      <button @click="getDesactiveUser" class="btn btn-sm btn-primary">Liste des membres Désactivés</button>
    </div>
    <table class="table">
      <thead class="text-center">
        <tr>
          <td>NOM ET PRENOM</td>
          <td>COMPTE</td>
          <td>TELEPHONE</td>
          <td>EPARGNE</td>
          <td>ENTRAIDE</td>
          <td>ACTION</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
        <tr v-for="membre in members" :key="membre.id">
          <td>{{ membre.user.first_name }} {{ membre.user.last_name }}</td>
          <td>{{ membre.num_compte }}</td>
          <td>{{ membre.telephone }}</td>
          <td>{{ formatNumber(membre.somme_epargne) }}</td>
          <td>{{ formatNumber(membre.somme_entraide) }}</td>
          <td class="d-flex"> 
          <button v-if="user.is_admin && user.id == membre.id  && membre.user.is_active" class="btn-sm btn-info mr-2" @click="modifierMembre(membre)">Modifier</button> 
          <button v-if="user.is_admin  && membre.user.is_active " class="btn-sm btn-info mr-2" @click="gestionnaireMembre(membre)">
          <span v-if="membre.user.is_superuser  && membre.user.is_active" class="">Destituer </span>
          <span v-if="!membre.user.is_superuser  && membre.user.is_active">Gestionnaire</span>
          </button> 
          <button v-if="user.is_admin && membre.user.is_active" class="btn-sm btn-danger" @click="deleteMember(membre)">Désactiver</button> 
          <button v-else class="btn btn-info" @click="activerMember(membre)"> Activer</button>
          </td>
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
import axios from "axios";
import ModaleMember from './ModaleMember.vue';
export default {
  components: { ModaleMember },
  props:["revele","toggleForm","membre","searchName"],
  data() {
    return {
      members: this.$store.state.members,
       page_counts:0,
    };
  },
  watch: {
    "$store.state.members"(new_val) {
      this.members = new_val;
    },
    "$store.state.keyword"(new_val) {
      let member = "";
      this.members = this.$store.state.members.filter(x => {
        member = JSON.stringify(x)
        return member.toLocaleLowerCase().includes(new_val.toLocaleLowerCase())
      })
    },
    searchName(){
      // this.$store.members =  this.members.filter(membre => membre.user.first_name.includes(this.searchName))
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
    nombrePage() {
      return Math.ceil(this.members.count / this.members.results.length);
    },
    user(){
      return this.$store.state.user
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      axios
      .get(this.$store.state.url + "/compte/?page="+this.$route.params['current_page'], this.header)
      .then((res) => {
        console.log(res)
        this.$store.state.members = res.data.results;
        //this.page_counts = Math.ceil(res.data.count/this.$store.state.page_count)
        this.page_counts = Math.ceil(res.data.count/this.$store.state.page_count)
      })
      .catch((err) => {
        console.error(err);
      });
    },
    getActiveUser(){
      this.members = this.$store.state.members.filter(item => item.user.is_active )
    },
    
    getDesactiveUser(){
      this.members = this.$store.state.members.filter(item => !item.user.is_active )
    },
    
    
    gestionnaireMembre(m){
      const current_droit = !m.user.is_superuser
      let number = Math.floor(Math.random() * 99999);  
      var givenNumber = prompt("Tapez : " + number + " Pour confirmer");
      const data = {
        user:{
              is_superuser: current_droit
            }

      }
      if(givenNumber == number){ 
        axios.patch(this.$store.state.url +"/compte/"+m.id+"/",data,this.header)
        .then(res => {

          if(current_droit){
            alert("GESTIONNAIRE")
          }else{
            alert("DESTITUER")
          }
         
          this.fetchData()
        })
        .catch(err => {
          alert("ERROR")
        })
      }
    },

     modifierMembre(mebre_recu) {  
      this.$store.state.selectedMembre = mebre_recu
      this.$emit("modifierMembre",{})
    },
    deleteMember(membre){
      const response = confirm("Are you sure ? ");

      if(response){
          axios.delete(this.$store.state.url +"/compte/"+membre.id+"/",this.header)
            .then(res => {
          console.log(res)
          this.$store.state.members = this.$store.state.members.filter(c => c.id != membre.id )
          alert("REUSSI")
          })
          .catch(err => {
             alert("ERROR")
          })
      }
    },

    activerMember(membre){
       const response = confirm("Are you sure ? ");

      if(response){
         const data = {
        user:{
              is_active: true
            }

      }
        axios.put(this.$store.state.url +"/compte/"+membre.id+"/",data,this.header)
        .then(res => {

          this.fetchData()
        })
        .catch(err => {
          alert("ERROR")
        })
      }

    },
    goto(no){
      this.$router.push("/membre/"+no);
      this.fetchData()
    }

  },

};
</script>

<style scoped>
thead tr td{
  padding: 6px 10px 6px 10px;

}
.table-container {
   margin:0 auto;
   overflow-x: auto;
  width: 100%;
}
table{
  border-collapse: collapse;  
}

.table-container button{
background-color:var(--cyan);
border:none;
align-items: center;
padding:8px 18px 8px 18px;border-radius: 5px;color:white;
margin-top: -70px;
font-size:17px;
font-weight: bold;
margin-bottom: 20px;

}
.buttons button{
    font-size: 13px;
  margin-top:10px;
  padding:10px 10px 10px 10px;
  margin-left:30px;
}
.table-container button:hover{
    background-color: cyan;
    cursor: pointer;
    color: black;
    transition:.3s;
}

tbody tr td{
  padding: 6px 10px 6px 10px;
}
thead tr td{
    padding: 13px 40px 13px 40px;
    background-color:dark;
    border-bottom: 6px solid var(--special);
    font-size: 15px;
    color: #fff;
    font-weight: bold;
    
}
tbody td{
 padding: 10px 10px 10px 10px;
 border-bottom:2px solid black;

}

/* td{
    padding: 1px;
} */
@media screen and (max-width: 576px) {
  .table-container{
    overflow-x: auto;
  }
}
button{
  margin-bottom:20px;
}
@media screen and (max-width: 600px) {
    
    .table {
        
    }
	
}
@media screen and (max-width: 1100px) {
  .table-container button{
    padding:10px;
    font-size:11px ;transition: .5s;
  }
  .table-container {
    margin-right:10%;

  }
  thead tr td{
    padding:10px 20px 10px 20px;transition: .5s;
  }
}
</style>
