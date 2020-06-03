/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as router from 'aws-lambda-router'
import { handler as killerHandler } from '../src/controllers/killer';
import { handler as survivorHandler } from '../src/controllers/survivor';
import { handler as loadoutHandler } from '../src/controllers/loadout';
import { ProxyIntegrationEvent } from 'aws-lambda-router/lib/proxyIntegration';

export const handler = router.handler({
  proxyIntegration: {
    routes: [
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
      }
    ]
  }
})
