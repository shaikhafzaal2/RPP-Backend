let Profile = require('../../models/Profile');


module.exports.ProfileService = {

 checkExistAndSave: (objProfile, cb) =>{    
  Profile.findOne({
      homeAccountId: objProfile.homeAccountId
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        let newProfile = {
          homeAccountId: objProfile.homeAccountId,
          name: objProfile.name,
          email: objProfile.email,      
          admin: objProfile.admin,     
        }
        console.log(newProfile)
        Profile.create(newProfile, function (err, post) {
          if (err) return next(err);
          console.log('User Saved Succesfully');
          cb ({ success: true, message: 'Profile Created',profile:post });
          
        });
        
      } else if (user) {
        let updateUser = {
            homeAccountId: objUser.homeAccountId,
            name: objUser.name,
            email: objUser.email,      
            admin: objUser.admin,     
          }
          console.log(updateUser)
          User.findOneAndUpdate(filter,  
          updateUser, null, function (err, docs) {
            if (err) return next(err);
            else{
                cb ({ success: true, message: 'Profile Updated',user:user });
            }
        });
        
      
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