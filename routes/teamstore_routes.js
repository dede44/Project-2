//copy code from school_routes.js and change where says school to supplier
//do the same
var express = require('express');
var router = express.Router();
var teamstore_dal = require('../model/teamstore_dal');


// View All stores
router.get('/all', function(req, res) {
    teamstore_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('teamstore/teamstoreViewAll', { 'result':result });
        }
    });

});

// View the store for the given id
router.get('/', function(req, res){
    if(req.query.teamstore_id == null) {
        res.send('teamstore_id is null');
    }
    else {
        teamstore_dal.getById(req.query.teamstore_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('teamstore/teamstoreViewById', {'result': result});
            }
        });
    }
});

// Return the add a new store form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    teamstore_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('teamstore/teamstoreAdd', {'teamstore': result});
        }
    });
});

// insert a team store record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.city == null) {
        res.send('City name must be provided.');
    }
    else if(req.query.distr_name == null) {
        res.send('A distributor name must be selected');
    }
    else if(req.query.team_name == null) {
        res.send('A team name must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        teamstore_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/teamstore/all');
            }
        });
    }
});

// Delete a team store for the given teamstore_id
router.get('/delete', function(req, res){
    if(req.query.teamstore_id == null) {
        res.send('teamstore_id is null');
    }
    else {
        teamstore_dal.delete(req.query.teamstore_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/teamstore/all');
            }
        });
    }
});

//Update a team for the given team_id
router.get('/edit2', function(req, res) {
    if (req.query.teamstore_id == null) {
        res.send('teamstore_id is null in update');
    }
    else {
        teamstore_dal.getById(req.query.teamstore_id, function (err, supplier) {

            res.render('teamstore/teamstoreUpdate', {supplier: supplier[0]});
        });
    }
});

router.get('/update', function(req, res) {
    teamstore_dal.update(req.query, function(err, result){
        res.redirect(302, '/teamstore/all');
    });
});

module.exports = router;



