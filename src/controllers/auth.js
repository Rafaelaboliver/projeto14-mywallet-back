import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import {
  sessionsCollection,
  usersCollection,
  walletsCollection,
} from "../config/collections.js";

//SignUp section:
export async function singUp(req, res) {
  const { name, email, password } = req.body;


  // check if email or name already exists
  const user = await usersCollection.findOne({
    $or: [{ email }, { name }],
  }).catch((err) => {
    console.log("Erro no findOne", err.message);
    return res.status(500).send("Internal server error");
  });
  if (user) {
    return res.status(400).send("Email or name already in use");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const cryptoPassword = await bcrypt.hash(password, salt);

  // create user
  await usersCollection.insertOne({
    name,
    email,
    password: cryptoPassword,
  });

  await walletsCollection.insertOne({
    name,
    balance: 0,
    coming: [],
  });

  // send status and token
  res.status(200).send("User created");
}

//SingIn section:
export async function singIn(req, res) {
  const { email, password } = req.body;

  // search for email
  const user = await usersCollection
    .findOne({
      email,
    })
    .catch((err) => {
      console.log("Erro no findOne", err.message);
      return res.status(500).send("Internal server error");
    });
  if (!user) {
    return res.status(400).send("Email or password is not valid");
  }

  // password validation
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).send("Email or password is not valid");
  }

  // create token
  const token = uuidV4();

  const session = {
    name: user.name,
    token,
  };

  // create session
  await sessionsCollection.insertOne(session);

  // send status and token
  res.status(200).send(session);
}

//CheckIn section:
