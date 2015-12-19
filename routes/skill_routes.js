var express = require('express');
var router = express.Router();
var skillDal   = require('../dal/skill');

router.get('/create', function(req, res, next) {
    res.render('skillFormCreate', { subtitle: 'Lab 10' });
});

router.get('/save', function(req, res, next) {
    console.log("skill_name equals: " + req.query.skill_name);
    console.log("the description submitted was: " + req.query.description);
    console.log("the company submitted was: " + req.query.company);
    skillDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/all', function(req, res) {
    skillDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('AllSkillsdisplay.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    skillDal.GetByID(req.query.skill_id,
        function (err, result) {
            if (err) throw err;
            skillDal.GetSkill(req.query.skill_id, function(err, skillResults){
                res.render('SkillInfodisplay.ejs', {
                    rs: result,
                    skill_name: req.query.skill_name,
                    skill_id: req.query.skill_id,
                    company: req.query.company,
                    skillResults: skillResults}
                );
            })
        }
    );
});

router.get('/update', function(req, res){
    console.log(req.query.name);
    skillDal.GetAll(function(err, skillResults){
        console.log(skillResults);
        res.render('skill/skillForm', {
            skillResults: skillResults,
            skill_id: req.query.skill_id,
            company: req.query.company,
            skill_info: req.query
        });
    })
});

router.get('/saveUpdate', function(req, res){
    console.log(req.query);
    skillDal.Update(req.query, function(err, result){
        if(err) {
            res.send('Error saving skill: ' + err);
        }
        else {
            res.send('Successfully associated skill with the databse.');
        }
    });
});

router.get('/delete', function(req, res, next) {
    res.render('skill/delete_skill', { subtitle: 'Lab 10' });
});

router.get('/delete_skill', function(req, res){
    console.log(req.query.skill_id);
    skillDal.DeleteSkill(req.query, function(err, result){
        if(err) {
            res.send('Error deleting skill: ' + err);
        }
        else {
            res.send('Successfully deleted skill.');
        }
    });
});

module.exports = router;