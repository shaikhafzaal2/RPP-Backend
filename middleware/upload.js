const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Create a multer middleware function for handling file uploads
const upload = multer(
//     {
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       const extension = file.originalname.split('.').pop();
//       const filename = `${uuidv4()}.${extension}`;
//       cb(null, filename);
//     }
//   })
// }
);
// .single('image');

module.exports = upload;