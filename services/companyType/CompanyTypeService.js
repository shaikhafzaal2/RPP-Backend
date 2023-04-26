let mongoose = require('mongoose');

const CompanyType = require('../../models/CompanyType');


let CompanyTypeService = {
  saveCompanyType: (objCompanyType,cb) => {
    return new Promise((resolve, reject) => {
        CompanyType.create(objCompanyType)
      .then(response => {
          cb(response);
          resolve(response);
      })
      .catch(error => {
        cb(error);
        resolve(error);
      })
    })
  },
}

module.exports = CompanyTypeService;