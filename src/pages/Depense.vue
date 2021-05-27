<template>
	<div>
		<div class="text-rigth">
			<button
				@click="toggleForm"
				type="button"
				class="btn btn-primary"
				style="font-size:14px;"
			>
				<i class="fa fa-plus"></i> Nouvel Depense
			</button>
		</div>
		<depense-liste @updateDepense="updateDepense" />
		<modal-depense
			:depense="depense"
			@close="toggleForm"
			:revele="revele"
			:toggleForm="toggleForm"
		/>
	</div>
</template>

<script>
import DepenseListe from "../components/DepenseListe.vue";
import ModalDepense from "../components/ModalDepense.vue";
export default {
	components: { DepenseListe, ModalDepense },
	data() {
		return {
			revele: false,
			depense: null,
		};
	},
	methods: {
		toggleForm() {
			this.revele = !this.revele;
		},
		updateDepense(val) {
			this.depense = val;
			this.toggleForm();
		},
	},
};
</script>

<style scoped>
button{
	padding:10px 40px 10px 40px;
    background-color: white;
    border:4px solid var(--dark);
    font-size: 20px;
    color:black;
    border-radius: 5px;
	margin-top:90px;
	margin-bottom:20px;

}
button:hover{
	cursor: pointer;
}
@media screen and (max-width: 576px) {
	.main-container {
		max-width: 430px;
	}
	
}
@media screen and (max-width: 1100px){
		button{
			padding:5px 18px 5px 18px;transition: .5s;
		
		}
	}
@media screen and (max-width: 740px){
    button{
      margin-top: 55px;transition: .5s;
    }
  }
</style>
