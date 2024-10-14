"use server";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
async function FormSubmit(req, res) {
  console.log("Form Submitted");
}

async function MainHandler(req, res) {
  const formData = await req.formData();
  const profilePic = formData.get("Profilepic");
  const coverPic = formData.get("Coverpic");

  // Define the directory to save the files
  const uploadDir = path.join(process.cwd(), "./assets/TemporaryImages");

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Save the profile picture
  if (profilePic) {
    const profilePicPath = path.join(uploadDir, profilePic.name);
    const profilePicBuffer = Buffer.from(await profilePic.arrayBuffer());
    fs.writeFileSync(profilePicPath, profilePicBuffer);
  }

  // // Save the cover picture
  // if (coverPic) {
  //   const coverPicPath = path.join(uploadDir, coverPic.name);
  //   const coverPicStream = fs.createWriteStream(coverPicPath);
  //   coverPic.stream().pipe(coverPicStream);
  // }

  return NextResponse.redirect(process.env.NEXT_PUBLIC_URL);
}

export { MainHandler as POST };
