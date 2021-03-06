/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Dynamo } from '../db/Dynamo.db';
import { dbdRandomiserItem } from '../models/tables.model';
import { IConfig } from '../config';
import { DynamoAccessor } from '../db/DynamoAccessor';

export class KillerService {
  config: IConfig;
  killerDb: DynamoAccessor;
  allowedExpands = new Set<string>();

  constructor(config: IConfig, dynamo: Dynamo) {
    this.config = config;
    this.killerDb = new DynamoAccessor(dynamo, config.killer.tableNames.killers);
    this.allowedExpands.add('upgradables'); // TODO add this to config
  }

  public async getCharacter(index: number, options: {[key: string]: string}): Promise<dbdRandomiserItem> {
    let killer: dbdRandomiserItem;
    if (options.expands) {
      const expands = options.expands.split(',') || [options.expands];
      expands.forEach(expand => {
        if (!this.allowedExpands.has(expand)) {
          throw new Error('Unsupported expand, supported expands are: upgradables');
        }
      })
      killer = await this.killerDb.getDocument(index, ['upgradables']);
    } else {
      killer = await this.killerDb.getDocument(index);
      killer.upgradables = {
        href: `${this.config.endpoints.app}/killer/${index}?expands=upgradable`
      } as any
    }
    return killer;
  }

  public async getAllCharacters(): Promise<dbdRandomiserItem[]> {
    return this.killerDb.getAllDocuments();
  }
}