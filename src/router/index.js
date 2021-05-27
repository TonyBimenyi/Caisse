import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../pages/Dashboard.vue'
import Membre from '../pages/Membre.vue'
import Demande from '../pages/Demande.vue'
import Amortissement from '../pages/Amortissement.vue'
import DemandeCredit from '../pages/DemandeCredit.vue'
import Credit from '../pages/Credit.vue'
import Depot from '../pages/Depot.vue'
import Retrait from '../pages/Retrait.vue'
import Depense from '../pages/Depense.vue'
import AmortissementList from '../pages/AmortissementList.vue'
import Profil from '../pages/Profil.vue'

Vue.use(VueRouter)

const routes = [
  { path: "/",name:"dashboard", component:dashboard, },
  { path: "/profil", name: "profil", component: Profil, },
  { path: "/membre/:current_page",name:"membre", component:Membre, },
  { path: "/demande", name: "demande", component: Demande, },
  { path: "/amortissement/", name: "amortissement", component: Amortissement, },
  { path: "/demande-credit", name: "demande-credit", component: DemandeCredit, },
  { path: "/credit", name: "credit", component: Credit, },
  { path: "/depot/:current_page", name: "depot", component: Depot, },
  { path: "/retait/:current_page", name: "retait", component: Retrait, },
  { path: "/depense/:current_page", name: "depense", component: Depense, },
  { path: "/amortissement-list/:credit_id", name: "amortissement-list", component: AmortissementList, },

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
