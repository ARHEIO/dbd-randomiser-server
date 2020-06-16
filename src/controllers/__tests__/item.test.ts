import { handler } from '../item';
import defaultRequestBody from '../../../__mocks__/fixtures/request-body';
import { dbdRandomiserItems } from '../../../__mocks__/fixtures/mock-data';
import { ItemService } from '../../services/ItemService'

const mock = <jest.Mock>(ItemService);

describe('Item controller', () => {
  it('should return all items when no additional params', async () => {
    mock.prototype.getAllItems = jest.fn(() => Promise.resolve(dbdRandomiserItems));
    const result = await handler(defaultRequestBody);
    expect(result.body).toBe(JSON.stringify(dbdRandomiserItems))
  });

  it('should return a specific survivor when given a path param', async () => {
    mock.prototype.getItem = jest.fn(() => Promise.resolve(dbdRandomiserItems[0]));
    const params = { pathParameters: { id: '1' } };
    const result = await handler({...defaultRequestBody, ...params});
    expect(result.body).toBe(JSON.stringify(dbdRandomiserItems[0]))
  });

  it('should throw an error if something goes wrong when getting all', async () => {
    mock.prototype.getAllItems = jest.fn(() => Promise.reject("couldn't get all"));
    const result = await handler(defaultRequestBody);
    expect(result.body).toBe("couldn't get all")
  });

  it('should throw an error if something goes wrong when getting a single', async () => {
    mock.prototype.getItem = jest.fn(() => Promise.reject("couldn't get single"));
    const params = { pathParameters: { id: '1' } };
    const result = await handler({...defaultRequestBody, ...params});
    expect(result.body).toBe("couldn't get single")
  });
});