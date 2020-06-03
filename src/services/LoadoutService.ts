/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import * as utils from '../helpers/utils';
import { IConfig } from '../config';
import { KillerService } from './KillerService';
import { SurvivorService } from './SurvivorService';
import { IGeneratedSurvivor, IGeneratedKiller } from '../models/responses.model';
import { dbdRandomiserSurvivor, dbdRandomiserItem, dbdRandomiserPerk, dbdRandomiserKiller } from '../models/tables.model';

export class LoadoutService {
  killerService: KillerService;
  survService: SurvivorService;
  
  constructor(config: IConfig) {
    this.killerService = new KillerService(config);
    this.survService = new SurvivorService(config);
  }

  public async generateSurvivorLoadout(): Promise<IGeneratedSurvivor> {
    return new Promise( async(resolve, reject) => {
      try {
        const randomSurvivor = await this.getRandomSurvivor();
        const randomItem = await this.getRandomItem();
        const randomAddons = utils.shuffleAndSliceArray(randomItem.upgradables, 2)
        const randomPerks = await this.getRandomSurvPerks();

        resolve({
          name: randomSurvivor.name,
          icon: randomSurvivor.icon,
          item: {
            name: randomItem.name,
            icon: randomItem.icon,
            rank: randomItem.rank,
            addons: randomAddons
          },
          perks: randomPerks
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  public async generateKillerLoadout(): Promise<IGeneratedKiller> {
    return new Promise(async (resolve, reject) => {
      try {
        const randomKiller = await this.getRandomKiller();
        const randomAddons = utils.shuffleAndSliceArray(randomKiller.upgradables, 2)
        const randomPerks = await this.getRandomKillerPerks();
         
        resolve({
          name: randomKiller.name,
          icon: randomKiller.icon,
          addons: randomAddons,
          perks: randomPerks
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  private async getRandomSurvivor(): Promise<dbdRandomiserSurvivor> {
    const survIndex = utils.getRandomIndex((await this.survService.getSurvivorSize()), 1)[0];
    return this.survService.getSurvivor(survIndex);
  }

  private async getRandomItem(): Promise<dbdRandomiserItem> {
    const itemIndex = utils.getRandomIndex((await this.survService.getItemSize()), 1)[0];
    return this.survService.getSurvivorItem(itemIndex);
  }

  private async getRandomSurvPerks(): Promise<dbdRandomiserPerk[]> {
    const perkIds = utils.getRandomIndex((await this.survService.getPerkSize()), 4);
    return Promise.all(perkIds.map(id => this.survService.getSurvivorPerk(id)))
  }

  private async getRandomKiller(): Promise<dbdRandomiserKiller> {
    const killerIndex = utils.getRandomIndex((await this.killerService.getKillerSize()), 1)[0];
    return this.killerService.getKiller(killerIndex);
  }

  private async getRandomKillerPerks(): Promise<dbdRandomiserPerk[]> {
    const perkIds = utils.getRandomIndex((await this.killerService.getPerkSize()), 4);
    return Promise.all(perkIds.map(id => this.killerService.getKillerPerk(id)))
  }
}