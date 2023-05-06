var express = require('express');
var router = express.Router();
const Admin = require('../models/Admin');
const AdminService = require('../services/admin/adminService');
const authMiddleware = require('../middleware/checkAuth');


/**
* @swagger
* /admin/auth:
*   post:
*     tags:
*       - Admin
*     description: checks admin auth
*     produces:
*       - application/json
*     parameters:
*       - name: secret
*         description: adminSecret
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Admin'
*     responses:
*       200:
*         description: Valid Auth
*
*/
router.post('/auth', function(req,res,next){
   Admin.find(function(err,admininfo){
    
     if(err) return next(err);
     console.log(JSON.stringify( admininfo));
     if (req.body.secret ==admininfo[0]['secret']){

        res.json({'success':true,'message':'Admin authorized'});

    } else{
        res.json({'success':false,'message':'Admin not authorized'});


    }
  });
});


// router.get('/:id', function(req,res,next){
//   Admin.findById(req.params.id, function(err,post){
//     if(err) return next(err);
//     res.json(post);
//   });
// });

/**
 * @swagger
 * /admin/reset:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Admin
 *     description: Creates a new admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: admin
 *         description: admin details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/reset',authMiddleware, function(req,res,next){
   console.log(req.body.secret);
   Admin.deleteMany({ }, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('success');
    }
}).then(()=>{
    Admin.create(req.body);
   Admin.create(req.body, function (err, post) {
    if (err) return next(err);
    console.log('User Saved Succesfully');
    return res.json({"success":true,"message":"details updated"});
    });

  });
});



module.exports = router;
