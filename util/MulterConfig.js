import multer from "multer";
import path from "path";
const MulterStorage = multer.diskStorage({
  destination: "./assets/TemporaryImages", // Directory to save the uploaded files
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const FileUpload = multer({ storage: MulterStorage });
export default FileUpload.single("Profilepic");
