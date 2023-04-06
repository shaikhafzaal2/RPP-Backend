var express = require('express');
var router = express.Router();
let ProductService = require('../services/faculty/FacultyService');
const Faculty = require('../models/Faculty');
const FacultyService = require('../services/faculty/FacultyService');

/**
* @swagger
* /faculties:
*   get:
*     tags:
*       - Faculties
*     description: Returns a list of faculty
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A faculty list
*         schema:
*           $ref: '#/definitions/Faculty'
*
*/
router.get('/', function(req,res,next){
  Faculty.find(function(err,products){
    console.log("products");
     if(err) return next(err);
     res.json(products);
  });
});


router.get('/:id', function(req,res,next){
  Faculty.findById(req.params.id, function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /faculties:
 *   post:
 *     tags:
 *       - Faculties
 *     description: Creates a new Faculty
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: faculty
 *         description: faculty object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Faculty'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function(req,res,next){
  FacultyService.saveFaculty(req.body, (result) => {
    return res.json(result);
  })
});

module.exports = router;
