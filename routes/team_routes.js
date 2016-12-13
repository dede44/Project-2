//copy code from school_routes.js and change where says school to team
//do the same

var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');


// View All teams
router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('team/teamViewAll', { 'result':result });
        }
    });

});

// View the team for the given id
router.get('/', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.getById(req.query.team_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('team/teamViewById', {'result': result});
            }
        });
    }
});

// Return the add a new team form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    team_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('team/teamAdd', {'team': result});
        }
    });
});

// insert a team record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team_name == null) {
        res.send('Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        team_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});

// Delete a team for the given team name
router.get('/delete', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.delete(req.query.team_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});

//Update a team for the given team_id
router.get('/edit2', function(req, res) {
    if (req.query.team_id == null) {
        res.send('team_id is null in update');
    }
    else {
        team_dal.getById(req.query.team_id, function (err, team) {

            res.render('team/teamUpdate', {team: team[0]});
        });
    }
});

router.get('/update', function(req, res) {
    team_dal.update(req.query, function(err, result){
        res.redirect(302, '/team/all');
    });
});

module.exports = router;
