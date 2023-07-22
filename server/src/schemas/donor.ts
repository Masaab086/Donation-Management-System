import Joi from "joi";
export const addDonorSchema = Joi.object({
  cnic: Joi.string().required().messages({
    "string.base": "CNIC must be a string type",
    "any.required": "Cnic is required",
  }),
  donorName: Joi.string().required().messages({
    "string.base": "Donor name must be string type",
    "any.required": "Donor Name is required",
  }),
  address: Joi.string().required().messages({
    "any.rquired": "Donor's address is required",
    "string.base": "Donor address must be string type",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Donor's Email is required",
    "string.email": "Please provide a valid email",
  }),
  isRegularDonor: Joi.boolean().default(false),
  ammountDonated: Joi.number().default(0),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Phone number is required" }),
});
