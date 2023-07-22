import Joi from "joi";

export const addUserSchema = Joi.object({
  firstName: Joi.string().empty().required().messages({
    "any.required": "First name is required",
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
  }),
  lastName: Joi.string().empty().required().messages({
    "any.required": "Last Name  is required",
    "string.base": "Last name must be a string",
    "string.empty": "Last name cannot be empty",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string()
    .pattern(/^0\d{10}$/)
    .required()
    .messages({
      "any.required": "First name is required",
      "string.base": "First name must be a string",
      "string.pattern.base":
        "Phone must be a valid pakistan phone number 03123456789",
    }),

  password: Joi.string().min(8).max(32).required().messages({
    "ring.base": "Password must be a string.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least {#limit} characters long.",
    "string.max": "Password cannot exceed {#limit} characters.",
    "any.required": "Password is required.",
  }),

  isToResetPassword: Joi.boolean().default(false),
});
