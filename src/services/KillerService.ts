/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { DynamoService } from './DynamoService';
import * as utils from '../helpers/utils';
import { dbdRandomiserKiller, dbdRandomiserPerk } from '../models/tables.model';

export class KillerService extends DynamoService {
  constructor(config: any) {
    super(config);

    this.tableNames = {
        killers: config.killer.killers,
        perks: config.killer.perks,
      }
  }

  public async getRandomKiller(): Promise<dbdRandomiserKiller> {
    const killerIndex = utils.getRandomIndex((await this.getKillerSize()), 1)[0];
    return this.getItem(killerIndex, this.tableNames.killers);
  }

  public async getRandomPerks(): Promise<dbdRandomiserPerk[]> {
    const perkIds = utils.getRandomIndex((await this.getPerkSize()), 4);
    return Promise.all(perkIds.map(id => this.getItem(id, this.tableNames.perks)))
  }

  private getKillerSize(): Promise<number> {
    return this.getTableSize(this.tableNames.killers)
  }

  private getPerkSize(): Promise<number> {
    return this.getTableSize(this.tableNames.perks)
  }
}