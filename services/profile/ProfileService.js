let Profile = require('../../models/Profile');
const User = require('../../models/User');


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
          profilePic: res.locals.profilePic? res.locals.profilePic: objProfile.profilePic,
          degree: objProfile.degree,
          faculty: objProfile.faculty,
          phoneNumber: objProfile.phoneNumber,
          stream: objProfile.stream,
          cgpa: objProfile.cgpa,
          startYear: objProfile.startYear,
          endYear: objProfile.endYear,
          resume: res.locals.resume? res.locals.resume:objProfile.resume,
          programme: objProfile.programme,   
        }
        console.log(newProfile)
        let updateUser = {
          phoneNumber:objProfile.phoneNumber,
        }
        const filter = { homeAccountId:objUser.homeAccountId};
        User.findOneAndUpdate(filter,  
          updateUser,function(err, doc){
            if(err){
                console.log("Something wrong when updating data!"+err);
            }
        
            console.log("phone no update res "+doc);
        });
        Profile.create(newProfile, function (err, post) {
          if (err) return next(err);
          console.log('User Saved Succesfully');
          User.fin
          cb ({ success: true, message: 'Profile Created',profile:post });
          
        });
        
      } else if (user) {
        let updateProfile = {
          homeAccountId: objProfile.homeAccountId,
          name: objProfile.name,
          email: objProfile.email,      
          profilePic:res.locals.profilePic? res.locals.profilePic: objProfile.profilePic,
          degree: objProfile.degree,
          faculty: objProfile.faculty,
          phoneNumber: objProfile.phoneNumber,
          stream: objProfile.stream,
          cgpa: objProfile.cgpa,
          startYear: objProfile.startYear,
          endYear: objProfile.endYear,
          resume:res.locals.resume? res.locals.resume:objProfile.resume,
          programme: objProfile.programme,   
          }
          
          const filter = { homeAccountId:objProfile.homeAccountId}

          let updateUser = {
            phoneNumber:objProfile.phoneNumber,
          }
       
          User.findOneAndUpdate(filter,updateUser,function(err, doc){
            if(err){
                console.log("Something wrong when updating data!"+err);
            }
        
            console.log("phone no update res "+doc);
        });
          Profile.findOneAndUpdate(filter,  
          updateProfile, null, function (err, docs) {
            if (err) return next(err);
            else{
                cb ({ success: true, message: 'Profile Updated',user:updateUser });
            }
        });
        
      
      }
    })
  },

  findProfile:(homeAccountId, cb) =>{
    Profile.find({
      homeAccountId: homeAccountId
    }, (err, user) => {
      if (err) throw err;  
      if (user) cb(user[0]);
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