
const { containerName, blobServiceClient } = require('../config/azureStorage');

const containerClient = blobServiceClient.getContainerClient(containerName);

async function storeImage(req, res, next) {
  if (!req.file) {
    return next(new Error('No image file uploaded'));
  }

  const { originalname, mimetype, buffer } = req.file;
  const imageName = `${Date.now()}-${originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(imageName);

  try {
    // Upload the image to Azure Blob Storage
    await blockBlobClient.upload(buffer, buffer.length);

    // Store the image URI in the request object
    req.imageUri = blockBlobClient.url;
    req.imageName = imageName;
    req.imageContentType = mimetype;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = storeImage;
