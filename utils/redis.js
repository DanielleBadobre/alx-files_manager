import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.error(`Redis client is not connected: ${error.message}`);
    });
    this.client.on('connect', () => {
      console.log('Redis client is connected');
    });
    this.client.connect().catch((error) => {
      console.error(`Redis connection error: ${error.message}`);
    });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (error) {
      console.error(`Error, couldn't set key ${key} to value ${value}: ${error.message}`);
    }
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error(`Error in key ${key}: ${error.message}`);
      return null;
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`could not delelte key ${key}: ${error.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default RedisClient;
