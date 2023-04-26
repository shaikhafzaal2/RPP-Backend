var mongoose = require('mongoose');

/**
* @swagger
* definitions:
*   Degree:
*     properties:
*       name:
*          type: string
*/

var DegreeSchema = new mongoose.Schema({
  name: String,
  update_at:{ type: Date, default:Date.now},    
});

module.exports = mongoose.model('Degree', DegreeSchema);
