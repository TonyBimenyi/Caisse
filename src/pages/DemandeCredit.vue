<template>
<div class="main-container">
<div class="text-right mt-3 ">
  </div>
<demande-credit-list />
</div>
    
</template>
<script>
import DemandeCreditList from '../components/DemandeCreditList.vue'
import ModaleDemandeCredit from '../components/ModaleDemandeCredit.vue'

export default {
  components: {DemandeCreditList, ModaleDemandeCredit  },
  data(){
    return {
      comptes : [],
      revele : false
      }
  },
  computed:{

  },
  methods: {
    toggleForm(){
      this.revele = !this.revele
    }
  },
    
}
</script>

<style scoped>
@media screen and (max-width: 576px) {
    .main-container {
      max-width: 430px;
    }  
  }
</style>