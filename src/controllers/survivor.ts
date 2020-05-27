/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { SurvivorService } from "../services/SurvivorService";
import { IGeneratedSurvivor } from "../models/responses.model";
import * as utils from '../helpers/utils';
import config from '../config';

let dynamo: SurvivorService;

export const randomNumberGenerator = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const handler = async() => {
  return new Promise(async resolve => {
    const response = {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: ''
    };

    const randomSurvivor = await dynamo.getRandomSurvivor();
    const randomItem = await dynamo.getRandomItem();
    const randomAddons = utils.shuffleAndSliceArray(randomItem.upgradables, 2)
    const randomPerks = await dynamo.getRandomPerks();

    const Survivor: IGeneratedSurvivor = {
      name: randomSurvivor.name,
      icon: randomSurvivor.icon,
      item: {
        name: randomItem.name,
        icon: randomItem.icon,
        rank: randomItem.rank,
        addons: randomAddons
      },
      perks: randomPerks
    }
    response.body = JSON.stringify(Survivor);

    resolve(response);
  })
}

(() => {
  console.log("I do things before you run the function", config)
  dynamo = new SurvivorService(config);
})()
