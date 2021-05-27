<template>
	<div class="container">
		<div class="btn-grp">
			<button @click="somme_entraide" class="btn btn-info">
				somme entraide
			</button>
			<button @click="somme_epargne" class="btn btn-info">
				somme epargne
			</button>
			<input class="month-field" v-model="mois" type="month" name="" />
			<button @click="searchV" class="btn btn-primary">
				Rechercher
			</button>
			<button @click="fetchData" class="btn btn-primary">
				Afficher tout les dépôts
			</button>
		</div>

		<div class="table-area">
			<table class="table-content">
				<thead>
					<tr>
						<th>COMPTE</th>
						<th>MONTANT</th>
						<th>DATE</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="depot in $store.state.depots" :key="depot.id">
						<td>{{ depot.compte }}</td>
						<td>{{ formatNumber(depot.somme) }}</td>
						<td>{{ datetime(depot.date) }}</td>
					</tr>
                    <td>TOTAL</td>
                    <td>
                        <b>{{ formatNumber(totalDepot) }}</b>
                    </td>
                    <td></td>
					<tr></tr>

				</tbody>
			</table>
		</div>
		<div class="pagination" v-if="page_counts > 1">
			<button
				v-for="no in page_counts"
				:class="{ active: $route.params['current_page'] == no }"
				:key="no"
				@click="goto(no)"
			>
				{{ no }}
			</button>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			page_counts: 0,
			mois: "",
			depots: this.$store.state.depots,
		};
	},
	mounted() {
		this.getSeleData();
		// this.fetchData()
	},
	watch: {
		"$store.state.depots"(new_val) {
			// this.depots = new_val
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
		totalDepot() {
			let total = 0;
			for (let index = 0; index < this.depots.length; index++) {
				total += this.depots[index].somme;
			}
			return total;
		},
	},
	methods: {
		goto(no) {
			this.$router.push("/depot/" + no);
			this.fetchData();
		},

		getSeleData() {
			axios
				.get(this.$store.state.url + `/depot/me/`, this.header)
				.then((res) => {
					//console.log(res)
					this.$store.state.depots = res.data;
					//this.page_counts = Math.ceil(res.data.count/this.$store.state.page_count)
				})
				.catch((err) => {
					console.error(err);
				});
		},

		fetchData() {
			axios
				.get(
					this.$store.state.url +
						`/depot/?page=${this.$route.params.current_page}`,
					this.header
				)
				.then((res) => {
					//console.log(res)
					this.$store.state.depots = res.data;
					this.page_counts = Math.ceil(
						res.data.count / this.$store.state.page_count
					);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		somme_entraide() {
			this.depots = this.$store.state.depots.filter(
				(depot) => depot.details == "somme_entraide"
			);
		},
		somme_epargne() {
			this.depots = this.$store.state.depots.filter(
				(depot) => depot.details == "somme_epargne"
			);
		},
		searchV() {
			axios
				.get(
					this.$store.state.url + "/depot/month/" + this.mois + "/",
					this.header
				)
				.then((res) => {
					console.log(res);
					this.$store.state.depots = res.data;
				})
				.catch((err) => {
					console.error(err);
				});
			console.log(this.mois);
		},
	},
};
</script>
<style scoped>
.container{
	margin-top:0px;
}
.pagination button {
	padding: 5px 10px;
	margin: 2px;
	background-color: #0000;
}
button.active {
	background-color: #33bf7a;
}

.btn-grp {
    width: 900px;
    margin: 15px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}


.btn {
    font-size: 12px;
    text-transform: capitalize;
	margin-top:-15px;
}

.table-area {
	margin:0 auto;
    overflow-x: auto;
	
}
.table-content {
    margin-top: 15px;
	border-collapse: collapse;
	
}
tbody  td{
		padding: 8px 10px 8px 10px;
		border-bottom: 3px solid var(--special);
	}
thead th{
    padding: 7px 150px 7px 150px;
    background-color: dark;
    color: white;
	border-bottom:6px solid var(--special);
	
}
button:hover{
	cursor: pointer;
}

tbody tr:hover {
    background: #d7dde5;
    color: #2c3e50;
}
.month-field{
	height:39px;
	border:2px solid var(--special);
	margin-top:-15px;
	}

@media screen and (max-width: 800px) {
    
}
@media screen and (max-width: 600px) {
    .btn-grp {
        width: 100%;
        justify-content: space-between;
        align-content: space-between;
        min-width: 95px;
        height: 100px;
    }
    .btn {
        padding: 3px 8px;
        font-size: 14px;
    }
    input {
        height: 35px;
    }

    .table-content {
     
    }
	
}
@media screen and (max-width: 1100px){
	.thead th{
			
	}
	.table-area{
		margin-left: 5%;margin-right: 5%;
	}
	.btn{
		 padding: 9px 15px;
        font-size: 12px;
		transition: .5s;
		border:none;
	}
	.btn-grp {
        width: 100%;
        justify-content: space-between;
        align-content: space-between;
        min-width: 95px;
    }
	.month-field{
	width:250px;
	height:28px;
	border:2px solid var(--special);
	}
}
@media screen and (max-width: 750px){
	.btn-grp{
		display:flex;
		justify-content: center;
		flex-direction: row;
		transition: .5s;
	}
	.btn{
		width:140px;
		align-items: center;
		font-size:10px;
		margin-top:10px;
		transition: .5s;
	}
	.month-field{
	
	transition: .5s;
	position: absolute;margin-left: 50%px;margin-top: -30px;
	}
}
</style>
