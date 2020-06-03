/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { DynamoService } from './DynamoService';
import { dbdRandomiserSurvivor, dbdRandomiserItem, dbdRandomiserPerk } from '../models/tables.model';
import { IConfig } from '../config';
 
export class SurvivorService extends DynamoService {
  constructor(config: IConfig) {
    super(config);

    this.tableNames = config.survivor.tableNames;
  }

  public async getSurvivor(index: number): Promise<dbdRandomiserSurvivor> {
    return this.getItem(index, this.tableNames.survivors);
  }

  public async getAllSurvivors(): Promise<dbdRandomiserSurvivor[]> {
    return this.getAllItems(this.tableNames.survivors);
  }

  public async getSurvivorPerk(index: number): Promise<dbdRandomiserPerk> {
    return this.getItem(index, this.tableNames.perks);
  }

  public async getSurvivorItem(index: number): Promise<dbdRandomiserItem> {
    return this.getItem(index, this.tableNames.items);
  }

  public async getSurvivorSize(): Promise<number> {
    return this.getTableSize(this.tableNames.survivors)
  }
  
  public getPerkSize(): Promise<number> {
    return this.getTableSize(this.tableNames.perks)
  }
  
  public getItemSize(): Promise<number> {
    return this.getTableSize(this.tableNames.items)
  }
}