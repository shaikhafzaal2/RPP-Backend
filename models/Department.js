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
*       keyword:
*          type: string
*/

var DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  faculty: String,
  keyword:String,
  update_at:{ type: Date, default:Date.now},
});

module.exports = mongoose.model('Department', DepartmentSchema);
