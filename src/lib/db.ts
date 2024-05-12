import { MongoClient } from "mongodb";
const url: string = 'mongodb+srv://thegreatcbt:jian!0806@chatteria.lhs1l9b.mongodb.net/';
const client: MongoClient = new MongoClient(url);
const dbName: string = 'chatteria';

await client.connect()

console.log('good connection with server');

export default client.db(dbName)