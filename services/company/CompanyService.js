const Company = require("../../models/Company");    

module.exports.CompanyService = {

     allCompanies:(cb) =>{
       Company.find((err, companies) => {
         if (err) cb(err);       
         cb(companies);
       });
     }
   
   }