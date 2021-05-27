<template>
    <div>
    <h3>Liste des retraits</h3>
    <retrait-list />
    </div>
</template>

<script>

import RetraitList from '../components/RetraitList.vue'
export default {
  components: {RetraitList },
    
}
</script>

<style scoped>
h3{
  font-family: bitter;
  font-weight: bolder;
  font-size: 35px;
  margin-top:90px;

}
thead tr td{
  padding: 6px 10px 6px 10px;
}
tbody tr td{
  padding: 6px 10px 6px 10px;
}
@media screen and (max-width: 1100px) {   
    .table {
        width: 800px;
    }

    h3{
        font-size:25px;transition:.5s;
    }
}
  @media screen and (max-width: 576px) {
    .main-container {
      max-width: 430px;
    }  
  }
  @media screen and (max-width: 740px){
    h3{
      margin-top: 55px;
    }
  }
</style>