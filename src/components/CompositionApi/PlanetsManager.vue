<template>
  <h1>setup()</h1>
  <div>
    <planets-list
      :planets="newPlanets"
      :fetchNextPage="fetchNextPage"
      :planetsUrl="planetsUrl"
      :loading="loading"
    />
    <planet-details ref="planetDetailsRef" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  reactive,
} from "vue";
import PlanetsList from "@/components/CompositionApi/PlanetsList.vue";
import PlanetDetails from "@/components/CompositionApi/PlanetDetails.vue";
import {
  Planet,
  Film,
  // PlanetsArray,
  Resident,
  PlanetDetailsComponent,
} from "@/types";

const filmsUrl = "https://swapi.dev/api/films/";
const residentsUrl = "https://swapi.dev/api/people/";

export default defineComponent({
  name: "PlanetsManager",
  components: {
    PlanetsList,
    PlanetDetails,
  },
  setup() {
    const planetsUrl = ref("https://swapi.dev/api/planets/");
    const loading = ref(false);
    const planets = ref<Planet[]>([]);
    const films = ref<Film[]>([]);
    const residents = ref<Resident[]>([]);
    //   const PlanetsWithAllData = ref<PlanetsArray>([]);
    const PlanetsWithAllData = ref<Planet[]>([]);
    const planetDetailsRef = ref(null);
    const planetsUrlChanged = ref(false);
    //   const newPlanets = ref<PlanetsArray>([]);
    const newPlanets = reactive<Planet[]>([]);

    const selectedPlanet = computed(() => {
      return planetDetailsRef.value
        ? (planetDetailsRef.value as PlanetDetailsComponent).selectedPlanet
        : null;
    });

    const fetchPlanets = async (url: string) => {
      try {
        const response = await fetch(url);
        const planetsData = await response.json();
        const fetchedPlanets = planetsData.results.map((planet: Planet) => ({
          ...planet,
          residentUrls: planet.residents,
        }));
        planets.value = [...planets.value, ...fetchedPlanets];
        planetsUrl.value = planetsData.next;
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };

    const fetchFilms = async (url: string) => {
      try {
        const response = await fetch(url);
        const filmsData = await response.json();
        films.value = filmsData.results;
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    const fetchResidents = async (url: string) => {
      try {
        const response = await fetch(url);
        const residentsData = await response.json();
        return residentsData.results.map((resident: Resident) => ({
          name: resident.name,
          url: resident.url,
        }));
      } catch (error) {
        console.error("Error fetching residents:", error);
        return [];
      }
    };

    const fetchData = async () => {
      try {
        loading.value = true;
        await fetchPlanets(planetsUrl.value);
        await fetchFilms(filmsUrl);
        const fetchedResidents = await fetchResidents(residentsUrl);

        const planetsWithAllData = planets.value.map((planet, index) => {
          const associatedFilms = films.value
            .filter((film) => film.planets.includes(planet.url))
            .map((film) => ({
              title: film.title,
            }));

          const associatedResidents = fetchedResidents
            .filter((resident: Resident) =>
              planet.residentUrls?.includes(resident.url)
            )
            .map((resident: Resident) => ({
              name: resident.name,
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

        PlanetsWithAllData.value = planetsWithAllData;
        newPlanets.splice(0, newPlanets.length, ...planetsWithAllData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false;
      }
    };

    const fetchNextPage = () => {
      if (planetsUrlChanged.value) {
        fetchData();
      }
    };

    const showPlanetDetails = (planet: Planet) => {
      (selectedPlanet.value as Planet) = planet;
    };

    watch(planetsUrl, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        planetsUrlChanged.value = true;
      }
    });

    onMounted(() => {
      fetchData();
    });

    return {
      planetsUrl,
      loading,
      planets,
      films,
      residents,
      PlanetsWithAllData,
      selectedPlanet,
      fetchNextPage,
      showPlanetDetails,
      planetDetailsRef,
      newPlanets,
    };
  },
});
</script>
