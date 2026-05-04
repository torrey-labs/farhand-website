// Future Mongo backend — uncomment when we migrate from Notion.
//
// import type { Logger } from './logger';
// import { MongoClient } from 'mongodb';
//
// const client = new MongoClient(process.env.MONGODB_URI!);
// const db = client.db('farhand');
//
// export const mongoLogger: Logger = {
//   async append(e) {
//     await db.collection('service_log').insertOne({
//       ts: e.ts,
//       work_order: e.workOrder,
//       tech: e.tech,
//       ip: e.ip,
//       client_id: e.clientId,
//       log_page_id: e.logPageId,
//     });
//   },
// };
export {};
