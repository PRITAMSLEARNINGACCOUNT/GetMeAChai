import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    OID: {
      type: String,
      required: true,
      unique: true,
    },
    PaymentAmount: {
      type: Number,
      required: true,
    },
    PaymentMessage: {
      type: String,
      required: true,
    },
    PaymentPerson: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
