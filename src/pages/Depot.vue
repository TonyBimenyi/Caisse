<template>
	<div>
		<div>
			<button class="btn btn-info" @click="genererRetrait">
				Générer les depôts
			</button>
			{{ response }}
		</div>

		<depot-liste />
	</div>
</template>

<script>
import axios from "axios";
import DepotListe from "../components/DepotListe.vue";
export default {
	components: { DepotListe },
	data() {
		return {
			response: "",
		};
	},
	methods: {
		genererRetrait() {
			axios
				.get(this.$store.state.url + "/depot/generate/", this.header)
				.then((res) => {
					this.response = "opération terminé";
				})
				.catch((err) => {
					// console.error(err);
					this.response = "already generated";
				});
		},
	},

	computed: {
		header() {
			return {
				headers: {
					Authorization: `Bearer ${this.$store.state.user.access}`,
				},
			};
		},
	},
};
</script>


<style scoped>
button{
background-color:var(--special);
border:3px solid var(--special);
cursor: pointer;
margin-top:90px;
color:white;
padding:15px 25px 15px 25px;border-radius: 5px;


}
@media screen and (max-width: 1100px){

	.btn{
		 padding: 12px 19px;
        font-size: 12px;
		transition: .5s;
		border:none;

	}
	.btn:hover{
		padding: 15px 23px;
	}
	.btn-grp {
        width: 100%;
        justify-content: space-between;
        align-content: space-between;
        min-width: 95px;
    }
}
@media screen and (max-width: 740px){
	.btn{
		margin-top:55px;
		
	}
}
</style>
