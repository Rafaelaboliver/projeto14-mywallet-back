import db from "./database.js";

export const usersCollection = db.collection('users');
export const sessionsCollection = db.collection('sessions');
export const walletsCollection = db.collection('wallets');

