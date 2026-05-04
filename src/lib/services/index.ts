import type { Logger } from './logger';
import { notionLogger } from './logger-notion';
// import { mongoLogger } from './logger-mongo';

export function getLogger(): Logger {
  // if (process.env.LOG_BACKEND === 'mongo') return mongoLogger;
  return notionLogger;
}
