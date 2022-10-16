require('dotenv').config();
let dbConnection = "mongodb://rpp-db:vAhMGzN3Bl6xzYm3d5ardcSMImFi1e5DA3hUgY5iHHfz9LrRlJNB7GfHNngdtCBYJuSEX2B92BcwKHXNSZJhBg==@rpp-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@rpp-db@";
// let dbConn =  'mongodb://'+ process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST +":" + process.env.DB_PORT ;
module.exports = {
  'secret': 'expressapitest',
  'dbConnection': dbConnection
}
