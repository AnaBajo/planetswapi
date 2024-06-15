// src/types.ts

export interface Film {
  title: string;
  planets: string[]; 
  url: string;
}

export interface Resident {
  name: string;
  // planets: string[]; 
  // url: string;
}


export interface Planet {
  id?: number;
  name: string;
  rotation_period?: string; 
  orbital_period?: string; 
  diameter?: string; 
  climate?: string; 
  gravity?: string; 
  terrain?: string; 
  surface_water?: string; 
  population?: string; 
  residents?: Resident[];
  films?: Film[]; 
  created?: string; 
  edited?: string; 
  url: string;
}

export type PlanetsArray = Planet[];

// export interface PlanetWithFilms {
//   id: number,
//   name: string;
//   films: { title: string }[];
// }

