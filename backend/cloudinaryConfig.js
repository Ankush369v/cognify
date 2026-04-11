const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,

//   params: {
//     folder: 'cognify',
//     resource_type: "auto",
//     allowed_formats:  ["pdf", "doc", "docx", "txt", "c", "cpp", "js", "py", "java"] // supports promises as well
//   },
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const codeFormats = ["c", "cpp", "js", "py", "java", "txt"];
//     const docFormats = ["pdf", "doc", "docx"];

//     const extension = file.originalname.split(".").pop().toLowerCase();

//     return {
//       folder: "cognify",
//       resource_type: codeFormats.includes(extension) ? "raw" : "auto",
//       allowed_formats: [...codeFormats, ...docFormats],
//       public_id: `${file.fieldname}-${Date.now()}`
//     };
//   }
// });


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const extension = file.originalname.split(".").pop().toLowerCase();

    // Explicitly handle Data files as RAW to prevent corruption
    const rawFormats = ["c", "cpp", "js", "py", "java", "txt", "doc", "docx", "csv", "xlsx", "xls"];

    if (rawFormats.includes(extension)) {
      return {
        folder: "cognify",
        resource_type: "raw", // CRITICAL for CSV/Excel
        public_id: `${file.fieldname}-${Date.now()}-${file.originalname}`
      };
    } else {
      return {
        folder: "cognify",
        resource_type: "auto",
        allowed_formats: ["pdf", "jpg", "png", "jpeg"],
        public_id: `${file.fieldname}-${Date.now()}-${file.originalname}`
      };
    }
  }
});

module.exports = { cloudinary, storage };


