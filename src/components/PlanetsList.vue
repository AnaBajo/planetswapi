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
          <tr v-for="planet in planets" :key="planet.name" class="text-left align-top border border-yellow-400 "> 
            <td class="p-4 font-semibold" >
              <router-link
                :to="{ name: 'planet-details', params: { id: planet.id } }">
                {{ planet.name }}
              </router-link>
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
        class="bg-black text-yellow-400 border border-yellow-400 rounded-xl px-4 py-2 mt-4
        hover:bg-yellow-400 hover:text-black transition duration-300"
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
import { defineComponent, PropType } from 'vue';
import { PlanetsArray } from '@/types';

// const filmsUrl = "https://swapi.dev/api/films/"

export default defineComponent({  
  props: {
    planets: {
    type: Array as () => PlanetsArray,
    required: true
    },
    fetchNextPage: {
      type: Function as PropType<() => void>,
      required: true
    },
    planetsUrl: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  }

  // data() {
  //   return {
  //     planetsUrl: "https://swapi.dev/api/planets/",
  //     // filmsUrl: "https://swapi.dev/api/films/",
  //     loading: false,
  //     planets: [] as Planet[],
  //     films: [] as Film[],
  //     planetsWithFilms: [] as PlanetWithFilms[],
  //   };
  // },
  // mounted() {
  //   this.fetchData();
  // },
  // methods: {
  //   async fetchPlanets(url: string) {
  //     try {
  //       const response = await fetch(url); 
  //       const planetsData = await response.json();
  //       this.planets = [...this.planets, ...planetsData.results];
  //       this.planetsUrl = planetsData.next;
  //     } catch (error) {
  //       console.error("Error fetching planets:", error);
  //     }
  //   },
  //   async fetchFilms(url: string) {
  //     try {
  //       const response = await fetch(url); 
  //       const filmsData = await response.json(); 
  //       // this.films = [...this.films, ...filmsData.results];
  //       // this.filmsUrl = filmsData.next; 
  //       this.films = filmsData.results;
  //     } catch (error) {
  //       console.error("Error fetching films:", error);
  //     } 
  //   },
  //   async fetchData() {
  //     try {
  //       this.loading = true;
  //       await this.fetchPlanets(this.planetsUrl);
  //       await this.fetchFilms(filmsUrl);
  //       // console.log(this.planets);
        
  //       const planetsWithFilms = this.planets.map((planet, index) => { 
  //         const associatedFilms = this.films
  //         .filter((film) => film.planets.includes(planet.url))
  //         .map((film) => {
  //           return {
  //             title: film.title 
  //           }
  //         });
  //         const id = parseInt(planet.url.split('/').filter(Boolean).pop() || `${index}`, 10);
  //         return {
  //           id,
  //           name: planet.name, 
  //           films: associatedFilms,
  //         };
  //       });
  //       this.planetsWithFilms = planetsWithFilms;
  //       console.log(this.planetsWithFilms);         
  //     } catch (error) {
  //       console.error("Error fetching planetsWithFilms:", error);
  //     } finally {
  //       this.loading = false;
  //     }
  //   },
  //   fetchNextPage() {
  //     if (this.planetsUrl) {
  //       this.fetchData();
  //     }
  //   },
  // },
});
</script>


