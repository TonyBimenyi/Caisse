<template>
  <div id="app">
    <div class="main" v-if="logged_in">
      <base-layout>
     <router-view/>
    </base-layout>
    </div>
    <div v-else>
      <login />
    </div>
    
  </div>
</template>

<script>
import BaseLayout from './components/BaseLayout.vue'
import Login from './components/Login.vue'
export default {

 components: { BaseLayout, Login},
    data(){
      return {
        logged_in: !!this.$store.state.user
       
      }
    },
    watch:{
      "$store.state.user" : {
        deep : true,
        handler(new_val){
          localStorage.setItem('user', JSON.stringify(new_val));
         
          if(!!new_val.access){
            this.logged_in = true;
          }
        }
      }
    },
    mounted(){
        var user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          this.$store.state.user = user;
          this.logged_in = false;
        } else {
          console.warn("il y'a pas de session");
        }
    },
    methods:{
      performLogin(user){
        console.log(user)
        this.logged_in=true;
      },
    }

   
  
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* styles of tables */
.table{
  border-radius: 5px;
}
thead{
  background: #212529;
  color: white;
  text-align: center; 
  border-radius: 5px;
  text-align: center;
  padding: 5px 12px;
}

</style>

