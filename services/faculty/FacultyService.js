let mongoose = require('mongoose');
const Faculty = require('../../models/Faculty');


let FacultyService = {
  saveFaculty: (objFaculty,cb) => {
    return new Promise((resolve, reject) => {
        Faculty.create(objFaculty)
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
  deleteProduct: (id, cb) => {
    return new Promise((resolve, reject) => {
        Faculty.findByIdAndUpdate(id,objProduct)
      .then(response => {
        cb(response);
        resolve(response)
      })
      .catch(error => {
        cb(error)
        resolve(error)
      });
    });
  }
}

module.exports = FacultyService;