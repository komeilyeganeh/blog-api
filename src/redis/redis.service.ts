import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async set(key: string, value: unknown) {
    return await this.redis.set(key, JSON.stringify(value));
  }

  async setWithTTL(key: string, value: unknown, ttl: number) {
    return await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async get(key: string) {
    const val = await this.redis.get(key);
    if (!val) {
      return null;
    }
    return JSON.parse(val);
  }

  async del(key: string) {
    return await this.redis.del(key);
  }
}
