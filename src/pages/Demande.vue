<template>
    <div>
        <modale-demande v-bind:revele="revele" v-bind:toggleForm="toggleForm" @demandeSaved="toggleForm"  />
        <div class="text-center"><button class="btn btn-primary mt-2" type="button" @click="toggleForm" >Demander un credit</button></div>
    </div>
</template>
<script>
import ModaleDemande from '../components/ModaleDemande.vue'
export default {
    components:{ModaleDemande},
    data() {
        return {
            revele: false 
        }
    },
    methods: {
        toggleForm(){
            this.revele = ! this.revele
        },
    }
}
</script>

<style>

</style>