var express = require('express');
var router = express.Router();


// const CompanyTypeService = require('../services/department/CompanyTypeService');

const CompanyTypeService = require('../services/companyType/CompanyTypeService');
const Degree = require('../models/Degree');
const DegreeService = require('../services/degree/DegreeService');





/**
* @swagger
* /degree:
*   get:
*     tags:
*       - Degree
*     description: Returns a list of degree
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A degree list
*         schema:
*           $ref: '#/definitions/Degree'
*
*/
router.get('/', function(req,res,next){
   Degree.find(function(err,products){
    
     if(err) return next(err);
     res.json(products);
  });
});


router.get('/:id', function(req,res,next){
  Degree.findById(req.params.id, function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /degree:
 *   post:
 *     tags:
 *       - Degree
 *     description: Creates a new Degree
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: degree
 *         description: degree object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Degree'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function(req,res,next){
  DegreeService.saveDegree(req.body, (result) => {
    return res.json(result);
  })
});

/**
* @swagger
*   /degree/{id}:
*     delete:
*        tags:
*         - Degree
*        description: Deleted the Degree information
*        produces:
*         - application/json
*        parameters:
*         - name: id
*           description: "using for deleting the degree information"
*           in: path
*           required: true
*           type: string
*        responses:
*           200:
*               description: degree delete successfully
*           400:
*               description: Unauthorized access to api
*           404:
*               description: Not found or record not found
*/
router.delete('/:id', (req,res, next) => {
  Degree.findByIdAndRemove(req.params.id, req.body, (err, company) => {
    if(err) return next(err);
    res.json(company);
  });
});

module.exports = router;
