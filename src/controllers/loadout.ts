/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import config from '../config';

import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { LoadoutService } from "../services/LoadoutService";
import { IGeneratedSurvivor, IGeneratedKiller } from '../models/responses.model';
import { Dynamo } from '../db/Dynamo.db';

let loadout: LoadoutService;

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
    try {
      switch(request.queryStringParameters.q) {
        case 'survivor':
          const survivor: IGeneratedSurvivor = await loadout.generateSurvivorLoadout();
          response.body = JSON.stringify(survivor);
          break;

        case 'killer':
          const killer: IGeneratedKiller = await loadout.generateKillerLoadout();
          response.body = JSON.stringify(killer);
          break;

        default:
          response.statusCode = 400;
          response.body = `{msg: "bad query param"}`
      }
      console.log(`Successfully retrieved loadout for ${request.queryStringParameters.q}`);
    } catch (error) {
      response.statusCode = 500;
      response.body = `{msg: ${error}}`
    }
    resolve(response);
  })
}

(() => {
  loadout = new LoadoutService(config, new Dynamo(config));
})()
