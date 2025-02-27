var os = require('os');

var swaggerconf = {
    swaggerOptions: {
     swaggerDefinition:  {
         info: {
           title: process.env.SWAGGER_TITLE,
           version: process.env.SWAGGER_VERSION,
           decription: process.env.SWAGGER_DESC
         },
        //  host: process.env.SWAGGER_HOST,
         basePath: process.env.SWAGGER_BASE_PATH,
         securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        }
       },
     apis:['./routes/*.js', './models/*.js', './routes/**/*.js'],
    }
}

module.exports = swaggerconf
