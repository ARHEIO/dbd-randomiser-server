export interface IGeneratedSurvivor {
  name: string;
  icon: string;
  item: {
    name: string;
    icon: string;
    rank: string;
    addons: {
      name: string;
      icon: string;
      rank: string;
    } []
  };
  perks: {
    name: string;
    icon: string;
    rank: string
  } []
}