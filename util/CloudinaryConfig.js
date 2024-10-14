import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "mattribastralay",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
function SignatureRequest(name) {
  let Signature = cloudinary.utils.sign_request(
    {
      timestamp: Math.round(new Date().getTime() / 1000),
      folder: "GetMeAChai",
      public_id: name + Math.round(new Date().getTime() / 1000),
    },
    {
      api_secret: process.env.CLOUDINARY_SECRET,
    }
  );
  let { signature, timestamp, public_id } = Signature;
  return { signature, timestamp, public_id };
}
async function UploadImage(File, name) {
  const { signature, timestamp, public_id } = SignatureRequest(name);
  const formData = new FormData();
  formData.append("file", File);
  formData.append("api_key", process.env.CLOUDINARY_KEY);
  formData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("folder", "GetMeAChai");
  formData.append("public_id", public_id);
  // console.log(formData);
  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  return await uploadRes.json();
}
async function DeleteImage(public_id) {
  let DeletionResult = await cloudinary.uploader.destroy(public_id);
  return DeletionResult;
}

export { UploadImage, DeleteImage };
