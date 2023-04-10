var mongoose = require('mongoose');

/**
* @swagger
* definitions:
*   Department:
*     properties:
*       name:
*          type: string
*       faculty:
*          type: string
*/

var DepartmentSchema = new mongoose.Schema({
  name: String,
  faculty: String,
  update_at:{ type: Date, default:Date.now},
});

module.exports = mongoose.model('Department', DepartmentSchema);
