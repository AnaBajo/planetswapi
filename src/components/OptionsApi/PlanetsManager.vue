<template>
  <div>
    <planets-list
      :planets="planetsWithAllData"
      :fetchNextPage="fetchNextPage"
      :planetsUrl="planetsUrl"
      :loading="loading"
    />
    <planet-details />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlanetsList from "@/components/OptionsApi/PlanetsList.vue";
import {
  Planet,
  Film,
  PlanetsArray,
  Resident,
  PlanetDetailsComponent,
} from "@/types";

const filmsUrl = "https://swapi.dev/api/films/";
const residentsUrl = "https://swapi.dev/api/people/";

export default defineComponent({
  components: {
    PlanetsList,
  },
  data() {
    return {
      planetsUrl: "https://swapi.dev/api/planets/",
      loading: false,
      planets: [] as Planet[],
      films: [] as Film[],
      residents: [] as Resident[],
      planetsWithAllData: [] as PlanetsArray,
      planetsUrlChanged: false,
    };
  },
  watch: {
    planetsUrl(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.planetsUrlChanged = true;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    selectedPlanet(): Planet | null {
      return this.$refs.planetDetails
        ? (this.$refs.planetDetails as PlanetDetailsComponent).selectedPlanet
        : null;
    },
  },
  methods: {
    async fetchPlanets(url: string) {
      try {
        const response = await fetch(url);
        const planetsData = await response.json();
        const planets = planetsData.results.map((planet: Planet) => ({
          ...planet,
          residentUrls: planet.residents,
        }));
        this.planets = [...this.planets, ...planets];
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
    async fetchResidents(url: string) {
      try {
        let allResidents: Resident[] = [];
        let nextPageUrl: string | null = url;

        while (nextPageUrl) {
          const response: Response = await fetch(nextPageUrl); 
          const residentsData = await response.json();
          allResidents = [...allResidents, ...residentsData.results];
          nextPageUrl = residentsData.next;
        }

        return allResidents.map((resident: Resident) => ({
          name: resident.name,
          url: resident.url,
        }));
      } catch (error) {
        console.error("Error fetching residents:", error);
        return [];
      }
    },
    async fetchData() {
      try {
        this.loading = true;
        await this.fetchPlanets(this.planetsUrl);
        await this.fetchFilms(filmsUrl);
        this.residents = await this.fetchResidents(residentsUrl);

        const planetsFullData = this.planets.map((planet, index) => {
          const associatedFilms = this.films
            .filter((film) => film.planets.includes(planet.url))
            .map((film) => ({
              title: film.title,
            }));

          const associatedResidents = this.residents
            .filter((resident) => planet.residentUrls?.includes(resident.url))
            .map((resident) => ({
              name: resident.name,
              url: resident.url
            }));

          return {
            id: parseInt(
              planet.url.split("/").filter(Boolean).pop() || `${index}`,
              10
            ),
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
            residents: associatedResidents,
            created: planet.created,
            edited: planet.edited,
            url: planet.url,
          } as Planet;
        });
        this.planetsWithAllData = planetsFullData;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },
    fetchNextPage() {
      if (this.planetsUrlChanged) {
        this.fetchData();
      }
    },
    showPlanetDetails(planet: Planet) {
      this.selectedPlanet = planet;
    },
  },
});
</script>
