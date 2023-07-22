import Joi from "joi";

export const addItemSchema = Joi.object({
  itemTitle: Joi.string()
    .required()
    .messages({
      "any.required": "Please provide the item title",
      "string.base": "Item title must be a string",
    }),
  itemCategory: Joi.string()
    .required()
    .messages({
      "any.required": "Please provide the item category",
      "string.base": "Item category must be a string",
    }),

  total: Joi.number().default(0),
  inUsed: Joi.number().default(0),
});
