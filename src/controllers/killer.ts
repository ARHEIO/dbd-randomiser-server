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
  return new Promise(async (resolve, reject) => {
    let killer;
 
    try {
      const killerId = request.pathParameters && request.pathParameters.id
      if (killerId) {
        killer = await dynamo.getKiller(parseInt(killerId));
      } else {
        killer = await dynamo.getAllKillers();
      }
      response.body = JSON.stringify(killer);
      resolve(response);
    } catch (error) {
      response.statusCode = 500;
      reject(response);
    }
  })
}

(() => {
  console.log("I do things before you run the function", config);
  dynamo = new KillerService(config);
})()
