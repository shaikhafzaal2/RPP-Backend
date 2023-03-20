const { BlobServiceClient } = require('@azure/storage-blob');

const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const containerNameProfile = process.env.BLOB_CONTAINER_NAME_PROFILE;
const containerNameResume = process.env.BLOB_CONTAINER_NAME_RESUME;

module.exports = {
    'blobServiceClient': blobServiceClient,
    'containerNameProfile': containerNameProfile,
    'containerNameResume': containerNameResume,
  }
  