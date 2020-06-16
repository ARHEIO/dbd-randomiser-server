import { handler } from '../killer';
import defaultRequestBody from '../../../__mocks__/fixtures/request-body';
import { dbdRandomiserKillers } from '../../../__mocks__/fixtures/mock-data';
import { KillerService } from '../../services/KillerService';

const mock = <jest.Mock>(KillerService);

describe('killer controller', () => {
  it('should return all killers when no additional params', async () => {
    mock.prototype.getAllCharacters = jest.fn(() => Promise.resolve(dbdRandomiserKillers));
    const result = await handler(defaultRequestBody);
    expect(result.body).toBe(JSON.stringify(dbdRandomiserKillers))
  });

  it('should return a specific killer when given a path param', async () => {
    mock.prototype.getCharacter = jest.fn(() => Promise.resolve(dbdRandomiserKillers[0]));
    const params = { pathParameters: { id: '1' } };
    const result = await handler({...defaultRequestBody, ...params});
    expect(result.body).toBe(JSON.stringify(dbdRandomiserKillers[0]))
  });

  it('should throw an error if something goes wrong when getting all', async () => {
    mock.prototype.getAllCharacters = jest.fn(() => Promise.reject("couldn't get all"));
    const result = await handler(defaultRequestBody);
    expect(result.body).toBe("couldn't get all")
  });

  it('should throw an error if something goes wrong when getting a single', async () => {
    mock.prototype.getCharacter = jest.fn(() => Promise.reject("couldn't get single"));
    const params = { pathParameters: { id: '1' } };
    const result = await handler({...defaultRequestBody, ...params});
    expect(result.body).toBe("couldn't get single")
  });
});