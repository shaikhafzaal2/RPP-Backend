
const { containerNameResume, blobServiceClient } = require('../config/azureStorage');

const containerClient = blobServiceClient.getContainerClient(containerNameResume);

async function storeResume(req, res, next) {
  if (!req.files) {
    return next(new Error('No resume file uploaded'));
  }

  const { originalname, mimetype, buffer } = req.files[1];
  const resumeName = `${Date.now()}-${originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(resumeName);
  console.log("resume name is"+originalname);
  try {
    // Upload the resume to Azure Blob Storage
    await blockBlobClient.upload(buffer, buffer.length);
    console.log("resume uri is "+ blockBlobClient.url);

    // Store the resume URI in the request object
    res.locals.resume = blockBlobClient.url;
    console.log("resume after update is :"+res.locals.resume);
    res.locals.resumeName = resumeName;
    res.locals.resumeContentType = mimetype;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = storeResume;
