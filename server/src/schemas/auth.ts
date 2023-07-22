import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email is not valid",
    "any.required": "Email is requied",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "any.required": "Password is required",
    "string.empty": "Password not be empty",
  }),
});
