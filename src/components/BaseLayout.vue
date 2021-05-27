<template>
	<!-- <div class="wrapper d-flex align-items-stretch">
    <div class="sidebar side">
      <div class="menu-items">
        <router-link
          to="/"
          active-class="active"
          tag="button"
          exact
          class="side-btn"
        >
   
          <div class="link-container">
            <span class="fa fa-tachometer mr-3"></span>
            <span class="link-name">Dashbord</span>
          </div>
        </router-link>
        <router-link v-if="user.is_admin"
          to="/depot/1"
          active-class="active"
          tag="button"
          exact
          class="side-btn"
        >
        <div class="link-container"  v-if="user.is_admin">
            <span class="fa fa-dollar mr-3"></span>
            <span class="link-name">DEPOT</span>
          </div>
        </router-link>
        <router-link
          to="/retait/1"
          active-class="active"
          tag="button"
          exact
          class="side-btn"
        >
          <div class="link-container">
            <span class="fa fa-dollar mr-3"></span>
            <span class="link-name">RETRAIT</span>
          </div>
        </router-link>
        <router-link
          to="/membre/1"
          active-class="active"
          tag="button"
          exact
          class="side-btn"
        v-if="user.is_admin">
          <div class="link-container" >
            <span class="fa fa-users mr-3"></span>
            <span class="link-name">Membre</span>
          </div>
        </router-link>


        <router-link
          to="/profil"
          active-class="active"
          tag="button"
          exact
          class="side-btn" v-if="!user.is_admin">
          <div class="link-container" >
            <span class="fa fa-users mr-3"></span>
            <span class="link-name">Profil</span>
          </div>
        </router-link>



        <router-link
          to="/credit"
          active-class="active"
          tag="button"
          exact
          class="side-btn"
        >
          <div class="link-container">
            <span class="fa fa-handshake-o mr-3"></span>
            <span class="link-name">CREDIT</span>
          </div>
        </router-link>

        <router-link
          to="/depense/1"
          active-class="active"
          tag="button"
          exact
          class="side-btn"
        >
          <div class="link-container" v-if="user.is_admin">
            <span class="fa fa-handshake-o mr-3"></span>
            <span class="link-name">DEPENSE</span>
          </div>
        </router-link>
      </div>
    </div> -->
	<!-- Page Content  -->
	<!-- <div id="content" class="">
      <div class="top sidebar"> 
        <div class="title">CREDIT ET EPARGNE</div>
        <div>
          <p class="text-right">
            <span class="pr-3"
              ><i class="fa fa-user fa-2x" aria-hidden="true"></i>
              {{ user.fullname }}</span
            >
            <span class="logout" @click="logout">
              <i class="fa fa-power-off fa-2x" aria-hidden="true"></i
            ></span>
          </p>
        </div>
      </div>
      <div class="container">
          <slot></slot>
        </div>
      </div>
    </div> -->

	<div class="wrapper">
			<!-- ===== Header area ===== -->
			<div class="header">
				<div class="left-area">
					
					<h1 class="main-title">credit et epargne</h1>
					
				</div>
				<div class="right-area">
					<div class="username">
						<i class="fa fa-user fa-2x" aria-hidden="true"></i>
						<span>{{ user.fullname }}</span>
					</div>
					<span class="logout" @click="logout">
						<i class="fa fa-power-off fa-2x" aria-hidden="true"></i>
					</span>
				</div>
			</div>
			<!-- ===== Header area end ===== -->

			<!-- ===== Sidebar menu area ===== -->
			<input type="checkbox" id="check">
					<label for="check" class="checkbtn"><i class="fa fa-bars menu-toggle"></i></label>
	
			<div class="sidebar">

				
				<router-link
					to="/"
					active-class="active"
			
					exact
					class="side-btn"
				>
					<div class="link-container">
						<i class="fa fa-tachometer"></i>
						<span class="link-name">Dashboard</span>
					</div>
				</router-link>

				<router-link
					v-if="user.is_admin"
					to="/depot/1"
					active-class="active"
					
					exact
					class="side-btn"
				>
					<div v-if="user.is_admin" class="link-container">
						<i class="fa fa-dollar"></i>
						<span class="link-name">DEPOT</span>
					</div>
				</router-link>

				<router-link
					to="/retait/1"
					active-class="active"
				
					exact
					class="side-btn"
				>
					<div class="link-container">
						<i class="fa fa-undo"></i>
						<span class="link-name">RETRAIT</span>
					</div>
				</router-link>

				<router-link
					to="/membre/1"
					active-class="active"
			
					exact
					class="side-btn"
					v-if="user.is_admin"
				>
					<div class="link-container">
						<i class="fa fa-users"></i>
						<span class="link-name">Membre</span>
					</div>
				</router-link>

				<router-link
					to="/profil"
					active-class="active"
					tag="button"
					exact
					class="side-btn"
					v-if="!user.is_admin"
				>
					<div class="link-container">
						<span class="fa fa-users mr-3"></span>
						<span class="link-name">Profil</span>
					</div>
				</router-link>

				<router-link
					to="/credit"
					active-class="active"
				
					exact
					class="side-btn"
				>
					<div class="link-container">
						<i class="fa fa-handshake-o"></i>
						<span class="link-name">CREDIT</span>
					</div>
				</router-link>

				<router-link
					to="/depense/1"
					active-class="active"
				
					exact
					class="side-btn"
				>
					<div v-if="user.is_admin" class="link-container">
						<i class="fa fa-exchange"></i>
						<span class="link-name">DEPENSE</span>
					</div>
				</router-link>
			</div>
		<!-- ===== Sidebar menu area end ===== -->
		<!-- ===== Main container ====== -->
		<div class="main-container">
			<slot></slot>
		</div>
		<!-- ===== Main container end ====== -->
		<!---------FOOTER------------>
		<footer>
			<div class="footer-container">
				<div class="text">
					<h3>Copyright CSD ©2021||Developed and Designed by HOGI</h3>
				</div>
			</div>
		</footer>
	</div>
	
</template>

<script>
export default {
	data() {
		return {
			user: this.$store.state.user,
			showCredit: false,
		};
	},
	methods: {
		logout() {
			if (confirm("êtes vous sur de vouloir vous deconnecter?")) {
				localStorage.removeItem("user");
				window.location = "/";
			}
		},
		toggleShowForm() {
			this.showCredit = !this.showCredit;
		},
	},
};
</script>
<style scoped>
.checkbtn{
	color:white;font-size: 30px;
	display: none;
}
#check{
	display:none
}
.checkbtn:hover{
	cursor:pointer;
}
@media screen and (max-width:800px) {
	.right-area .logout{
	margin-right: 5%;margin-top:0px;
}
    .main-title{
	font-size: 23px;padding:-40px;
	transition:.5s;
	margin-top:7px;
	text-transform: uppercase;font-weight: bolder;
	text-transform: capitalize;
}
.right-area{
	display: flex;
	justify-content: flex-end;
	margin:5px 5% 0px 5px;
}
.username{
	font-weight: bolder;
	font-size: 13px;
	transition:.5s;
}
.logout i{
	font-size: 18px;
	transition:.5s;
	margin-top:9px;
	padding-left:9px;
}
}
/******FOOTER START************ */

.footer-container{
	background-color:var(--special);
	padding:15px 0px 15px 0px;
	display: flex;
	justify-content: center;
	position:fixed;
	width:100%;
	bottom:0;
	z-index: 1;
}
.footer-container h3{
	color:white;
	font-size: 13px;

}

/*********FOOTER END *********** */
@media screen and (max-width: 740px){
	.footer-container{
		padding:7px 0px 7px 0px;
		transition: .5s;
	}
	.footer-container h3{
		font-size:10px;
	}
	.checkbtn{
		margin-top:-5px;margin-bottom: 0px;
		color:white;font-size: 30px;
		display: flex;padding: 10px 20px 10px 20px;
		transition: .5s;
		background-color:var(--special);
		z-index: 1;
		position:fixed;
		width:100%;
		
	}
	 .sidebar{
		 position: fixed;
		height: 250px;
		display: flex;
		flex-direction: column;	
		margin-top:45px;
		width: 92%;left:-120%;
		line-height: 40px;
		transition: all .5s;
			z-index:3;
		
	}
	.link-menu{
		color: white;
		z-index: 0;
	}
	
	.link-container span{
			color:white;
		
	}
	.link-container span:hover{
		color:var(--special);
		transition: .5s;
	}
	.link-container:hover{
		background-color: white;
		color:var(--special);
	}
	
	.active{
		background-color: white;
		
	}
	.active span{
		color:var(--special)
	}
	.active i{
		color:var(--special)
	}
	#check:checked ~ .sidebar{
		left:0%;

	}
	
}
	


</style>
