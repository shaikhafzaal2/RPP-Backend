var express = require('express');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const CompanyType = require('../models/CompanyType');
const Degree = require('../models/Degree');
var router = express.Router();

/**
* @swagger
* /filters:
*   get:
*     tags:
*       - Filters
*     description: Returns a list of Filters
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A filter list
*
*/
router.get('/', async function(req,res,next){

    try {
        // Fetch data from all three models
        const faculties = await Faculty.find({});
        const departments = await Department.find({});
        const companyTypes = await CompanyType.find({});
        const degrees = await Degree.find({});
    
        // Combine the data into a single object
        const data = {
          faculties,
          departments,
          companyTypes,
          degrees,
        };
    
        // Send the data as a JSON response
        res.json(data);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}),

  module.exports = router;