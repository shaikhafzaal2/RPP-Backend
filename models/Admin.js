var mongoose = require('mongoose');

/**
* @swagger
* definitions:
*   Admin:
*     properties:
*       secret:
*          type: string
*/

var AdminSchema = new mongoose.Schema({
  secret: String,
  update_at:{ type: Date, default:Date.now},    
});

module.exports = mongoose.model('Admin', AdminSchema);
