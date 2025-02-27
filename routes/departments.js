var express = require('express');
var router = express.Router();

const Department = require('../models/Department');
const DepartmentService = require('../services/department/DepartmentService');



/**
* @swagger
* /departments:
*   get:
*     tags:
*       - Departments
*     description: Returns a list of department
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A department list
*         schema:
*           $ref: '#/definitions/Department'
*
*/
router.get('/', function(req,res,next){
   Department.find(function(err,products){
    console.log("products");
     if(err) return next(err);
     res.json(products);
  });
});


router.get('/:id', function(req,res,next){
  Department.findById(req.params.id, function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /departments:
 *   post:
 *     tags:
 *       - Departments
 *     description: Creates a new Department
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: department
 *         description: department object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Department'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function(req,res,next){
  DepartmentService.saveDepartment(req.body, (result) => {
    return res.json(result);
  })
});

/**
* @swagger
*   /departments/{id}:
*     delete:
*        tags:
*         - Departments
*        description: Deleted the faculty information
*        produces:
*         - application/json
*        parameters:
*         - name: id
*           description: "using for deleting the department information"
*           in: path
*           required: true
*           type: string
*        responses:
*           200:
*               description: department delete successfully
*           400:
*               description: Unauthorized access to api
*           404:
*               description: Not found or record not found
*/
router.delete('/:id', (req,res, next) => {
  Department.findByIdAndRemove(req.params.id, req.body, (err, company) => {
    if(err) return next(err);
    res.json(company);
  });
});

module.exports = router;
