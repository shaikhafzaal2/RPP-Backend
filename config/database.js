require('dotenv').config();
let dbConnection = "mongodb://rppnewmaindb:obQ3FUIOz808EqlYxT0FI2s4Y0FMlZDLbwZZgcnBEg8qfVOAJHKh8huml0WmXY56DxFXTvD7QjbCACDbV8nx4w==@rppnewmaindb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@rppnewmaindb@"
// let dbConn =  'mongodb://'+ process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST +":" + process.env.DB_PORT ;
module.exports = {
  'secret': 'expressapitest',
  'dbConnection': dbConnection
}
