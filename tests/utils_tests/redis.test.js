//tests/redis.test.js
import redisClient from '../utils/redis';

describe('Redis Client', () => {
  beforeAll(async () => {
    await redisClient.connect();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  test('should connect to Redis', () => {
    expect(redisClient.isAlive()).toBe(true);
  });

  test('should set and get a key', async () => {
    await redisClient.set('test_key', 'test_value', 10);
    const value = await redisClient.get('test_key');
    expect(value).toBe('test_value');
  });

  test('should expire a key', async () => {
    await redisClient.set('temp_key', 'temp_value', 1);
    const value = await redisClient.get('temp_key');
    expect(value).toBe('temp_value');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const expiredValue = await redisClient.get('temp_key');
    expect(expiredValue).toBeNull();
  });
});
