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

  //checkIn data:
  export async function moneyInWallet(req, res) {
    // get user's name from locals session
    const { name } = res.locals.session;
  
    const { value, description, type } = req.body;
  
    // get user's wallet
    const userWallet = await walletsCollection.findOne({ name });
  
    const currentDay = new Date();
    const currentDate = currentDay.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  
    console.log(currentDate);
  
    const newComing = {
      date:currentDate,
      value,
      description,
      type,
    };
  
    if (type === "in") {
      userWallet.balance += Number(value);
    } else {
      userWallet.balance -= Number(value);
    }
    userWallet.balance = Math.round(userWallet.balance * 100) / 100;
  
    userWallet.coming.push(newComing);
  
    await walletsCollection.updateOne(
      { name },
      { $set: { balance: userWallet.balance, coming: userWallet.coming } }
    );
  
    // send status
    res.status(200).send("CheckIn added to wallet");
  }