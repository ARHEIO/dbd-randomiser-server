/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { SurvivorService } from "../services/SurvivorService";
import config from '../config';
import { APIGatewayProxyEvent } from "aws-lambda";
import { Dynamo } from "../db/Dynamo.db";
import { dbdRandomiserSurvivor } from "../models/tables.model";
import { isArray } from "util";

let survService: SurvivorService;

const response = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: ''
};

export const handler = async(request: APIGatewayProxyEvent): Promise<any> => {
  return new Promise(async (resolve) => {

    try {
      const survivorId = request.pathParameters && request.pathParameters.id
      const survivor: dbdRandomiserSurvivor | dbdRandomiserSurvivor[] = survivorId
        ? await survService.getCharacter(parseInt(survivorId))
        : await survService.getAllCharacters();
      response.body = JSON.stringify(survivor);
      console.log("Successfully retrieved", isArray(survivor) ? 'all survivors' : survivor.name);
    } catch (error) {
      console.error(error)
      response.statusCode = 500;
      response.body = error;
    }

    resolve(response);
  })
}

(() => {
  survService = new SurvivorService(config, new Dynamo(config));
})()
