<template>
<div>
    <ul class="list-group display-5 text-left">
            <li class="list-group-item">
           Information
            </li>
            <li class="list-group-item">
            Nom et prénom : {{utilisateur .fullname}}
            </li>
            <li class="list-group-item">
            Epargne : {{utilisateur.somme_epargne}}
            </li>
            <li class="list-group-item">
            Epargne : {{utilisateur.somme_entraide}}
            </li>
            <li class="list-group-item">
            Epargne : {{profil.user.email}}
            </li>
            <li class="list-group-item">
            Nom d'utilisateur : {{profil.user.username}}
            </li>
    </ul>
</div> 
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            
        }
    },
    computed:{
        utilisateur(){
            return this.$store.state.user
        
        },
        header(){
            return{
				headers :{
					"Authorization" : `Bearer ${this.$store.state.user.access}`
				}
			}
        },
        profil(){
            return this.$store.state.profile
        }
    },
    mounted(){
        axios.get(this.$store.state.url+`/compte/${this.utilisateur.id}/`,this.header)
        .then(res => {
            this.$store.state.profile = res.data
        })
        .catch(err => {
            console.error(err); 
        })
    } 
}
</script>