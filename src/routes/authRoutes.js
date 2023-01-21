import { Router } from "express";
import { singUp, singIn } from "../controllers/auth.js";
import { validateSchema } from "../middlewares/validateShemas.js";
import { signUpSchema, singInSchema } from "../schemas/authSchemas.js";


const authRouter = Router();

authRouter.post("/singUp", validateSchema(signUpSchema), singUp);
authRouter.post("/singIn", validateSchema(singInSchema), singIn);

export default authRouter;

