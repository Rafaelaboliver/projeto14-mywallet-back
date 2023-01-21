import joi from "joi"

//SignUn section:
export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    name: joi.string().min(2).required(),
  });

  //SignIn section:
  export const singInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
  });