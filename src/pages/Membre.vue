
<template>
    <div> 
        <div class="d-flex justify-content-between w-100">
          <searchbar/>
          <div v-if="messageInfo"> 
          <div class="alert alert-primary" role="alert">
              {{messageInfo}} 
          </div>
          </div>
          <button class="btn btn-primary mt-3" @click="toggleForm">Ajouter un membre</button>
        </div>
      <ModaleMember  @updateMessage="updateMessage" :class="{'hidden':!revele}" @close="revele=false" :selectedMembre="selectedMembre"/>
      <div class="title">  <span class="d-inline-block text-center mt-4 btn btn-info">Liste des membres </span></div>
        <member-list @modifierMembre="modifierMembre" @toggleForm="toggleForm" :searchName="searchName" class=" mt-3"/>
        </div>
</template>

<script>
import MemberList from '../components/MemberList.vue'
import ModaleMember from '../components/ModaleMember.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { MemberList, ModaleMember,searchbar },
  data() {
      return {
          revele : false,
          selectedMembre : {},
          searchName : "",
          messageInfo : ""
      }
  },
  methods: {
       toggleForm(){
             this.selectedMembre = {}
            this.revele = !this.revele 
            
        },
        modifierMembre(ele){
          this.revele = true;
         
        },
        updateMessage(message){
          this.messageInfo=  message
        }
        
    }
 }; 
</script>
<style scoped>
button{
background-color:indianred;
border:none;
float: right;
padding:12px 18px 12px 15px;border-radius: 5px;color:white;
margin-top: 60px;
font-size:16px;
font-weight: bold;
margin-bottom: 20px;
margin-right: 50px;
}
.title{
  margin-bottom: 90px;margin-top:90px;
}
span{
  font-family: bitter;
  font-size:30px;
  font-weight:bolder;
  margin-top:400px;

}
button:hover{
    background-color: cyan;
    cursor: pointer;
    color: black;
    transition:.3s;
}
  .hidden{
    display: none;
  }
  
  @media screen and (max-width: 1100px){
      span{
        font-size: 25px;transition: .5s;
      }
      button{
        padding:7px 10px 7px 10px;transition: .5s;
        font-size:13px;
      }
  } 
  @media screen and (max-width: 600px) {
      span{
        font-size: 10px;transition: .5s;
        transition: .5s;
   
      }
  }
  @media screen and (max-width: 740px){
    .title{
      margin-top: 55px;transition: .5s;
    }
  }
</style>