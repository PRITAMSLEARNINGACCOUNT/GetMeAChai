"use server";
import User from "@/models/User";
import { connectDB } from "./ConnectDB";
async function fetchData({ username }) {
  await connectDB();
  let FindUser = await User.findOne({ username: username });
  if (FindUser) {
    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({
          username: username,
          email: FindUser.email,
          Coverpic: FindUser.Coverpic,
          Profilepic: FindUser.Profilepic,
          UPI_ID: FindUser.UPI_ID,
          name: FindUser.name,
        })
      ),
    };
  } else {
    return { success: false, data: null };
  }
}
export default fetchData;
