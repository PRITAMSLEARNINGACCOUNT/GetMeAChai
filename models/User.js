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
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    Coverpic: {
      type: String,
      default: null,
      unique: true,
    },
    Profilepic: {
      type: String,
      default: null,
      unique: true,
    },
    UPI_ID: {
      type: String,
      default: null,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
