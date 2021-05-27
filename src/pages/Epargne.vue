<template>
    <div> 
            <div class="text-right">
                <searchbar />
             <button class="btn btn-primary mt-3" v-bind:epargne="epargne" @click="showModal">Nouvel Epargne</button>
             <modale-epargne v-bind:epargne="epargne" v-bind:revele="revele" v-bind:toggleForm="toggleForm" />
             
            <epargne-list @modifierEpargner="modifierEpargner" class=" mt-3"/>
        </div>
    </div>
</template>

<script>
import EpargneList from '../components/EpargneList.vue'
import ModaleEpargne from '../components/ModaleEpargne.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { EpargneList, ModaleEpargne, searchbar },
    data(){
        return {
        revele : false,
        epargne :{
            versement : "",
            epargne : {
                membre : {
                    num_compte : ""
                }
            }
        },
        }
    },
    mounted() {
    },
    computed:{
        header(){
            return{
                headers:{
                    "Authorization" : `Bearer  ${this.$store.state.user.access }`
                }
            }
        }
    },
    methods: {
        toggleForm(){
            this.revele = ! this.revele
        },
        modifierEpargner(e){
            this.toggleForm()
            this.epargne = e
        },
        showModal(){
             this.toggleForm()
             this.epargne = {
                membre : {
                    num_compte : ""
                }
            }
        }
    },
}
</script>