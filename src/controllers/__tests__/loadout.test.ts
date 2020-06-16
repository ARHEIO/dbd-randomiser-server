import { handler } from '../loadout';
import defaultRequestBody from '../../../__mocks__/fixtures/request-body';
import { killerLoadout, survivorLoadout } from '../../../__mocks__/fixtures/mock-data';
import { LoadoutService } from '../../services/LoadoutService';

const mock = <jest.Mock>(LoadoutService);

describe('Loadout controller', () => {
  it('should return a killer loadout when passed params', async () => {
    mock.prototype.generateKillerLoadout = jest.fn(() => Promise.resolve(killerLoadout));
    const params = { queryStringParameters: { q: 'killer' } };
    const result = await handler({...defaultRequestBody, ...params});
    expect(result.body).toBe(JSON.stringify(killerLoadout))
  });

  it('should return a survivor loadout when passed params', async () => {
    mock.prototype.generateSurvivorLoadout = jest.fn(() => Promise.resolve(survivorLoadout));
    const params = { queryStringParameters: { q: 'survivor' } };
    const result = await handler({...defaultRequestBody, ...params});
    expect(result.body).toBe(JSON.stringify(survivorLoadout))
  });

  it('should return an error when no params passed', async () => {
    const result = await handler(defaultRequestBody);
    expect(result.body)
      .toBe(`{"message":"There was no query param passed","devMessage":"Supported values for query param 'q' are: 'survivor', 'killer'"}`)
  });

  it('should return an error when bad params passed', async () => {
    const params = { queryStringParameters: { q: 'bad' } };
    const result = await handler({...defaultRequestBody, ...params});
    expect(result.body)
      .toBe(`{"message":"A unsupported query param was passed","devMessage":"Supported query params are: 'q'"}`)
  });
});