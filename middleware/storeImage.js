
const { containerNameProfile, blobServiceClient } = require('../config/azureStorage');

const containerClient = blobServiceClient.getContainerClient(containerNameProfile);

async function storeImage(req, res, next) {
  if (!req.files) {
    return next(new Error('No image file uploaded'));
  }

  const { originalname, mimetype, buffer } = req.files[0];
  const imageName = `${Date.now()}-${originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(imageName);
  // console.log("image name is"+originalname);
  try {
    // Upload the image to Azure Blob Storage
    await blockBlobClient.upload(buffer, buffer.length);
    // console.log("uri is "+ blockBlobClient.url);

    // Store the image URI in the request object
    res.locals.profilePic = blockBlobClient.url;
    // console.log("profilepic after update is :"+res.locals.profilePic);
    res.locals.imageName = imageName;
    res.locals.imageContentType = mimetype;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = storeImage;
