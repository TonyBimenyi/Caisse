<template>
	<div class="wrapper">
		<div class="content">
			<h1>REINITIALISATION DE MOT DE PASSE</h1>
			<label>Entre votre Email</label>

			<div v-if="message" class="alert alert-primary" role="alert">
				{{ message }}
			</div>
			<input
				class="form-control"
				type="text"
				v-model="email"
				placeholder="Entre votre email ici"
				name=""
			/>

			<div class="butn-grp">
				<button @click="demanderEmail" class="butn butn-success">
					Demander un email de réinitialisation
				</button>
				<button class="butn butn-return" @click="$emit('resetPassword')">
                    <i class="fa fa-arrow-left"></i>
					Retour
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			email: "",
			message: "",
		};
	},
	methods: {
		demanderEmail() {
			axios
				.get(this.$store.state.url + "/reset/" + this.email)
				.then((res) => {
					this.email = "";
					this.email =
						"veuillez consulter votre boîte mail " + this.email;
					console.log(res);
				})
				.catch((err) => {
					this.message = "email invalide";
				});
		},
	},
	computed: {},
};
</script>
<style scoped>
.wrapper {
	height: 100%;
	display: flex;
	justify-content: center;
	width: 600px;
}
.content {
	margin-top: 20%;
	width: 360px;
}
.content h1 {
	margin: 15px 0;
	color: #333;
	text-align: start;
	text-transform: uppercase;
}

input.form-control {
	border: 1px solid #3338;
	background: #fff;
	display: block;
	width: 100%;
	outline: none;
	height: 45px;
}
::-webkit-input-placeholder {
	color: #3338;
}
::placeholder {
    color: #3338;
}

.butn-grp {
    margin-top: 8px;
}
.butn {
	height: 35px;
    border-radius: 4px;
}
.butn-success {
	background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
    background-size: 200%;
	color: #fff;
    width: 100%;
    transition: .5s;
}
.butn-success:hover {
    background-position: right;
}
.butn-return {
    height: 28px;
    padding: 0 20px;
    display: block;
    margin-left: auto;
    margin-top: 5px;
    font-size: 15px;
    color: #fff;
    background: #dc3545;
}


@media screen and (max-width: 900px) {
    .content h1 {
        text-align: center;
    }
}
@media screen and (max-width: 600px) {
    .content {
        width: 280px;
    }
    .content h1 {
        font-size: ;
    }
}
</style>
