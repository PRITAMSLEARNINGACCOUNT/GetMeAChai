import { DeleteImage } from "./CloudinaryConfig";

async function getpublic_id(secure_url) {
  // Extraction Of Public Id From Cloudinary Secure URL
  if (!secure_url.includes("cloudinary")) {
    return;
  }
  secure_url = secure_url.split("upload/").pop();
  secure_url = secure_url.split(".")[0].replace("%20", " ").split("/");
  await DeleteImage(secure_url[1] + "/" + secure_url[2]);
}
export { getpublic_id };
