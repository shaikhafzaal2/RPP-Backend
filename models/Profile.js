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
*       profilePic:
*          type: string
*       degree:
*          type: string
*       faculty:
*          type: string
*       phoneNumber:
*          type: number
*       stream:
*          type: string
*       cgpa:
*          type: number
*       startYear:
*          type: number
*       endYear:
*          type: number
*       resume:
*          type: string
*       programme:
*          type: string
*             
*/

var ProfileSchema = new mongoose.Schema({
  homeAccountId:{ type: String, required: true, unique: true},
  name:String,
  email:{ type: String, required: true, unique: true}, 
  profilePic: String,
  degree: String,
  faculty: String,
  phoneNumber: Number,
  stream: String,
  cgpa: Number,
  startYear: Number,
  endYear: Number,
  resume:String,
  programme: String,
  update_at:{ type:Date, default: Date.now},
});

module.exports = mongoose.model('Profile', ProfileSchema);
