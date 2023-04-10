var mongoose = require('mongoose');

/**
* @swagger
* definitions:
*   CompanyType:
*     properties:
*       name:
*          type: string
*/

var CompanyTypeSchema = new mongoose.Schema({
  name: String, 
  update_at:{ type: Date, default:Date.now},
});

module.exports = mongoose.model('CompanyType', CompanyTypeSchema);
