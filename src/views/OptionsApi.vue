<template>
  <div>
    <planets-manager />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlanetsManager from "@/components/PlanetsManager.vue";

export default defineComponent({
  name: "OptionsApi",
  components: {
    PlanetsManager,
  },
});
</script>
