<template>
  <div>
    <planets-list
      :planets="PlanetsWithAllData"
      :fetchNextPage="fetchNextPage"
      :planetsUrl="planetsUrl"
      :loading="loading"
    />
    <planet-details />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PlanetsList from "@/components/PlanetsList.vue";
import PlanetDetails from "@/components/PlanetDetails.vue";
import { Planet, Film, PlanetsArray, Resident } from "@/types";

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
      PlanetsWithAllData: [] as PlanetsArray,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    selectedPlanet(): Planet | null {
      return this.$refs.planetDetails
        ? (this.$refs.planetDetails as any).selectedPlanet
        : null;
    },
  },
  methods: {
    async fetchPlanets(url: string) {
      try {
        const response = await fetch(url);
        const planetsData = await response.json();
        const planets = planetsData.results.map((planet: any) => ({
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
    async fetchResidents(residentUrls: string[]): Promise<Resident[]> {
      const residentPromises = residentUrls.map(async (url) => {
        const response = await fetch(url);
        const residentData = await response.json();
        return {
          name: residentData.name,
        } as Resident;
      });

      return await Promise.all(residentPromises);
    },
    async fetchData() {
      try {
        this.loading = true;
        await this.fetchPlanets(this.planetsUrl);
        await this.fetchFilms(filmsUrl);

        const planetsWithAllData = await Promise.all(
          this.planets.map(async (planet, index) => {
            const associatedFilms = this.films
              .filter((film) => film.planets.includes(planet.url))
              .map((film) => {
                return {
                  title: film.title,
                };
              });
            const associatedResidents = await this.fetchResidents(
              planet.residentUrls
            );
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
          })
        );
        this.PlanetsWithAllData = planetsWithAllData;
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
      console.log("PlanetsManager/shoqPlanetDetails()/planet", planet);
      this.selectedPlanet = planet;
      console.log(
        "PlanetsManager/shoqPlanetDetails()/this.selectedPlanet",
        this.selectedPlanet
      );
      console.log("typeof planet", typeof planet);
    },
  },
});
</script>
