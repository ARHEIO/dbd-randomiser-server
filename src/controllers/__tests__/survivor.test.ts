import { handler } from '../survivor';
import defaultRequestBody from '../../../__mocks__/fixtures/request-body';
import { dbdRandomiserSurvivors } from '../../../__mocks__/fixtures/mock-data';
import { SurvivorService } from '../../services/SurvivorService'

const mock = <jest.Mock>(SurvivorService);

describe('Survivor controller', () => {
  it('should return all survivors when no additional params', async () => {
    mock.prototype.getAllCharacters = jest.fn(() => Promise.resolve(dbdRandomiserSurvivors));
    const result = await handler(defaultRequestBody);
    expect(result.body).toBe(JSON.stringify(dbdRandomiserSurvivors))
  });

  it('should return a specific survivor when given a path param', async () => {
    mock.prototype.getCharacter = jest.fn(() => Promise.resolve(dbdRandomiserSurvivors[0]));
    const params = { pathParameters: { id: '1' } };
    const result = await handler({...defaultRequestBody, ...params});
    expect(result.body).toBe(JSON.stringify(dbdRandomiserSurvivors[0]))
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