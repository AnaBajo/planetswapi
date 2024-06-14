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


export interface PlanetWithFilms {
  name: string;
  films: { title: string }[];
}