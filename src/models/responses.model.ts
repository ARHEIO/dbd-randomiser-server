export interface IGeneratedSurvivor {
  name: string;
  icon: string;
  item: {
    name: string;
    icon: string;
    rank: number;
    addons: {
      name: string;
      icon: string;
      rank: number;
    } []
  };
  perks: {
    name: string;
    icon: string;
    rank: number;
  } []
}

export interface IGeneratedKiller {
  name: string;
  icon: string;
  addons: {
    name: string;
    icon: string;
    rank: number;
  } []
  perks: {
    name: string;
    icon: string;
    rank: number;
  } []
}