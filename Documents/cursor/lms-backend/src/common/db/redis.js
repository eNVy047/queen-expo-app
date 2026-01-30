import Redis from 'ioredis';
import chalk from 'chalk';
import logger from '../logger/winston.logger.js';

// const redis = new Redis({
//   username: 'default',
//   password: 'Nx3YnPx2QnciagknhQCmokBoE6VbTvLz',
//   host: 'redis-10007.c330.asia-south1-1.gce.redns.redis-cloud.com',
//   port: 10007,
//   retryStrategy: (times) => {
//     const delay = Math.min(times * 50, 2000);
//     return delay;
//   }
// });

const redis = new Redis();

redis.on('connect', () => {
  logger.info(chalk.bgMagenta('Redis is connected successfully.'));
});

redis.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

export default redis;
