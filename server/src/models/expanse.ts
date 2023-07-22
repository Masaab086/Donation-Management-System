import { InferSchemaType, model, Schema } from "mongoose";

const expanseSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Education", "Employee", "Food", "Shelter", "clothes"],
    },

    description: {
      type: String,
      required: true,
    },

    ammount: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

type Expanse = InferSchemaType<typeof expanseSchema>;

export default model<Expanse>("Expanse", expanseSchema);
