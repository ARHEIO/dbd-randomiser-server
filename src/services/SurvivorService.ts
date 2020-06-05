/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Dynamo } from '../db/Dynamo.db';
import { dbdRandomiserSurvivor } from '../models/tables.model';
import { IConfig } from '../config';
import { DynamoAccessor } from '../db/DynamoAccessor';

export class SurvivorService {
  survDb: DynamoAccessor;

  constructor(config: IConfig, dynamo: Dynamo) {
    this.survDb = new DynamoAccessor(dynamo, config.survivor.tableNames.survivors);
  }

  public async getCharacter(index: number): Promise<dbdRandomiserSurvivor> {
    return this.survDb.getDocument(index);
  }

  public async getAllCharacters(): Promise<dbdRandomiserSurvivor[]> {
    return this.survDb.getAllDocuments();
  }
}