/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import * as utils from '../helpers/utils';
import { IConfig } from '../config';
import {
  dbdRandomiserSurvivor,
  dbdRandomiserPerk,
  dbdRandomiserItem,
  dbdRandomiserUpgradable
} from '../models/tables.model';
import { Dynamo } from '../db/Dynamo.db';
import { IGeneratedSurvivor, IGeneratedKiller } from '../models/responses.model';
import { DynamoAccessor } from '../db/DynamoAccessor';

export class LoadoutService {
  private _killerService: DynamoAccessor;
  private _survService: DynamoAccessor;
  private _killerPerkService: DynamoAccessor;
  private _survPerkService: DynamoAccessor;
  private _itemService: DynamoAccessor;

  constructor(config: IConfig, dynamo: Dynamo) {
    this._killerService = new DynamoAccessor(dynamo, config.killer.tableNames.killers);
    this._survService = new DynamoAccessor(dynamo, config.survivor.tableNames.survivors);
    
    this._killerPerkService = new DynamoAccessor(dynamo, config.killer.tableNames.perks);
    this._survPerkService = new DynamoAccessor(dynamo, config.survivor.tableNames.perks);
    
    this._itemService = new DynamoAccessor(dynamo, config.survivor.tableNames.items);
  }

  public async generateSurvivorLoadout (): Promise<IGeneratedSurvivor> {
    return new Promise( async(resolve, reject) => {
      try {
        const randomSurvivor: dbdRandomiserSurvivor[] = await this._getRandomDocument(1, this._survService);
        const randomItem: dbdRandomiserItem[] = await this._getRandomDocument(1, this._itemService, ['upgradables']);
        const randomAddons: dbdRandomiserUpgradable[] = utils.shuffleAndSliceArray(randomItem[0].upgradables, 2)
        const randomPerks: dbdRandomiserPerk[] = await this._getRandomDocument(4, this._survPerkService);
  
        resolve({
          name: randomSurvivor[0].name,
          icon: randomSurvivor[0].icon,
          perks: randomPerks,
          item: {
            name: randomItem[0].name,
            icon: randomItem[0].icon,
            rank: randomItem[0].rank,
            addons: randomAddons
          },
        });
      } catch (error) {
        reject(error);
      }
    })
  }
  
  public async generateKillerLoadout (): Promise<IGeneratedKiller> {
    return new Promise(async (resolve, reject) => {
      try {
        const randomKiller: dbdRandomiserItem[] = await this._getRandomDocument(1, this._killerService, ['upgradables']);
        const randomAddons: dbdRandomiserUpgradable[] = utils.shuffleAndSliceArray(randomKiller[0].upgradables, 2)
        const randomPerks: dbdRandomiserPerk[] = await this._getRandomDocument(4, this._killerPerkService);
         
        resolve({
          name: randomKiller[0].name,
          icon: randomKiller[0].icon,
          perks: randomPerks,
          addons: randomAddons,
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  private async _getRandomDocument(numToGet: number, service: DynamoAccessor, options: string[] = []): Promise<any[]> {
    const ids = utils.getRandomIndex((await service.getTableSize()), numToGet);
    return Promise.all(ids.map(id => service.getDocument(id, options) )) as any;
  }
}