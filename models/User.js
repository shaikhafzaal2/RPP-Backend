var mongoose = require('mongoose')

/**
* @swagger
* definition:
*   User:
*     properties:
*       homeAccountId:
*          type: string
*       name:
*          type: string
*       email:
*          type: string
*       admin:
*          type: boolean

*/

var UserSchema = new mongoose.Schema({
  homeAccountId:{ type: String, required: true, unique: true},
  name:String,
  email:{ type: String, required: true, unique: true},
  admin:Boolean, 
  update_at:{ type:Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
