import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';


dotenv.config()

//database settings
let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mongoClient.connect();
    db = mongoClient.db();
} catch (error) {
    console.log('Cannot connect to the server!');
}

export default db;