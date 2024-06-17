<template>
  <div>
    <planets-manager />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlanetsManager from "@/components/OptionsApi/PlanetsManager.vue";

export default defineComponent({
  name: "OptionsApi",
  components: {
    PlanetsManager,
  },
});
</script>
