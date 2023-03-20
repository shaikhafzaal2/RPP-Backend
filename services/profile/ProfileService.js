let Profile = require('../../models/Profile');


module.exports.ProfileService = {

 checkExistAndSave: (objProfile,res, cb, next) =>{  
  // console.log("image uri is: "+ res.locals.profilePic);
  Profile.findOne({
      homeAccountId: objProfile.homeAccountId
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        let newProfile = {
          homeAccountId: objProfile.homeAccountId,
          name: objProfile.name,
          email: objProfile.email,      
          profilePic: res.locals.profilePic,
          degree: objProfile.degree,
          faculty: objProfile.faculty,
          phoneNumber: objProfile.phoneNumber,
          stream: objProfile.stream,
          cgpa: objProfile.cgpa,
          startYear: objProfile.startYear,
          endYear: objProfile.endYear,
          resume:res.locals.resume,
          programme: objProfile.programme,   
        }
        console.log(newProfile)
        Profile.create(newProfile, function (err, post) {
          if (err) return next(err);
          console.log('User Saved Succesfully');
          cb ({ success: true, message: 'Profile Created',profile:post });
          
        });
        
      } else if (user) {
        let updateUser = {
          homeAccountId: objProfile.homeAccountId,
          name: objProfile.name,
          email: objProfile.email,      
          profilePic:  res.locals.profilePic,
          degree: objProfile.degree,
          faculty: objProfile.faculty,
          phoneNumber: objProfile.phoneNumber,
          stream: objProfile.stream,
          cgpa: objProfile.cgpa,
          startYear: objProfile.startYear,
          endYear: objProfile.endYear,
          resume:res.locals.resume,
          programme: objProfile.programme,   
          }
          console.log(updateUser)
          const filter = { homeAccountId:objProfile.homeAccountId}
          Profile.findOneAndUpdate(filter,  
          updateUser, null, function (err, docs) {
            if (err) return next(err);
            else{
                cb ({ success: true, message: 'Profile Updated',user:updateUser });
            }
        });
        
      
      }
    })
  },

  findProfile:(homeAccountId, cb) =>{
    Profile.findOne({
      homeAccountId: homeAccountId
    }, (err, user) => {
      if (err) throw err;  
      if (user) cb(user);
    });
  },

  allProfiles:(cb) =>{
    Profile.find((err, users) => {
      if (err) cb(err);       
      cb (users)      
    });
  },
  
  deleteAllProfiles:(cb) =>{
    Profile.deleteMany({ }).then(()=> cb({success: true,"message":"data deleted successfully"}))
      
      
    }
  

}