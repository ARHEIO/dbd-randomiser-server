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

export class ItemService {
  config: IConfig;
  itemDb: DynamoAccessor;
  allowedExpands = new Set<string>();

  constructor(config: IConfig, dynamo: Dynamo) {
    this.config = config;
    this.itemDb = new DynamoAccessor(dynamo, config.survivor.tableNames.items);
    this.allowedExpands.add('upgradables'); // TODO add this to config
  }

  public async getItem(index: number, options: {[key: string]: string}): Promise<dbdRandomiserItem> {
    let item: dbdRandomiserItem;
    if (options.expands) {
      const expands = options.expands.split(',') || [options.expands];
      expands.forEach(expand => {
        if (!this.allowedExpands.has(expand)) {
          throw new Error('Unsupported expand, supported expands are: upgradables');
        }
      })
      item = await this.itemDb.getDocument(index, ['upgradables']);
    } else {
      item = await this.itemDb.getDocument(index);
      item.upgradables = {
        href: `${this.config.endpoints.app}/Item/${index}?expands=upgradable`
      } as any
    }
    return item;
  }

  public async getAllItems(): Promise<dbdRandomiserItem[]> {
    return this.itemDb.getAllDocuments();
  }
}