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
import { ApplicationError, ErrorHandler } from '../helpers/errors';

let loadout: LoadoutService;

let response = {
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
      if (!request.queryStringParameters || !request.queryStringParameters.q) {
        throw new ApplicationError('NO_QUERY_PARAM', `Supported values for query param 'q' are: 'survivor', 'killer'`)
      }

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
          throw new ApplicationError('BAD_QUERY_PARAM', `Supported query params are: 'q'`)
      }
      console.log(`Successfully retrieved loadout for ${request.queryStringParameters.q}`);
    } catch (error) {
      response = {...response, ...ErrorHandler(error)}
    }
    resolve(response);
  })
}

(() => {
  loadout = new LoadoutService(config, new Dynamo(config));
})()
