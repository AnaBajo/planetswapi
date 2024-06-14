<template>
  <div>
    <planets-component />
    <!-- <planets-component-composition /> -->
    <old-planets-component />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlanetsComponent from '@/components/PlanetsComponent.vue'

export default defineComponent({
  name: 'OptionsApi',
  components: {
    PlanetsComponent
  },
});
</script>
