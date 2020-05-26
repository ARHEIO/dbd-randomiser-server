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

export class KillerService extends DynamoService {
  tableNames = {
    killers: 'dbd-randomiser-killers',
    perks: 'dbd-randomiser-perks-killer',
  }

  constructor(config: any) {
    super(config);
  }

  public getRandomKiller(): Promise<IKiller> {
    const killerIndex = utils.getRandomIndex(this.getKillerSize(), 1)[0];
    return this.getItem(killerIndex, this.tableNames.killers);
  }

  public getRandomPerks() {
    const perkIds = utils.getRandomIndex(this.getPerkSize(), 4);
    return Promise.all(perkIds.map(id => this.getItem(id, this.tableNames.perks)))
  }

  private getKillerSize(): number {
    return 19; // do this better adam for gods sake
  }

  private getPerkSize(): number {
    return 69; // do this better adam for gods sake
  }
}