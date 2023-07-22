import { InferSchemaType, model, Schema } from "mongoose";

const donorSchema = new Schema(
  {
    cnic: {
      type: String,
      required: true,
    },
    donorName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isRegularDonor: {
      type: Boolean,
      default: false,
    },
    ammountDonated: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

type Donor = InferSchemaType<typeof donorSchema>;

export default model<Donor>("Donor", donorSchema);
