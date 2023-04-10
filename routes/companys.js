let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Company = require('../models/Company.js');
const { CompanyService } = require('../services/company/CompanyService.js');
const authMiddleware = require('../middleware/checkAuth.js');



/**
* @swagger
* /companys:
*   get:
*     tags:
*       - Companys
*     description: Return a single company
*     produces:
*       - application/json
*     parameters:
*       - in: query
*         name: name
*         schema:
*           type: string
*         description: Filter by company name (case-insensitive regex)
*       - in: query
*         name: type
*         schema:
*           type: string
*         description: Filter by company type (case-insensitive regex)
*       - in: query
*         name: jobLocation
*         schema:
*           type: string
*         description: Filter by job location (case-insensitive regex)
*       - in: query
*         name: faculty
*         schema:
*           type: string
*         description: Filter by faculty (case-insensitive regex)
*       - in: query
*         name: department
*         schema:
*           type: string
*         description: Filter by department (case-insensitive regex)
*       - in: query
*         name: role
*         schema:
*           type: string
*         description: Filter by role (case-insensitive regex)
*       - in: query
*         name: requiredQualifications
*         schema:
*           type: string
*         description: Filter by required qualifications (case-insensitive regex)
*       - in: query
*         name: minctc
*         schema:
*           type: number
*           minimum: 0
*         description: Filter by minimum CTC
*       - in: query
*         name: maxctc
*         schema:
*           type: number
*         description: Filter by maximum CTC
*     responses:
*       200:
*         description: A company list
*         schema:
*           $ref: '#/definitions/Company'
*
*/
router.get('/', (req,res,next)=> {
  CompanyService.allCompanies(req.query,(result)=>{
    console.log(result);
    //  if(err) return next(err);
     res.json(result);
  });
});

/**
* @swagger
* /companys/{id}:
*   get:
*     tags:
*       - Companys
*     description: Return a single company
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: CompanyId
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: A single company
*         schema:
*           $ref: '#/definitions/Company'
*
*/
router.get('/:id', (req,res,next) => {
  Company.findById(req.params.id, (err,company) => {
    if(err) return next(err);
    res.json(company);
  });
});

/**
 * @swagger
 * /companys:
 *   post:
 *     security:
 *       - Bearer: []  
 *     tags:
 *       - Companys
 *     description: Creates a new company
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: company
 *         description: Company object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Company'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Unauthorized access to api
 *       404:
 *         description: Not found or record not found
 */
router.post('/',authMiddleware, (req,res, next) => {
  //  Company.create(req.body, (err,company) => {
  //     if(err) return next(err);
  //     res.json(company);
  //  });
   var newCompany = new Company(req.body);

   newCompany.save((err,company) => {
      if(err) {
        res.send(err);
      } else {
        res.json({message:"Company saved successfully", company: company })
      }
   });
});

/**
* @swagger
*   /companys/{id}:
*     put:
*        security:
*         - Bearer: []  
*        tags:
*         - Companys
*        description: Update the company information
*        produces:
*         - application/json
*        parameters:
*         - name: id
*           description: "using for update the company information"
*           in: path
*           required: true
*           type: string
*         - name: company
*           description : "company information "
*           in: body
*           required : true
*           schema:
*             $ref: '#/definitions/Company'
*        responses:
*           200:
*               description: company update successfully
*           400:
*               description: Unauthorized access to api
*           404:
*               description: Not found or record not found
*/
router.put('/:id',authMiddleware, (req,res,next) => {
  Company.findByIdAndUpdate(req.params.id, req.body, (err,company) => {
    if(err) return next(err);
    res.json(company);
  });
});

/**
* @swagger
*   /companys/{id}:
*     delete:
*        security:
*         - Bearer: []   
*        tags:
*         - Companys
*        description: Deleted the company information
*        produces:
*         - application/json
*        parameters:
*         - name: id
*           description: "using for deleting the company information"
*           in: path
*           required: true
*           type: string
*         - name: company
*           description : "company information "
*           in: body
*           required : true
*           schema:
*             $ref: '#/definitions/Company'
*        responses:
*           200:
*               description: company delete successfully
*           400:
*               description: Unauthorized access to api
*           404:
*               description: Not found or record not found
*/
router.delete('/:id', authMiddleware,(req,res, next) => {
  Company.findByIdAndRemove(req.params.id, req.body, (err, company) => {
    if(err) return next(err);
    res.json(company);
  });
});

module.exports = router;
