let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Company = require('../models/Company.js');



/**
* @swagger
* /companys:
*   get:
*     tags:
*       - Companys
*     description: Return a single company
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A company list
*         schema:
*           $ref: '#/definitions/Company'
*
*/
router.get('/', (req,res,next)=> {
  Company.find((err,companys) => {
     if(err) return next(err);
     res.json(companys);
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
router.post('/', (req,res, next) => {
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
router.put('/:id', (req,res,next) => {
  Company.findByIdAndUpdate(req.params.id, req.body, (err,company) => {
    if(err) return next(err);
    res.json(company);
  });
});

/**
* @swagger
*   /companys/{id}:
*     delete:
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
router.delete('/:id',(req,res, next) => {
  Company.findByIdAndRemove(req.params.id, req.body, (err, company) => {
    if(err) return next(err);
    res.json(company);
  });
});

module.exports = router;
