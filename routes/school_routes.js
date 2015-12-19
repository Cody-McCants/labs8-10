var express = require('express');
var router = express.Router();
var schoolDal   = require('../dal/school');

router.get('/all', function(req, res) {
  schoolDal.GetAll(function (err, result) {
          if (err) throw err;
          res.render('AllSchoolsdisplay.ejs', {rs: result});
        }
    );
});

//router.get('/', function (req, res) {
//  schoolDal.GetByID(req.query.school_name,
//      function (err, result) {
//          if (err) throw err;
//          schoolDal.GetName(req.query.school_name, function(err, nameResults){
//            res.render('SchoolInfodisplay.ejs', {
//                rs: result,
//                school_name: req.query.school_name,
//                nameResults: nameResults
//            })
//          })
//      });
//});

router.get('/', function (req, res) {
    schoolDal.GetByID(req.query.name,
        function (err, result) {
            if (err) throw err;
            schoolDal.GetAddress(req.query.name, function(err, addressResults){
                res.render('SchoolInfodisplay.ejs', {
                    rs: result,
                    school_name: req.query.name,
                    addressResults: addressResults}
                );
            })
        }
    );
});

router.get('/create', function(req, res, next) {
    res.render('schoolFormCreate', { subtitle: 'Lab 9' });
});

router.get('/save', function(req, res, next) {
    console.log("school_name equals: " + req.query.name);
    console.log("the address submitted was: " + req.query.address);
    schoolDal.Insert(req.query, function(err, result){
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
    schoolDal.GetAll(function(err, addressResults){
        console.log(addressResults);
        res.render('school/schoolForm', {
            addressResults: addressResults,
            school_info: req.query
        });
    })
});

router.get('/saveUpdate', function(req, res){
    console.log(req.query);
    schoolDal.AddAddress(req.query, function(err, result){
        if(err) {
            res.send('Error saving address to school: ' + err);
        }
        else {
            res.send('Successfully associated address with the school.');
        }
    });
});

router.get('/delete', function(req, res, next) {
    res.render('school/delete_school', { subtitle: 'Lab 10' });
});

router.get('/delete_school', function(req, res){
    console.log(req.query.school_name);
    schoolDal.DeleteSchool(req.query, function(err, result){
        if(err) {
            res.send('Error deleting school: ' + err);
        }
        else {
            res.send('Successfully deleted school.');
        }
    });
});

module.exports = router;