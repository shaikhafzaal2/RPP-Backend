var mongoose = require('mongoose')

/**
* @swagger
* definition:
*   Profile:
*     properties:
*       homeAccountId:
*          type: string
*       name:
*          type: string
*       email:
*          type: string
*       file:
*          type: string
*          format: binary   
*/

var ProfileSchema = new mongoose.Schema({
  homeAccountId:{ type: String, required: true, unique: true},
  name:String,
  email:{ type: String, required: true, unique: true},
  uri :String, 
  update_at:{ type:Date, default: Date.now},
});

module.exports = mongoose.model('Profile', ProfileSchema);
