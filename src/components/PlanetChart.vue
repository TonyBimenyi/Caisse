<template>
  <div class="row">
    <div class="cards">
      <div class="card-part1">
     <div class="card1">
              <div class="count_view blue  ">
                <div class="count_list">
                  <h2>CAPITAL</h2>
                  <p>{{formatNumber(comptePrincipal.somme_epargne + comptePrincipal.somme_entraide)}} FBU</p>
                </div>
                <div class="detail_list_icon">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
              </div>
      </div>
      
            <div class="card2">
                <div class="count_list">
                  <h2>EPARGNE</h2>
                  <p>{{formatNumber(comptePrincipal.somme_epargne || 0)}} FBU</p>
                </div>
                <div class="detail_list_icon">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
          
        </div>

        <div class="card3">
              <div class="count_view green">
                <div class="count_list">
                  <h2>Caisse Sociale</h2>
                  <p>{{ formatNumber(comptePrincipal.somme_entraide || 0) }} FBU</p>
                </div>
                <div class="detail_list_icon">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
              </div>
        </div>
      </div>

      <div class="card-part2">
          
              <div class="card1">
                <div class="count_list">
                  <h2>Intérêt</h2>
                  <p>{{ formatNumber(comptePrincipal.benefice || 0) }} FBU</p>
                </div>
                <div class="detail_list_icon">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
            
          </div>

          
              <div class="card2">
                <div class="count_list">
                  <h2>DEPENSE D'EPARGNE</h2>
                  <p>{{ formatNumber(comptePrincipal.depenses_epargne || 0) }} FBU</p>
                </div>
                <div class="detail_list_icon">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
              </div>
        
              <div class="card3">
                <div class="count_list">
                  <h2>Dépense sociale</h2>
                  <p>{{ formatNumber(comptePrincipal.depenses_entraide || 0) }} FBU</p>
                </div>
                <div class="detail_list_icon">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
            </div>
      </div>
          </div>
        
        
          <div class="table-container">
            
                <div class="btn-cloture">
                       <button type="button" class="float-left mb-3 btn btn-outline-danger mt-3 red" @click="clotureExercice">Cloturer l'exercice</button>
                </div>                                                                    

            <div class="col-md=12">
              <table class="table table">
              <thead>
              <tr>
                <th>EPARGNE</th>
                <th>Caisse Sociale</th>
                <th>Intérêt</th>
                <th>DATE</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
                <tr v-for="exercice in exercices" :key="exercice.id">
                  <td>{{ formatNumber(exercice.somme_epargne) }}</td>
                  <td>{{ formatNumber(exercice.somme_entraide) }}</td>
                  <td>{{ formatNumber(exercice.benefice) }}</td>
                  <td>{{  exercice.created_at }}</td>
                </tr>
              </table>
            </div>
          </div>
  </div>
</template>
<script>

import axios from 'axios'

export default {
  name: 'PlanetChart',
  data() {
    return {
       creditEl : 0,
       membreEl : 0,
       revele : false,
    }
  },
  mounted() {
    this.get_current();
    this.getExercice();
   
  },
  methods: {
    get_current(){
       axios.get(this.$store.state.url+"/exercice/get_current/",this.header)
        .then(res => {
          this.$store.state.comptePrincipal = res.data;
          
        })
        .catch(err => {
          console.error(err); 
        })
    },
    getExercice(){
      axios.get(this.$store.state.url+"/exercice/",this.header)
      .then(res => {
        //console.log(res)
        this.$store.state.exercices = res.data.results;
      })
      .catch(err => {
        console.error(err); 
      })

    },
    clotureExercice(){
      // console.log(this.$store.state.user)
      var a = prompt("Entre votre nom pour la confirmation : "+ this.user.fullname, "");

      if(a && (a.toLowerCase() == this.user.fullname.toLowerCase())){
      
      axios.get(this.$store.state.url+"/exercice/cloturer/",this.header)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err); 
      })

      }else{
      
      }
    }
  },
  computed:{
      header(){
              return{
          headers :{
            "Authorization" : `Bearer ${this.$store.state.user.access}`
          },
        }
      },
      user(){
        return this.$store.state.user;   
      },
      comptePrincipal(){
        return this.$store.state.comptePrincipal
      },
      exercices(){
        return this.$store.state.exercices
      }
    }
}
</script>
<style scoped>
.table-container{
  overflow-x: auto;
 

}
.table{
	margin:0 auto;
 overflow-x: auto;
  border-collapse: collapse;
}
tbody  td{
	padding: 5px 10px 5px 10px;
	}
thead th{

    padding: 10px 90px 10px 90px;
    background-color:grey;
    border-bottom: 6px solid var(--special);
    color: #fff;
}
@media screen and (max-width: 720px){
  .cards{
    width:100%;
   
  }
  .card-part1{
    display: flex;
    justify-content: center;
    flex-direction: column ;
  }
  .card-part1 .card1{
     height: 80px;
     width:100%;
     margin-top:8px;padding-top:5px;
     border-radius: 0px;
  }
  .card-part1 .card2{
     height: 80px;
     width:100%;
     margin-top:8px;padding-top:5px;
     border-radius: 0px;
  }
  .card-part1 .card3{
     height: 80px;
     width:100%;
     margin-top:8px;padding-top:5px;
     border-radius: 0px;
  }
  .card-part2{
    display: flex;
    justify-content: center;
    flex-direction: column ;
  }
  .card-part2 .card1{
     height: 80px;
     width:100%;
     margin-top:8px;padding-top:5px;
     border-radius: 0px;
  }
  .card-part2 .card2{
     height: 80px;
     width:100%;
     margin-top:8px;padding-top:5px;
     border-radius: 0px;
  }
  .card-part2 .card3{
     height: 80px;
     width:100%;
     margin-top:8px;padding-top:5px;
     border-radius: 0px;
  }
  .table{
    max-width: 6000px;
  }
  .table-container{
    margin-left: 5%;margin-right: 5%;
  }
}
@media screen and (max-width: 740px){
    .cards{
      margin-top:10px;transition: .5s;
    }
  }


</style>

