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

let dynamo: SurvivorService;

const response = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: ''
};

export const handler = async(request: APIGatewayProxyEvent): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    let survivor;
 
    try {
      const survivorId = request.pathParameters && request.pathParameters.id
      if (survivorId) {
        survivor = await dynamo.getSurvivor(parseInt(survivorId));
      } else {
        survivor = await dynamo.getAllSurvivors();
      }
      response.body = JSON.stringify(survivor);
      resolve(response);
    } catch (error) {
      response.statusCode = 500;
      reject(response);
    }
  })
}

(() => {
  dynamo = new SurvivorService(config);
})()
