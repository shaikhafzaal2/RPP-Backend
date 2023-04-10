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
      }
    });

    console.log('params are:'+ JSON.stringify( queryObj));


    // const companies = Company.find(queryObj).sort({ date: -1 }).exec();
    //   cb (companies);
       Company.find({ $and: [queryObj] },(err, companies) => {
         if (err) cb(err);       
         cb(companies);
       });
     }
   
   }