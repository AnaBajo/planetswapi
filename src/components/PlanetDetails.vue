<template>
  <div
    v-if="selectedPlanet"
    class=" flex items-center justify-center my-6 mx-auto"
  >
    <div class="max-w-xs md:max-w-screen-lg">
      <table class="text-left align-top table-auto border border-yellow-400">
        <tbody>
          <tr
            v-for="(value, key) in selectedPlanet"
            :key="key"
            class="border-b border-yellow-300"
          >
            <td class="text-lg align-top font-semibold p-4">
              {{ capitalizeKey(key) }}
            </td>
            <td class="p-4">
              <div v-if="key === 'films'">
                <ul>
                  <li
                    v-for="film in selectedPlanet.films"
                    :key="film.title"
                    class="pb-2"
                  >
                    {{ film.title }}
                  </li>
                </ul>
              </div>
              <div v-else-if="key === 'residents'">
                <ul>
                  <li
                    v-for="resident in selectedPlanet.residents"
                    :key="resident.name"
                    class="pb-2"
                  >
                    {{ resident.name }}
                  </li>
                </ul>
              </div>
              <div v-else-if="key === 'created' || key === 'edited'">
                {{ formatDate(value as string) }}
              </div>
              
              <div v-else :class="{ 'text-xs': key === 'url' }">
                {{ value }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        @click="goBack"
        class="bg-black text-yellow-400 border border-yellow-400 rounded-xl px-4 py-2 hover:bg-yellow-400 hover:text-black transition duration-300 mt-4"
      >
        Back
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Planet } from "@/types";
import { eventBus } from "@/eventBus";

export default defineComponent({
  data() {
    return {
      selectedPlanet: null as Planet | null,
    };
  },
  mounted() {
    eventBus.on("planetSelected", (planet: Planet) => {
      this.selectedPlanet = planet;
    });
    console.log(
      "PlanetDetails/mounted()/this.planetSelected",
      this.selectedPlanet
    );
  },
  methods: {
    formatDate(value: string) {
      return new Intl.DateTimeFormat("en-US").format(new Date(value));
    },
    capitalizeKey(key: string) {
      return key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>
