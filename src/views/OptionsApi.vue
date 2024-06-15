<template>
  <div>
    <planets-manager />
    <!-- <planets-list /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import PlanetsList from '@/components/PlanetsList.vue'
import PlanetsManager from '@/components/PlanetsManager.vue'

export default defineComponent({
  name: 'OptionsApi',
  components: {
    // PlanetsList
    PlanetsManager
  },
});
</script>
