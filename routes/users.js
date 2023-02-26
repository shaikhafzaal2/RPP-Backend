var express = require('express');
var router = express.Router();
var User = require("../models/User.js");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { UserService } = require('../services/user/userService.js');
const authMiddleware = require('../middleware/checkAuth.js');

/**
* @swagger
* /users:
*   get:
*     tags:
*       - Users
*     description: Returns a list of users
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A user list
*         schema:
*           $ref: '#/definitions/User'
*
*/
/* GET users listing. */
router.get('/', function (req, res, next) {
  UserService.allUsers((result)=>{
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
 * /users/register:
 *   post:
 *     security:
 *       - Bearer: []   
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Unauthorized access to api
 *       404:
 *         description: Not found or record not found
 */
router.post('/register',authMiddleware, (req, res, next) => {
  UserService.checkExistAndSave(req.body, (result) => {
    return res.json(result);
  })
 
});



module.exports = router;
