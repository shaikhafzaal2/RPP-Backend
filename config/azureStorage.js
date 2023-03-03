const { BlobServiceClient } = require('@azure/storage-blob');

const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const containerName = process.env.BLOB_CONTAINER_NAME_PROFILE;

module.exports = {
    'blobServiceClient': blobServiceClient,
    'containerName': containerName
  }
  