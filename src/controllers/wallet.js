import {
    walletsCollection,
  } from "../config/collections.js";
  

  export async function getWallet(req, res) {
    const { name } = res.locals.session;
  
    // get wallet
    const wallet = await walletsCollection.findOne({ name });
  
    // send status and entries
    res.status(200).send(wallet);
  }