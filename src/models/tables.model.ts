interface BasicObject {
  name: string;
  icon: string;
  rank: number;
}

export type dbdRandomiserUpgradable  = BasicObject;

export interface dbdRandomiserItem extends BasicObject {
  id: number;
  upgradables: dbdRandomiserUpgradable[];
}

export interface dbdRandomiserPerk extends BasicObject {
  id: number;
}

export interface dbdRandomiserSurvivor extends BasicObject {
  id: number;
}

export interface dbdRandomiserItem extends BasicObject {
  id: number;
  upgradables: dbdRandomiserUpgradable[];
}
