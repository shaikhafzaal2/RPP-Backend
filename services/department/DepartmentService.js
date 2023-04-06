let mongoose = require('mongoose');
const Department = require('../../models/Department');


let DepartmentService = {
  saveDepartment: (objDepartment,cb) => {
    return new Promise((resolve, reject) => {
        Department.create(objDepartment)
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
  deleteDepartment: (id, cb) => {
    return new Promise((resolve, reject) => {
        Department.findByIdAndUpdate(id,objProduct)
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

module.exports = DepartmentService;