let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const nodemailer = require('nodemailer');
let Company = require('../models/Company.js');
const { CompanyService } = require('../services/company/CompanyService.js');
const authMiddleware = require('../middleware/checkAuth.js');
const upload = require('../middleware/upload.js');
const User = require('../models/User.js');


// const transporter = nodemailer.createTransport({
//   service: 'outlook',
//   auth: {
//     user: '19etcs002118@msruas.ac.in',
//     pass: '', // Replace with your actual password
//   },
//   host: 'smtp.office365.com',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   tls: {
//     ciphers: 'SSLv3',
//   },
// });

// Configure your email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ruasplacements@gmail.com',
    pass: 'pcahslancybictiv', // Replace with your actual password
  },
});


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
*         name: search
*         schema:
*           type: string
*         description: search across all fields
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
router.post('/', authMiddleware, upload.none(), (req,res, next) => {

 try {
   console.log(req.body.payload);
    var newCompany = new Company(req.body.payload);
 
    newCompany.save((err,company) => {
       if(err) {
        console.log(err);
       } else {
         console.log({message:"Company saved successfully", company: company })
       
 
        // Fetch the list of emails from the User model
        // const users = User.find({}, 'email');
        User.find((err, users) => {
          if (err) console.log(err);       
          console.log(users);      
        
        console.log(users);
        const emails = users.map(user => user.email.toLowerCase());
        console.log("List of emails: "+ emails );
 
        const mailOptions = {
         from: 'ruasplacements@gmail.com',
         to: emails.join(','),
         subject: `${company.name} Placement Drive`,
         html: `
        <h1>New Upcoming Placement Drive at ${company.name}</h1>
        <p><strong>Name: </strong>${company.name}</p>
        <p><strong>Type: </strong>${company.type}</p>
        <p><strong>Job Location: </strong>${company.jobLocation}</p>
        <p><strong>Faculty: </strong>${company.faculty}</p>
        <p><strong>Department: </strong>${company.department}</p>
        <p><strong>Role: </strong>${company.role}</p>
        <p><strong>CTC: </strong>${company.ctc} LPA</p>
        <p><strong>Apply By : </strong>${company.date}</p>
        <p><strong>About Company:</strong></p>
        <p>${company.aboutCompany}</p>
        <p><strong>Job Description: </strong></p>
        <p>${company.jd}</p>
        <p><strong>Required Qualifications:</strong></p>
        <p> ${company.requiredQualifications}</p>
        <p><strong>Required CGPA:</strong> ${company.requiredcgpa}</p>
        <p><strong>Apply Link:</strong> https://shaikhafzaal2.github.io/RPP-Frontend/#/description/${company._id}</p>
      `,        
       };
 
       transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
           console.log('Error sending email:', error);
         } else {
           console.log('Email sent:', info.response);
         }
       });
      });
      res.json({message:"Company saved successfully and email sent", company: company })
    }
  });} catch (error) {
  console.log("This error occured: "+error)
  res.status(500).json({ error: 'An error occurred' });
 }
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
