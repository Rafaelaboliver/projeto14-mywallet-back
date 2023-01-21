import { Router } from "express";
import { getWallet } from "../controllers/wallet.js";
import { authValidation } from "../middlewares/authMiddleware.js";

const walletRouter = Router();

walletRouter.use(authValidation);
walletRouter.get("/wallet", getWallet);

export default walletRouter;