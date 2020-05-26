/**
 * @license
 * Copyright Adam Eggleston. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { KillerService } from "../services/KillerService";
import { IGeneratedKiller } from "../models/responses.model";
import * as utils from '../helpers/utils';
import config from '../config';

let dynamo: KillerService;

export const handler = async() => {
  return new Promise(async resolve => {
    const response = { statusCode: 200, body: '' };

    const randomKiller = await dynamo.getRandomKiller();
    const randomAddons = utils.shuffleAndSliceArray(randomKiller.upgradables, 2)
    const randomPerks = await dynamo.getRandomPerks();

    const killer: IGeneratedKiller = {
      name: randomKiller.name,
      icon: randomKiller.icon,
      addons: randomAddons,
      perks: randomPerks
    }
    response.body = JSON.stringify(killer);

    resolve(response);
  })
}

(() => {
  console.log("I do things before you run the function", config);
  console.log(process.env.OVERWRITE_VARIABLE);
  dynamo = new KillerService(config);
})()
