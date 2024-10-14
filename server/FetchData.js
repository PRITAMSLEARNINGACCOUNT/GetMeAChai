"use server";
import User from "@/models/User";
async function fetchData({ username }) {
  let FindUser = await User.findOne({ username: username });
  if (FindUser) {
    return { success: true, data: JSON.parse(JSON.stringify(FindUser)) };
  } else {
    return { success: false };
  }
}
export default fetchData;
