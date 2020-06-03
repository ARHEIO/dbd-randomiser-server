/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { DynamoService } from './DynamoService';
import { dbdRandomiserKiller, dbdRandomiserPerk } from '../models/tables.model';
import { IConfig } from '../config';

export class KillerService extends DynamoService {
  constructor(config: IConfig) {
    super(config);

    this.tableNames = config.killer.tableNames;
  }

  public async getKiller(index: number): Promise<dbdRandomiserKiller> {
    return this.getItem(index, this.tableNames.killers);
  }

  public async getAllKillers(): Promise<dbdRandomiserKiller[]> {
    return this.getAllItems(this.tableNames.killers);
  }

  public async getKillerPerk(index: number): Promise<dbdRandomiserPerk> {
    return this.getItem(index, this.tableNames.perks);
  }

  public getKillerSize(): Promise<number> {
    return this.getTableSize(this.tableNames.killers)
  }

  public getPerkSize(): Promise<number> {
    return this.getTableSize(this.tableNames.perks)
  }
}