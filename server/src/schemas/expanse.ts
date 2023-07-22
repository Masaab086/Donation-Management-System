import Joi from "joi";

export const addExpanseSchema = Joi.object({
  type: Joi.string()
    .valid("Education", "Employee", "Food", "Shelter", "clothes")
    .required()
    .messages({
      "any.required": "Type is required",
      "any.only":
        "Type must be one of Education, Employee, Food, Shelter, or clothes",
    }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),
  ammount: Joi.number().required().messages({
    "any.required": "Ammount is required",
  }),
});
export const updateExpanseSchema = Joi.object({
  type: Joi.string()
    .valid("Education", "Employee", "Food", "Shelter", "clothes")
    .required()
    .messages({
      "any.required": "Type is required",
      "any.only":
        "Type must be one of Education, Employee, Food, Shelter, or clothes",
    }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),
  ammount: Joi.number().required().messages({
    "any.required": "Ammount is required",
  }),
});
