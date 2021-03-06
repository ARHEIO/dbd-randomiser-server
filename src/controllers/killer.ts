/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { KillerService } from "../services/KillerService";
import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda"
import config from '../config';
import { Dynamo } from "../db/Dynamo.db";
import { dbdRandomiserItem } from "../models/tables.model";
import { isArray } from "util";

let dynamo: KillerService;

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
    let killer: dbdRandomiserItem | dbdRandomiserItem[];

    try {
      const killerId = request.pathParameters && request.pathParameters.id
      killer = killerId
        ? await dynamo.getCharacter(parseInt(killerId), request.queryStringParameters)
        : await dynamo.getAllCharacters();

      response.body = JSON.stringify(killer);
      console.log("Successfully retrieved", isArray(killer) ? 'all killers' : killer.name);

    } catch (error) {
      response.statusCode = 500;
      response.body = error;
      console.error(error);
    }

    resolve(response);
  })
}

(() => {
  dynamo = new KillerService(config, new Dynamo(config));
})()
