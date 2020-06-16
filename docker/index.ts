/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as router from 'aws-lambda-router'
import { handler as killerHandler } from '../src/controllers/killer';
import { handler as survivorHandler } from '../src/controllers/survivor';
import { handler as loadoutHandler } from '../src/controllers/loadout';
import { handler as itemHandler } from '../src/controllers/item';
import { handler as perkHandler } from '../src/controllers/perk';
import { ProxyIntegrationEvent } from 'aws-lambda-router/lib/proxyIntegration';

export const handler = router.handler({
  proxyIntegration: {
    routes: [
      {
        path: '/ping',
        method: 'GET',
        action: () => 'pong'
      },
      {
        path: '/killer',
        method: 'GET',
        action: async(request: ProxyIntegrationEvent<any>) => JSON.parse((await killerHandler(request)).body)
      },
      {
        path: '/survivor',
        method: 'GET',
        action: async(request: ProxyIntegrationEvent<any>) => JSON.parse((await survivorHandler(request)).body)
      },
      {
        path: '/loadout',
        method: 'GET',
        action: async(request: ProxyIntegrationEvent<any>) => JSON.parse((await loadoutHandler(request)).body)
      },
      {
        path: '/item',
        method: 'GET',
        action: async(request: ProxyIntegrationEvent<any>) => JSON.parse((await itemHandler(request)).body)
      },
      {
        path: '/perk',
        method: 'GET',
        action: async(request: ProxyIntegrationEvent<any>) => JSON.parse((await perkHandler(request)).body)
      }
    ]
  }
})
