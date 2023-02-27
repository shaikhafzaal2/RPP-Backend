require('dotenv').config();
let dbConnection = "mongodb://rppdatabase:mAcE4CupVv9cpM2jArh2IqupqDak6HfcpnAaJamy5KXdoCxJC2F66sg7lffE6VQQckRxnV8dfiyxACDbsyto0A==@rppdatabase.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@rppdatabase@";
// let dbConn =  'mongodb://'+ process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST +":" + process.env.DB_PORT ;
module.exports = {
  'secret': 'expressapitest',
  'dbConnection': dbConnection
}
