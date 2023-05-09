var express = require('express');
var router = express.Router();

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
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*         description: search across all fields
*     responses:
*       200:
*         description: A user list
*         schema:
*           $ref: '#/definitions/User'
*
*/
/* GET users listing. */
router.get('/', function (req, res, next) {
  UserService.allUsers(req.query,(result)=>{
    console.log(result);
    return res.json(result);
  }) 
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
  },next)
 
});

/**
* @swagger
* /users/{id}:
*   get:
*     tags:
*       - Users
*     description: Return a single user
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
*         description: A single user
*         schema:
*           $ref: '#/definitions/User'
*
*/
router.get('/:id', (req,res,next) => {
 UserService.findUser(req.params.id, (result) => {
      return res.json(result);
    })
 
});


/**
 * @swagger
 * /users/deleteAll:
 *   delete:
 *     security:
 *       - Bearer: []   
 *     tags:
 *       - Users
 *     description: Deletes all users
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
router.delete('/deleteAll',authMiddleware,(req, res, next) => {
  UserService.deleteAllUser((result) => {
    console.log(result);
    return res.json(result);
  })
 
});


module.exports = router;
