import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.error('Redis Client Error:', error);
    });
    this.client.connect().catch((error) => {
      console.error('Failed to connect to Redis:', error);
    });
  }

  isAlive() {
    return this.client.isOpen; // `isOpen` is true if the Redis client is connected.
  }

  async set(key, value) {
    await this.client.set(key, value);
  }

  async get(key) {
    return await this.client.get(key);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
