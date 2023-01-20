import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import joi from 'joi';
import { MongoClient } from 'mongodb';
import dayjs from 'dayjs';
import utf8 from "utf8";

dotenv.config()

//servidor settings
const app = express();
app.use(cors());
app.use(express.json());

//database settings
let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mongoClient.connect();
    db = mongoClient.db();
} catch (error) {
    console.log('Cannot connect to the server!');
}

//POST ('/cadastro'):
app.post('/cadastro', async (req, res) => {
    try {
        await db.collection('users').insertOne({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })
        res.status(201).send('Successfully created!');

        const userCreated = await db.collection('users').findOne({email: req.body.email});
        if (userCreated) return res.status(409).send('The user already exists');

        const passwordOne = await db.collection('users').findOne({password: req.body.password});
        const passwordTwo = await db.collection('users').findOne({confirmPassword: req.body.confirmPassword});
        if (passwordOne !== passwordTwo) return res.status(422).send('Passwords do not match');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

//POST ('/login'):


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor listening on port ${PORT}`));
