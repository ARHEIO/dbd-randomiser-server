/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Dynamo } from '../db/Dynamo.db';
import { dbdRandomiserPerk } from '../models/tables.model';
import { IConfig } from '../config';
import { DynamoAccessor } from '../db/DynamoAccessor';

export class PerkService {
  killerPerkDb: DynamoAccessor;
  survPerkDb: DynamoAccessor;

  constructor(config: IConfig, dynamo: Dynamo) {
    this.survPerkDb = new DynamoAccessor(dynamo, config.survivor.tableNames.perks);
    this.killerPerkDb = new DynamoAccessor(dynamo, config.killer.tableNames.perks);
  }

  private async _getPerk(index: number, db: DynamoAccessor): Promise<dbdRandomiserPerk> {
    return db.getDocument(index);
  }

  private async _getAllPerks(db: DynamoAccessor): Promise<dbdRandomiserPerk[]> {
    return db.getAllDocuments();
  }

  public async getSurvivorPerk(index: number): Promise<dbdRandomiserPerk> {
    return this._getPerk(index, this.survPerkDb)
  }
  public async getAllSurvivorPerks(): Promise<dbdRandomiserPerk[]> {
    return this._getAllPerks(this.survPerkDb)
  }
  public async getKillerPerk(index: number): Promise<dbdRandomiserPerk> {
    return this._getPerk(index, this.killerPerkDb)
  }
  public async getAllKillerPerks(): Promise<dbdRandomiserPerk[]> {
    return this._getAllPerks(this.killerPerkDb)
  }
}