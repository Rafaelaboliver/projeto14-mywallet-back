import { sessionsCollection } from "../config/collections.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(422).send("Token is missing");

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session)
      return res.status(401).send("Token is invalid or has expired");

    res.locals.session = session;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
}