<template>
  <div v-if="planet" class="container flex items-center justify-center my-6 mx-auto">
    <div class="max-w-xs md:max-w-screen-lg">
      <!-- <table class="text-left align-top table-auto border border-yellow-400">
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
       <div>
        {{ planet }}
       </div>
      </table> -->


      <div>
        {{ planet.name }}
      </div>
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
import { defineComponent, PropType } from 'vue';
import { Planet } from '@/types';

export default defineComponent({
  props: {
    planet: {
      type: Object as PropType<Planet>,
      required: true,
    },
  },
  mounted() {
    console.log('PlanetDetails/mounted()/Planet received in PlanetDetails/this.planet:', this.planet);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
});
</script>
