"use server";
import { NextResponse } from "next/server";
import { UploadImage } from "@/util/CloudinaryConfig";
import User from "@/models/User";
import { getpublic_id } from "@/util/Constants";

async function MainHandler(req) {
  const Body = await req.formData();
  const ProfilePictureFile = Body.get("Profilepic");
  const CoverPictureFile = Body.get("Coverpic");
  const name = Body.get("name");
  const username = Body.get("username");
  const email = Body.get("email");
  const UPI_ID = Body.get("UPI_ID");
  try {
    let FoundedUser = await User.findOne({ email });
    let Coverpicurl = FoundedUser.Coverpic;
    let Profilepicurl = FoundedUser.Profilepic;

    if (ProfilePictureFile !== "undefined") {
      if (Profilepicurl) {
        await getpublic_id(Profilepicurl);
      }
      let DPUR = await UploadImage(ProfilePictureFile, name + " Profilepic");
      Profilepicurl = DPUR.secure_url;
    }
    if (CoverPictureFile !== "undefined") {
      if (Coverpicurl) {
        await getpublic_id(Coverpicurl);
      }
      let CPUR = await UploadImage(CoverPictureFile, name + " Coverpic");
      Coverpicurl = CPUR.secure_url;
    }

    let UpdatedBody = {
      Profilepic: Profilepicurl,
      Coverpic: Coverpicurl,
      name,
      username,
      email,
      UPI_ID,
    };

    if (!username === FoundedUser.username) {
      if (await User.findOne({ username })) {
        return NextResponse.json(
          {
            error: "Username already exists Please enter a different username",
          },
          { status: 400 }
        );
      }
    }
    await User.findOneAndUpdate({ email }, UpdatedBody);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { MainHandler as POST };
