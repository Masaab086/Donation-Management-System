import Joi from "joi";

export const donationSchema = Joi.object({
  donorId: Joi.string().required().messages({
    "any.required": "Donor ID is required",
    "string.base": "Donor ID must be of string type",
  }),
  donationType: Joi.string().required().valid("In Kind", "Money").messages({
    "any.only": 'The field must be one of "In Kind" or "Money".',
    "string.base": "The donation type must be a string type",
    "any.required": "Donation type is required",
  }),
  ammount: Joi.number().min(1).required().messages({
    "any.required": "The amount is required",
    "number.min": "The amount should be greater than 0",
    "number.base": "The amount should be a number",
  }),
  description: Joi.string().required().messages({
    "any.required": "The description is required",
    "string.base": "The description should be a string",
  }),
});
export const updateDonationSchema = Joi.object({
  donationType: Joi.string().required().valid("In Kind", "Money").messages({
    "any.only": 'The field must be one of "In Kind" or "Money".',
    "string.base": "The donation type must be a string type",
    "any.required": "Donation type is required",
  }),
  ammount: Joi.number().min(1).required().messages({
    "any.required": "The amount is required",
    "number.min": "The amount should be greater than 0",
    "number.base": "The amount should be a number",
  }),
  description: Joi.string().required().messages({
    "any.required": "The description is required",
    "string.base": "The description should be a string",
  }),
});
