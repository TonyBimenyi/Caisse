import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


Vue.mixin({
  methods: {
    money(x) {
      if (x == undefined) return 0;
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    datetime(x) {
      if (!x) return "-"
      let date = new Date(x);
      return new Intl.DateTimeFormat(
        'en-GB',
        { dateStyle: 'short', timeStyle: 'short' }
      ).format(date)
    },
    formatNumber(number){
      return new Intl.NumberFormat('de-DE').format(number)
    },
     dateWithMonthsDelay(d ,months) {
       const date = new Date(d)
        date.setMonth(date.getMonth() + months)

  return date
  }
  },
  computed: {
    connectedUser() {
      return this.$store.state.user;
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
