import { DeleteImage } from "./CloudinaryConfig";

async function getpublic_id(secure_url) {
  // Extraction Of Public Id From Cloudinary Secure URL
  if (!secure_url.includes("cloudinary")) {
    return;
  }
  secure_url = secure_url.split("upload/").pop();
  if (!secure_url.split(".")[0].includes("%40")) {
    secure_url = secure_url.split(".")[0].replace("%20", " ").split("/");
    await DeleteImage(secure_url[1] + "/" + secure_url[2]);
  } else {
    secure_url = secure_url
      .split("/GetMeAChai/")[1]
      .replace("%40", "@")
      .split(".");
    secure_url = secure_url[0] + "." + secure_url[1];
    secure_url = "GetMeAChai/" + secure_url;
    await DeleteImage(secure_url);
  }
}
export { getpublic_id };
