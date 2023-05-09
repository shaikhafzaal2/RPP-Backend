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
*       eligible:
*          type: boolean
*       phoneNumber:
*          type: number
*       appliedCompanies:
*          type: array
*/

var UserSchema = new mongoose.Schema({
  homeAccountId:{ type: String, required: true, unique: true},
  name:String,
  email:{ type: String, required: true, unique: true},
  admin:Boolean,
  eligible:Boolean, 
  phoneNumber: Number,
  appliedCompanies: [{ type: String }],
  update_at:{ type:Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
