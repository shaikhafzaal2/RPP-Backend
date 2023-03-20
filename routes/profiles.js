var express = require('express');
var router = express.Router();



const authMiddleware = require('../middleware/checkAuth.js');

const { ProfileService } = require('../services/profile/ProfileService.js');
const upload = require('../middleware/upload.js');
const storeImage = require('../middleware/storeImage.js');
const storeResume = require('../middleware/storeResume.js');




/**
* @swagger
* /profiles:
*   get:
*     tags:
*       - Profiles
*     description: Returns a list of profiles
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A profile list
*         schema:
*           $ref: '#/definitions/Profile'
*
*/
/* GET users listing. */
router.get('/', function (req, res, next) {
  ProfileService.allProfiles((result)=>{
    console.log(result);
    return res.json(result);
  })
  // User.find((err, users) => {
  //   if (err) return next(err);
  //   res.json(users)
  // });
});


/**
* @swagger
* /profiles/{id}:
*   get:
*     tags:
*       - Profiles
*     description: Return a single profile
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: homeAccountId
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: A single profile
*         schema:
*           $ref: '#/definitions/Profile'
*
*/
router.get('/:id', (req,res,next) => {
    ProfileService.findProfile(req.params.id, (result) => {
        return res.json(result);
      })
   
  });



/**
 * @swagger
 * /profiles/register:
 *   post:
 *     security:
 *       - Bearer: []   
 *     tags:
 *       - Profiles
 *     description: Creates a new profile
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: profile
 *         description: profile object
 *         in: formData
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Profile'
 *       - name: image
 *         description: profile image
 *         in: formData
 *         required: false
 *         type: file
 *       - name: resume
 *         description: resume
 *         in: formData
 *         required: false
 *         type: file
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Unauthorized access to api
 *       404:
 *         description: Not found or record not found
 */
router.post('/register',authMiddleware, upload.any(),storeImage,storeResume, async(req, res, next) => {
  // console.log(JSON.parse( req.body.profile));
  console.log(req.files);
  console.log(req.body.profile?JSON.parse( req.body.profile).profilePic:req.body)
  ProfileService.checkExistAndSave(req.body.profile?JSON.parse( req.body.profile):req.body,res, (result) => {
    return res.json(result);
  },next)
 
});


/**
 * @swagger
 * /profiles/deleteAll:
 *   delete:
 *     security:
 *       - Bearer: []   
 *     tags:
 *       - Profiles
 *     description: Deletes all profiless
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Unauthorized access to api
 *       404:
 *         description: Not found or record not found
 */
router.delete('/deleteAll', authMiddleware,(req, res, next) => {
  ProfileService.deleteAllProfiles((result) => {
    console.log(result);
    return res.json(result);
  })
 
});


module.exports = router;





