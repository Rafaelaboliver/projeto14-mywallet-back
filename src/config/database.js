import dotenv from 'dotenv';
import joi from 'joi';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';


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