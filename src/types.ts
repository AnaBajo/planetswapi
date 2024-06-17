export interface Film {
  title: string;
  planets: string[]; 
  url: string;
}

export interface Resident {
  name: string;
  url: string;
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
  residentUrls?: string[];  
  films?: Film[]; 
  created?: string; 
  edited?: string; 
  url: string;
}

export type PlanetsArray = Planet[];

export interface PlanetDetailsComponent {
  selectedPlanet: Planet | null;
}

