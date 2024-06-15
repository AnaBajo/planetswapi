<template>
  <div v-if="planet" class="container flex items-center justify-center my-6 mx-auto">
    <div class="max-w-xs md:max-w-screen-lg">
      <table class="text-left align-top table-auto border border-yellow-400">
        <tbody >
          <tr v-for="(value, key) in planet" :key="key" class=" border-b border-yellow-300">
            <td class="text-lg align-top font-semibold p-4">{{ capitalizeKey(key) }}</td>
            <td class="p-4 ">
              <div v-if="key === 'films'">
                <ul>
                  <li v-for="film in (value as Film[])" :key="film.title" class="pb-2">{{ film.title }}</li>
                </ul>
              </div>
              <div v-else-if="key === 'residents'">
                <ul>
                  <li v-for="resident in (value as Resident[])" :key="resident.name" class="pb-2">{{ resident.name }}</li>
                </ul>
              </div>
              <div v-else-if="key === 'created' || key === 'edited'">
                {{ formatDate(value as string) }}
              </div>
              <div v-else>
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
import { defineComponent } from 'vue';
import { Planet, Film, Resident } from '@/types';

export default defineComponent({
  data() {
    return {
      planet: null as Planet | null,
    };
  },
  async mounted() {
    try {
      const planetIdParam = this.$route.params.id as string;
      // const planetName = this.$route.params.name;
      // const planetId = Array.isArray(planetIdParam) ? planetIdParam[0] : planetIdParam;
      const idNr = parseInt(planetIdParam, 10);

      const url = `https://swapi.dev/api/planets/${idNr}/`;
      const response = await fetch(url);
      const planetData = await response.json();

      if (planetData) {
        const films = await this.fetchFilms(planetData.films);
        const residents = await this.fetchResidents(planetData.residents);

        this.planet = {
          // id: idNr,
          name: planetData.name,
          rotation_period: planetData.rotation_period,
          orbital_period: planetData.orbital_period,
          diameter: planetData.diameter,
          climate: planetData.climate,
          gravity: planetData.gravity,
          terrain: planetData.terrain,
          surface_water: planetData.surface_water,
          residents: residents,
          population: planetData.population,
          films: films,
          created: planetData.created,
          edited: planetData.edited,
          url: planetData.url
        };
      } else {
        console.error('Planet data is not available');
      }
    } catch (error) {
      console.error('Error fetching planet data:', error);
    }
  },
  methods: {
    formatDate(value: string) {
      return new Intl.DateTimeFormat('en-US').format(new Date(value));
    },
    capitalizeKey(key: string) {
      return key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    async fetchFilms(filmUrls: string[]): Promise<Film[]> {
      const filmPromises = filmUrls.map(async (url) => {
        const response = await fetch(url);
        const filmsData = await response.json();
        return {
          title: filmsData.title,
          planets: filmsData.planets,
          url: filmsData.url,
        };
      });
      return await Promise.all(filmPromises);
    },
    async fetchResidents(residentUrls: string[]): Promise<Resident[]> {
      const residentPromises = residentUrls.map(async (url) => {
        const response = await fetch(url);
        const residentsData = await response.json();
        return {
          name: residentsData.name,
        };
      });
      return await Promise.all(residentPromises);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
});
</script>
