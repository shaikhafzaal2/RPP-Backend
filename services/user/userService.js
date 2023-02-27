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
        }
        console.log(newUser)
        User.create(newUser, function (err, post) {
          if (err) return next(err);
          console.log('User Saved Succesfully');
          cb ({ success: true, message: ' User not found new account created',user:post });
          
        });
        
      } else if (user) {
        cb ({ success: true, message: ' User found',user:user });
      
      }
    })
  },

  findUser:(homeAccountId, cb) =>{
    User.findOne({
      homeAccountId: homeAccountId
    }, (err, user) => {
      if (err) throw err;  
      if (user) cb(user);
    });
  },

  allUsers:(cb) =>{
    User.find((err, users) => {
      if (err) cb(err);       
      cb (users)      
    });
  },
  
  deleteAllUser:(cb) =>{
    User.deleteMany({ }).then(()=> cb({success: true,"message":"data deleted successfully"}))
      
      
    }
  

}