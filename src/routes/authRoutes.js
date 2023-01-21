import { Router } from "express";
import { singUp } from "../controllers/auth.js";
import { validateSchema } from "../middlewares/validateShemas.js";
import { signUpSchema } from "../schemas/authSchemas.js";


const authRouter = Router();

authRouter.post("/singUp", validateSchema(signUpSchema), singUp);

export default authRouter;

