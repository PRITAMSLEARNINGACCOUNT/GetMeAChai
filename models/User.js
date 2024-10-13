import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    Coverpic: {
      type: String,
      default: null,
    },
    Profilepic: {
      type: String,
      default: null,
    },
    UPI_ID: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
