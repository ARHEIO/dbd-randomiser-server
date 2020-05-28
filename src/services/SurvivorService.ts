import { DynamoService } from './DynamoService';
import * as utils from '../helpers/utils';
import { dbdRandomiserSurvivor, dbdRandomiserItem, dbdRandomiserPerk } from '../models/tables.model';
import { IConfig } from '../config';

/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

 
export class SurvivorService extends DynamoService {
  constructor(config: IConfig) {
    super(config);

    this.tableNames = config.survivor.tableNames;
  }

  public async getRandomSurvivor(): Promise<dbdRandomiserSurvivor> {
    const survIndex = utils.getRandomIndex((await this.getSurvivorSize()), 1)[0];
    return this.getItem(survIndex, this.tableNames.survivors);
  }

  public async getRandomItem(): Promise<dbdRandomiserItem> {
    const itemIndex = utils.getRandomIndex((await this.getItemSize()), 1)[0];
    return this.getItem(itemIndex, this.tableNames.items);
  }

  public async getRandomPerks(): Promise<dbdRandomiserPerk[]> {
    const perkIds = utils.getRandomIndex((await this.getPerkSize()), 4);
    return Promise.all(perkIds.map(id => this.getItem(id, this.tableNames.perks)))
  }

  private async getSurvivorSize(): Promise<number> {
    return this.getTableSize(this.tableNames.survivors)
  }
  
  private getPerkSize(): Promise<number> {
    return this.getTableSize(this.tableNames.perks)
  }
  
  private getItemSize(): Promise<number> {
    return this.getTableSize(this.tableNames.items)
  }
}