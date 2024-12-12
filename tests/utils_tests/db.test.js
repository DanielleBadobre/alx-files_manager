// tests/dbClient.test.js
import dbClient from '../utils/db';

describe('Database Client', () => {
  beforeAll(async () => {
    await dbClient.connect();
  });

  afterAll(async () => {
    await dbClient.client.close();
  });

  test('should connect to MongoDB', () => {
    expect(dbClient.isAlive()).toBe(true);
  });

  test('should return the number of documents', async () => {
    const count = await dbClient.nbUsers();
    expect(typeof count).toBe('number');
  });
});
