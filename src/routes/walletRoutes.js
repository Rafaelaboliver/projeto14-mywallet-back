import { Router } from "express";
import { getWallet, moneyInWallet } from "../controllers/wallet.js";
import { authValidation } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateShemas.js";
import comingSchema from "../schemas/comingSchemas.js";

const walletRouter = Router();

walletRouter.use(authValidation);
walletRouter.get("/wallet", getWallet);
walletRouter.post("/wallet", validateSchema(comingSchema), moneyInWallet);

export default walletRouter;