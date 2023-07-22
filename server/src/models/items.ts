import { InferSchemaType, model, Schema } from "mongoose";

const itemSchema = new Schema(
  {
    itemTitle: {
      type: String,
      required: true,
    },

    itemCategory: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    inUsed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

type Item = InferSchemaType<typeof itemSchema>;

export default model<Item>("Item", itemSchema);
