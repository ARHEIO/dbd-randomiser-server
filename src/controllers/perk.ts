/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import config from '../config';
import { APIGatewayProxyEvent } from "aws-lambda";
import { Dynamo } from "../db/Dynamo.db";
import { PerkService } from "../services/PerkService";
import { dbdRandomiserPerk } from '../models/tables.model';
import { isArray } from 'util';

let perkService: PerkService;

const response = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: ''
};

export const handler = async(request: APIGatewayProxyEvent): Promise<any> => {
  const perkId = request.pathParameters && request.pathParameters.id
  const character = request.pathParameters.character;
  return new Promise(async (resolve) => {
    let perk: dbdRandomiserPerk | dbdRandomiserPerk[];
    try {
      switch (character) {
        case 'survivor':
          perk = perkId
            ? await perkService.getSurvivorPerk(parseInt(perkId))
            : await perkService.getAllSurvivorPerks();
          break;
        case 'killer':
          perk = perkId
            ? await perkService.getKillerPerk(parseInt(perkId))
            : await perkService.getAllKillerPerks();
          break;
        default:
          throw new Error('How did you get here?');
      }
      response.body = JSON.stringify(perk);
      console.log("Successfully retrieved", isArray(perk) ? `all perks for ${character}` : `${perk.name} for ${character}`);
    } catch (error) {
      response.statusCode = 500;
      response.body = error;
      console.error(error)
    }

    resolve(response);
  })
}

(() => {
  perkService = new PerkService(config, new Dynamo(config));
})()
