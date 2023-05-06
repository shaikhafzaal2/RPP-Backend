let mongoose = require('mongoose');

const Admin = require('../../models/Admin');


let AdminService = {
  saveAdmin: (objAdmin,cb) => {
    return new Promise((resolve, reject) => {
        Admin.create(objAdmin)
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

module.exports = AdminService;