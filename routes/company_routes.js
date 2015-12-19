var express = require('express');
var router = express.Router();
var companyDal   = require('../dal/company');

router.get('/all', function(req, res) {
  companyDal.GetAll(function (err, result) {
          if (err) throw err;
          res.render('AllCompanysdisplay.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
  companyDal.GetByID(req.query.company_id, function (err, result) {
          if (err) throw err;
          res.render('CompanyInfodisplay.ejs', {rs: result, company_id: req.query.company_id});
        }
    );
});

router.get('/CompanyGPAView', function (req, res) {
    companyDal.GetCompanyGPAView(function (err, result) {
            if (err) throw err;
            res.render('CompanyGPAViewdisplay.ejs', {rs: result} );
        }
    );
});

router.get('/create', function(req, res, next) {
    //res.send('Hello, World!');
    res.render('companyFormCreate', { subtitle: 'Lab 9' });
});

router.get('/save', function(req, res, next) {
    console.log("name equals: " + req.query.name);
    console.log("the address submitted was: " + req.query.address);
    companyDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/update', function(req, res){
    console.log(req.query.name);
    companyDal.GetAll(function(err, addressResults){
        console.log(addressResults);
        res.render('company/companyFormUpdate', {
            addressResults: addressResults,
            company_info: req.query
        });
    })
});

router.get('/saveUpdate', function(req, res){
    console.log(req.query);
    companyDal.AddAddress(req.query, function(err, result){
        if(err) {
            res.send('Error saving address to company: ' + err);
        }
        else {
            res.send('Successfully associated address with the company.');
        }
    });
});

router.get('/delete', function(req, res, next) {
    res.render('company/delete_company', { subtitle: 'Lab 10' });
});

router.get('/delete_company', function(req, res){
    console.log(req.query._name);
    companyDal.DeleteCompany(req.query, function(err, result){
        if(err) {
            res.send('Error deleting company: ' + err);
        }
        else {
            res.send('Successfully deleted company.');
        }
    });
});

module.exports = router;
