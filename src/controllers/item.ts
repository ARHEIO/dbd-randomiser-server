/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda"
import config from '../config';
import { Dynamo } from "../db/Dynamo.db";
import { dbdRandomiserItem } from "../models/tables.model";
import { ItemService } from "../services/ItemService";
import { isArray } from "util";

let dynamo: ItemService;

const response = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: ''
};

export const handler = async(request: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return new Promise(async resolve => {
    let item: dbdRandomiserItem | dbdRandomiserItem[];

    try {
      const itemId = request.pathParameters && request.pathParameters.id
      item = itemId
        ? await dynamo.getItem(parseInt(itemId), request.queryStringParameters)
        : await dynamo.getAllItems();

      response.body = JSON.stringify(item);
      console.log("Successfully retrieved", isArray(item) ? 'all items' : item.name);

    } catch (error) {
      console.error(error);
      response.statusCode = 500;
      response.body = error;
    }

    resolve(response);
  })
}

(() => {
  dynamo = new ItemService(config, new Dynamo(config));
})()
