var express = require('express');
var router = express.Router();

const Department = require('../models/Department');
// const CompanyTypeService = require('../services/department/CompanyTypeService');
const CompanyType = require('../models/CompanyType');
const CompanyTypeService = require('../services/companyType/CompanyTypeService');




/**
* @swagger
* /companyTypes:
*   get:
*     tags:
*       - CompanyTypes
*     description: Returns a list of companyTypes
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A companyTypes list
*         schema:
*           $ref: '#/definitions/CompanyType'
*
*/
router.get('/', function(req,res,next){
   CompanyType.find(function(err,products){
    
     if(err) return next(err);
     res.json(products);
  });
});


router.get('/:id', function(req,res,next){
  CompanyType.findById(req.params.id, function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /companyTypes:
 *   post:
 *     tags:
 *       - CompanyTypes
 *     description: Creates a new CompanyTypes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: companyTypes
 *         description: companyTypes object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CompanyType'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function(req,res,next){
  CompanyTypeService.saveCompanyType(req.body, (result) => {
    return res.json(result);
  })
});

/**
* @swagger
*   /companyTypes/{id}:
*     delete:
*        tags:
*         - CompanyTypes
*        description: Deleted the faculty information
*        produces:
*         - application/json
*        parameters:
*         - name: id
*           description: "using for deleting the company information"
*           in: path
*           required: true
*           type: string
*        responses:
*           200:
*               description: company delete successfully
*           400:
*               description: Unauthorized access to api
*           404:
*               description: Not found or record not found
*/
router.delete('/:id', (req,res, next) => {
  CompanyType.findByIdAndRemove(req.params.id, req.body, (err, company) => {
    if(err) return next(err);
    res.json(company);
  });
});

module.exports = router;
