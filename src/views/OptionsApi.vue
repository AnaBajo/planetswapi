<template>
  <div class="video-background relative">
    <video autoplay muted loop class="bg-video hidden sm:block">
      <source src="@/assets/video/intro.mp4" type="video/mp4">
    </video>
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
