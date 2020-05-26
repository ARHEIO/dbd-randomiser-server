import { DynamoDB, AWSError } from 'aws-sdk';

/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

export class DynamoService {
  dynamo: DynamoDB.DocumentClient;

  constructor(config: any) {
    this.dynamo = new DynamoDB.DocumentClient({
      region: 'ap-southeast-2',
      endpoint: config.endpoints.dynamo
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
          resolve(results.Item);
        }
      })
    })
  }
}