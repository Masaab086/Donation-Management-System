import { InferSchemaType, model, Schema } from "mongoose";

const donationSchema = new Schema(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    donationType: {
      type: String,
      required: true,
      enum: ["In Kind", "Money"],
    },
    ammount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type Donation = InferSchemaType<typeof donationSchema>;

export default model<Donation>("Donation", donationSchema);
