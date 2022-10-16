process.env.NODE_ENV ='test';

let mongoose = require("mongoose");
let Company = require("../models/Company");


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);


describe('Companys', () => {

  describe('/GET companys', () => {

     it('it should GET all the companys', (done) => {
       chai.request(server)
          .get('/companys')
          .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(4);
            done();
          });
     });
  });

  describe('/POST company', ()=> {
    it('it should not POST company without pages field', (done) => {
       let company = {
         title: "My text company 1",
         author: "Tariqul islam",
         year: 1990
       };

       chai.request(server)
          .post("/companys")
          .send(company)
          .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('pages');
            res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });


    });
  });
});
