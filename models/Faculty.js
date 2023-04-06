var mongoose = require('mongoose');

/**
* @swagger
* definitions:
*   Faculty:
*     properties:
*       name:
*          type: string
*       domain:
*          type: string
*/

var FacultySchema = new mongoose.Schema({
  name: String,
  domain: String,
  update_at:{ type: Date, default:Date.now},
});

module.exports = mongoose.model('Faculty', FacultySchema);
