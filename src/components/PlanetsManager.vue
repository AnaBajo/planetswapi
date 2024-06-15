<template>
  <div>
    <planets-list 
        :planets="planetsWithFilms"
        @show-planet-details="showPlanetDetails"
        :fetchNextPage="fetchNextPage"
        :planetsUrl="planetsUrl"
        :loading="loading" />
    <planet-details :planet="selectedPlanet" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlanetsList from "@/components/PlanetsList.vue";
import PlanetDetails from "@/components/PlanetDetails.vue";
import { Planet, Film, PlanetsArray } from "@/types";

const filmsUrl = "https://swapi.dev/api/films/";

export default defineComponent({
  name: "PlanetsManager",
  components: {
    PlanetsList,
    PlanetDetails,
  },
  data() {
    return {
      planetsUrl: "https://swapi.dev/api/planets/",
      loading: false,
      planets: [] as Planet[],
      films: [] as Film[],
      planetsWithFilms: [] as PlanetsArray,
      selectedPlanet: {} as Planet,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchPlanets(url: string) {
      try {
        const response = await fetch(url);
        const planetsData = await response.json();
        this.planets = [...this.planets, ...planetsData.results];
        this.planetsUrl = planetsData.next;
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    },
    async fetchFilms(url: string) {
      try {
        const response = await fetch(url);
        const filmsData = await response.json();
        this.films = filmsData.results;
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    },
    async fetchData() {
      try {
        this.loading = true;
        await this.fetchPlanets(this.planetsUrl);
        await this.fetchFilms(filmsUrl);

        const planetsWithFilms = this.planets.map((planet, index) => {
          const associatedFilms = this.films
            .filter((film) => film.planets.includes(planet.url))
            .map((film) => {
              return {
                title: film.title,
              };
            });
          return {
            id: parseInt(planet.url.split("/").filter(Boolean).pop() || `${index}`, 10),
            name: planet.name,
            films: associatedFilms,
            rotation_period: planet.rotation_period,
            orbital_period: planet.orbital_period,
            diameter: planet.diameter,
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surface_water: planet.surface_water,
            population: planet.population,
            residents: planet.residents,
            created: planet.created,
            edited: planet.edited,
            url: planet.url,
          } as Planet;
        });
        this.planetsWithFilms = planetsWithFilms;
      } catch (error) {
        console.error("Error fetching planetsWithFilms:", error);
      } finally {
        this.loading = false;
      }
    },
    fetchNextPage() {
      if (this.planetsUrl) {
        this.fetchData();
      }
    },
    showPlanetDetails(planet: Planet) {
      this.selectedPlanet = planet;
      console.log(this.selectedPlanet); 
    },
  },
});
</script>
