interface BasicObject {
  name: string;
  icon: string;
  rank: number;
}

export interface dbdRandomiserKiller extends BasicObject {
  id: number;
  upgradables: BasicObject[];
}

export interface dbdRandomiserPerk extends BasicObject {
  id: number;
}

export interface dbdRandomiserSurvivor extends BasicObject {
  id: number;
}

export interface dbdRandomiserItem extends BasicObject {
  id: number;
  upgradables: BasicObject[];
}
