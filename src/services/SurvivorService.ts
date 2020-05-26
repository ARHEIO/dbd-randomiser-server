import { DynamoService } from './DynamoService';
import * as utils from '../helpers/utils';

/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

 export interface IKiller {
  id: number;
  name: string;
  icon: string;
  rank: null;
  upgradables: {
    name: string;
    icon: string;
    rank: number;
  }[]
 }

const getNumbers = (max: number): number[] => {
  const nums = new Set<number>();
  while(nums.size !== 4) {
    nums.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(nums);
}


export class SurvivorService extends DynamoService {
  tableNames = {
    killers: 'dbd-randomiser-survivors',
    perks: 'dbd-randomiser-perks-survivor',
    items: 'dbd-randomiser-items',
  }

  constructor(config: any) {
    super(config);
  }

  public getRandomSurvivor() {
    const survIndex = utils.getRandomIndex(this.getSurvivorSize(), 1)[0];
    return this.getItem(survIndex, this.tableNames.killers);
  }

  public getRandomItem() {
    const itemIndex = utils.getRandomIndex(this.getItemSize(), 1)[0];
    return this.getItem(itemIndex, this.tableNames.items);
  }

  public getRandomPerks() {
    const perkIds = getNumbers(this.getPerkSize());
    return Promise.all(perkIds.map(id => this.getItem(id, this.tableNames.perks)))
  }

  private getSurvivorSize(): number {
    return 22; // do this better adam for gods sake
  }

  private getPerkSize(): number {
    return 77; // do this better adam for gods sake
  }

  private getItemSize(): number {
    return 23; // do this better adam for gods sake
  }
}