let mongoose = require('mongoose');

const CompanyType = require('../../models/CompanyType');
const Degree = require('../../models/Degree');


let DegreeService = {
  saveDegree: (objDegree,cb) => {
    return new Promise((resolve, reject) => {
        Degree.create(objDegree)
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

module.exports = DegreeService;