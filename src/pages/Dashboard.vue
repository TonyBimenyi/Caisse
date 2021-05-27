<template>
  <div>
  <planetChart />  
  </div>
</template>

<script>
import DashboardTemplate from '../components/DashboardTemplate.vue'
import PlanetChart from '../components/PlanetChart.vue'

export default {
  name: 'App',
  components: {
    PlanetChart,
    DashboardTemplate
  }
}
</script>