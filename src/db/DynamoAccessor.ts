/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Dynamo, GetItemOutput, ScanOutput } from '../db/Dynamo.db';

export class DynamoAccessor {
  dynamo: Dynamo;
  tableName: string;

  constructor(dynamo: Dynamo, tableName: string) {
    this.dynamo = dynamo;
    this.tableName = tableName;
  }

  public async getDocument(index: number, options: string[] = []): Promise<any> {
    const document: GetItemOutput = await this.dynamo.getItem(index, this.tableName, options);
    return document.Item as any;
  }

  public async getAllDocuments(): Promise<any[]> {
    const documents: ScanOutput = await this.dynamo.getAllItems(this.tableName);
    return documents.Items as any[];
  }

  public async getTableSize(): Promise<number> {
    return this.dynamo.getTableSize(this.tableName);
  }
}