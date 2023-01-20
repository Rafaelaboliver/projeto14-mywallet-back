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
    const user = req.body;

    const schema = joi.object({
        name: joi.string().empty().required(),
        email: joi.string().email().empty().required(),
        password: joi.string().empty().required(),
        confirmPassword: joi.string().empty().required()
    })

    const result = schema.validate(user, { abortEarly: false });
    if (result.error) {
        const errorMessage = result.error.details.map((err) => {
            return err.message
        });
        return res.status(422).send(errorMessage);
    }

    const userCreated = await db.collection('cadastro').findOne({ email: user.email });
    if (userCreated) return res.status(409).send('The user already exists');

    const passwordOne = await db.collection('cadastro').findOne({ password: user.password });
    const passwordTwo = await db.collection('cadastro').findOne({ confirmPassword: user.confirmPassword });
    if (passwordOne !== passwordTwo) return res.status(422).send('Passwords do not match');

    try {
        await db.collection('cadastro').insertOne({
            name: user.name,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword
        })
        res.status(201).send('Successfully created!');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

//POST ('/login'):
app.post('/login', async (req, res) => {
    const user = req.body;

    const schema = joi.object({
        email: joi.string().email().empty().required(),
        password: joi.string().empty().required()
    });
    const result = schema.validate(user, { abortEarly: false });
    if (result.error) {
        const errorMessage = result.error.details.map((err) => {
            return err.message
        });
        return res.status(422).send(errorMessage);
    }


    try {

        const checkUser = await db.collection('cadastro').findOne({ email: user.email });
        if (!checkUser) return res.status(404).send('User or password are not correct!');

        if (user.password !== checkUser.password) return res.status(404).send('User or password are not correct!');

        return res.status(201).send('Successfully logged in!');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
})


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor listening on port ${PORT}`));
