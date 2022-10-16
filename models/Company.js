let mongoose = require('mongoose');

/**
* @swagger
* definition:
*   Company:
*     properties:
*       name:
*          type: string
*       position:
*          type: string
*       eligibility:
*          type: string
*       ctc:
*          type: string
*       internship:
*          type: string
*       jobLocation:
*          type: string
*       date:
*          type: date
*       jd:
*          type: string
*       additionalInformation:
*          type: string
*/

let CompanySchema = new mongoose.Schema({
   name:{
      type:String,
      required:true
  },
  position:{
      type:String
  },
  eligibility:{
      type:String,
      required:true
  },
  ctc:{
      type:String,
  },
  internship:{
      type:String,
  },
  jobLocation:{
      type:String
  },
  date:
  {
      type:Date
  },
  jd:
  {
      type:String
  }, 
  additionalInformation:{
      type:String
   },
});

module.exports = mongoose.model('Company', CompanySchema);
