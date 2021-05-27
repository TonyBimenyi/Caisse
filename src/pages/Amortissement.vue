<template>
<div>
<h2> AMORTISSEMENT</h2>
<amortissement-component />
</div> 
</template>

<script>
import AmortissementComponent from '../components/AmortissementComponent.vue'
export default {
    components:{
        AmortissementComponent

    },
    data() {
        return {
            date_debut : "",
            montant: "",
            dure: "",
            taux: "",
            taux_assurance : ""
            
        }
    },
    methods: {
        
    },
    
}
</script>

<style scoped>
h2{
    font-family: bitter;
    margin-top:90px;
    margin-bottom:10px;
    font-weight: bolder;
    font-size: 25px;
}
@media screen and (max-width: 740px){
	h2{
		margin-top:55px;
		
	}
}
</style>