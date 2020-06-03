/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { DynamoDB, AWSError } from 'aws-sdk';
import { IConfig } from '../config';

export class DynamoService {
  dynamo: DynamoDB.DocumentClient;
  tableNames: any;

  constructor(config: IConfig) {
    this.dynamo = new DynamoDB.DocumentClient({
      region: 'ap-southeast-2',
      endpoint: config.endpoints.dynamo,
      maxRetries: 3
    });
  }

  protected getItem(key: number, table: string): Promise<any> {
    const queryParams = {
      TableName: table,
      Key: { 'id': key }
    }
    return new Promise((resolve, reject) => {
      this.dynamo.get(queryParams, (err: AWSError, results: DynamoDB.DocumentClient.GetItemOutput) => {
        if (err) {
          console.log(`message='rejected with error' err='${err}'`)
          reject(err);
        } else {
          console.log(`message='retreived item' item='${results.Item}'`)
          resolve(results.Item as any);
        }
      })
    })
  }

  protected getAllItems(table: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dynamo.scan({TableName: table,}, (err: AWSError, results: DynamoDB.DocumentClient.ScanOutput) => {
        if (err) {
          console.log(`message='rejected with error' err='${err}'`)
          reject(err);
        } else {
          console.log(`message='retreived item' item='${results}'`)
          delete results.Count;
          delete results.ScannedCount;
          resolve(results);
        }
      })
    })
  }

  protected getTableSize(table: string): Promise<number> {
    // TODO replace this with describe table call
    // TODO: find a way to manually cachebust the describe table call to prevent stale data
    return new Promise((resolve, reject) => {
      switch(table) {
        case 'dbd-randomiser-survivors':
          resolve(22)
        case 'dbd-randomiser-perks-survivor':
          resolve(77)
        case 'dbd-randomiser-items':
          resolve(23)
        case 'dbd-randomiser-killers':
          resolve(19)
        case 'dbd-randomiser-perks-killer':
          resolve(69)
        default:
          reject()
      }
    })
  }
}