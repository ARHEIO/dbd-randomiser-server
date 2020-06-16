/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { AWSError } from 'aws-sdk';
import { IConfig } from '../config';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ApplicationError } from '../helpers/errors';

export type GetItemInput = DocumentClient.GetItemInput;
export type GetItemOutput = DocumentClient.GetItemOutput;
export type ScanInput = DocumentClient.ScanInput;
export type ScanOutput = DocumentClient.ScanOutput;

export class Dynamo {
  dynamo: DocumentClient;
  tableNames: any;
  defaultAttributes = [ 'id', 'name', 'icon', 'rank' ]

  constructor(config: IConfig) {
    this.dynamo = new DocumentClient({
      region: config.dynamo.region,
      endpoint: config.endpoints.dynamo,
      maxRetries: config.dynamo.maxRetries
    });
  }

  private _handleResults<T>(err: AWSError, results: T, resolve: any, reject: any): void {
    if (err) {
      console.error(`message='rejected with error' err='${err}'`)
      reject(new ApplicationError('DYNAMO_ERROR', 'Something went wrong'));
    } else {
      resolve(results);
    }
  }

  private _getItem(key: number, table: string, attributes: string[]): Promise<GetItemOutput> {
    const queryParams: GetItemInput = {
      TableName: table,
      Key: { 'id': key },
      AttributesToGet: attributes
    }

    return new Promise((resolve, reject) => {
      this.dynamo.get(queryParams, (err: AWSError, results: GetItemOutput) => this._handleResults(err, results, resolve, reject))
    })
  }

  private _getAllItems(table: string, attributes: string[]): Promise<any> {
    const params: ScanInput = {
      TableName: table,
      AttributesToGet: attributes
    }

    return new Promise((resolve, reject) => {
      this.dynamo.scan(params, (err: AWSError, results: ScanOutput) => this._handleResults(err, results, resolve, reject))
    })
  }

  public getItem(key: number, table: string, additionalAttributes: string[] = []): Promise<GetItemOutput> {
    return this._getItem(key, table, [ ...this.defaultAttributes, ...additionalAttributes ]);
  }

  public getAllItems(table: string, additionalAttributes: string[] = []): Promise<any> {
    return this._getAllItems(table, [ ...this.defaultAttributes, ...additionalAttributes ]);
  }

  public getTableSize(table: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this._getAllItems(table, ['id'])
        .then((data: ScanOutput) => resolve(data.Count))
        .catch(e => reject(e));
    })
  }
}