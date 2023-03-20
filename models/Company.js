let mongoose = require('mongoose');

/**
* @swagger
* definition:
*   Company:
*     properties:
*       name:
*          type: string
*       type:
*          type: string
*       jobLocation:
*          type: string
*       faculty:
*          type: string
*       role:
*          type: string
*       ctc:
*          type: number
*       date:
*          type: date
*       aboutCompany:
*          type: string
*       jd:
*          type: string
*       requiredQualifications:
*          type: string
*       requiredcgpa:
*          type: number
*/

let CompanySchema = new mongoose.Schema({
   name:{
      type:String,
      required:true
  },
  type:{
      type:String
  },
  jobLocation:{
      type:String,
      required:true
  },
  faculty:{
      type:String,
  },
  role:{
      type:String,
  },
  ctc:{
      type:Number
  },
  date:
  {
      type:Date
  },
  aboutCompany:
  {
      type:String
  }, 
  jd:
  {
      type:String
  }, 
  requiredQualifications:{
      type:String
   },
   requiredcgpa:{
    type:Number
},
});

module.exports = mongoose.model('Company', CompanySchema);
