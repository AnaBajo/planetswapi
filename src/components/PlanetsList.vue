<template>
  <div class="container mx-auto flex items-center justify-center my-6">
    <div>
      <table class="text-left table-auto border border-yellow-400">
        <thead class="border-b border-yellow-300">
          <tr class="text-left align-top border-b border-yellow-300">
            <th class="p-4 text-lg border-l border-yellow-300">Planet Name</th>
            <th class="p-4 text-lg">Films</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="planet in planets"
            :key="planet.name"
            class="text-left align-top border border-yellow-400"
          >
            <td class="p-4 font-semibold">
              <div @click="selectPlanet(planet)">
                <router-link
                  :to="{ name: 'planet-details', params: { id: planet.id } }"
                  @click="selectPlanet(planet)"
                >
                  {{ planet.name }}
                </router-link>
              </div>
            </td>
            <td class="p-4">
              <ul>
                <li v-for="film in planet.films" :key="film.title">
                  {{ film.title }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        class="bg-black text-yellow-400 border border-yellow-400 rounded-xl px-4 py-2 mt-4 hover:bg-yellow-400 hover:text-black transition duration-300"
        v-if="planetsUrl"
        @click="fetchNextPage"
        :disabled="loading"
      >
        Load more
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PlanetsArray, Planet } from "@/types";
import { eventBus } from "@/eventBus";

export default defineComponent({
  props: {
    planets: {
      type: Array as () => PlanetsArray,
      required: true,
    },
    fetchNextPage: {
      type: Function as PropType<() => void>,
      required: true,
    },
    planetsUrl: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    selectPlanet(planet: Planet) {
      eventBus.emit("planetSelected", planet);
    },
  },
});
</script>
