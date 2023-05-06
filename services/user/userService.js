let User = require('../../models/User');


module.exports.UserService = {

 checkExistAndSave: (objUser, cb) =>{
  User.findOne({
      homeAccountId: objUser.homeAccountId
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        let newUser = {
          homeAccountId: objUser.homeAccountId,
          name: objUser.name,
          email: objUser.email,      
          admin: objUser.admin,
          eligible: true, 
          phoneNumber: objUser.phoneNumber || null,
          appliedCompanies: objUser.appliedCompanies || []  
        }
        console.log(newUser)
        User.create(newUser, function (err, post) {
          if (err) return next(err);
          console.log('User Saved Succesfully');
          cb ({ success: true, message: ' User not found new account created',user:post });
          
        });
        
      } else if (objUser.eligible!= undefined || objUser.appliedCompanies ) {
        let updateUser = {
          eligible:objUser.eligible!= undefined?objUser.eligible:user.eligible,      
          appliedCompanies: objUser.appliedCompanies || user.appliedCompanies  
        }
        const filter = { homeAccountId:objUser.homeAccountId};
        User.findOneAndUpdate(filter,  
          updateUser, null, function (err, docs) {
            if (err) return next(err);
            else{
                cb ({ success: true, message: 'User Updated',user:docs });
            }
           })      
      } 
      else {
       
        cb ({ success: true, message: ' User found',user:user });
     
    }}
    );
  },

  findUser:(homeAccountId, cb) =>{
    User.findOne({
      homeAccountId: homeAccountId
    }, (err, user) => {
      if (err) throw err;  
      if (user) cb(user);
    });
  },

  allUsers: (objrequest, cb) => {
    const { search } = objrequest;
    const queryObj = {};

    if (search) {
      const searchFields = ["name", "email"];
      const searchQuery = searchFields.map((field) => {
        return { [field]: { $regex: new RegExp(search, "i") } };
      });
      search =='no'?queryObj['eligible'] = false:  queryObj["$or"] = searchQuery;
    }

    User.find(queryObj, (err, users) => {
      if (err) cb(err);
      cb(users);
    });
  },
  
  deleteAllUser:(cb) =>{
    User.deleteMany({ }).then(()=> cb({success: true,"message":"data deleted successfully"}))
      
      
    }
  

}