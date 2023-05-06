const Company = require("../../models/Company");    

module.exports.CompanyService = {

     allCompanies:(objrequest,cb) =>{

    const queryParams = Object.keys(objrequest);
    const queryObj = {};

    queryParams.forEach((param) => {
      if (param === 'name' || param === 'type' || param === 'jobLocation' || param === 'faculty' || param === 'role') {
        queryObj[param] = objrequest[param];
      } else if (param === 'minctc') {
        queryObj['ctc'] = { $gte: objrequest[param] };
      } else if (param === 'maxctc') {
        queryObj['ctc'] = { $lte: objrequest[param] };
      } else if (param === "search") {
        const searchFields = ["name", "type", "jobLocation", "faculty", "role", "jd", "aboutCompany", "required Qualifications"];
        const searchQuery = searchFields.map((field) => {
          return { [field]: { $regex: new RegExp(objrequest[param], "i") } };
        });
        queryObj["$or"] = searchQuery;
      }
    });
    
    
    console.log('params are:'+ JSON.stringify( queryObj));


       Company.find({ $and: [queryObj] },(err, companies) => {
         if (err) cb(err);       
         cb(companies);
       });
     }
   
   }