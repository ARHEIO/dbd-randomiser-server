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
  return new Promise(async (resolve, reject) => {
    try {
      switch(request.queryStringParameters.q) {
        case 'survivor':
          const survivor = await loadout.generateSurvivorLoadout();
          response.body = JSON.stringify(survivor);
          console.log('survivor', response)
          resolve(response);
          break;
        case 'killer':
          const killer = await loadout.generateKillerLoadout();
          response.body = JSON.stringify(killer);
          console.log('killer', response)
          resolve(response);
          break;
        default:
          response.statusCode = 400;
          response.body = `{msg: "bad query param"}`
          console.log('default', response)
          resolve(response);
      }
    } catch (error) {
      response.statusCode = 500;
      response.body = `{msg: ${error}}`
      reject(response);
    }
  })
}

(() => {
  loadout = new LoadoutService(config);
})()
