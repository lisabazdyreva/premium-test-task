export interface IBeer {
  id: number;
  name: string;
  image_url: string;
  abv: number;

  tagline: string;
  first_brewed: string;
  description: string;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: IVolume;
  boil_volume: IVolume;
  method: IMethod;
  ingredients: IIngredients;

  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

interface IVolume {
  value: number;
  unit: string;
}
interface IIngredients {
  malt: {
    name: string;
    amount: IVolume;
  }[];
  hops: {
    name: string;
    amount: IVolume;
    add: string;
    attribute: string;
  }[];
  yeast: string;
}

interface IMethod {
  mash_temp: [
    {
      temp: IVolume;
      duration: null;
    }
  ];
  fermentation: {
    temp: IVolume;
  };
  twist: null;
}
