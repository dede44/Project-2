//copy code from school_routes.js and change where says school to distributor
//do the same

var express = require('express');
var router = express.Router();
var distr_dal = require('../model/distr_dal');


// View All distributors
router.get('/all', function(req, res) {
    distr_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('distr/distrViewAll', { 'result':result });
        }
    });

});

// View the distr for the given id
router.get('/', function(req, res){
    if(req.query.distr_id == null) {
        res.send('distr_id is null');
    }
    else {
        distr_dal.getById(req.query.distr_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('distr/distrViewById', {'result': result});
            }
        });
    }
});

// Return the add a new distr form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    distr_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('distr/distrAdd', {'distr': result});
        }
    });
});

// insert a distr record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.distr_name == null) {
        res.send('Distributor name must be provided.');
    }
     else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        distr_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/distr/all');
            }
        });
    }
});

// Delete a distr for the given distributor_id
router.get('/delete', function(req, res){
    if(req.query.distr_id == null) {
        res.send('distr_id is null');
    }
    else {
        distr_dal.delete(req.query.distr_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/distr/all');
            }
        });
    }
});

//Update a distributor for the given distributor_id
router.get('/edit2', function(req, res) {
    if (req.query.distr_id == null) {
        res.send('distr_id is null in update');
    }
    else {
        distr_dal.getById(req.query.distr_id, function (err, distr) {

            res.render('distr/distrUpdate', {distr: distr[0]});
        });
    }
});

router.get('/update', function(req, res) {
    distr_dal.update(req.query, function(err, result){
        res.redirect(302, '/distr/all');
    });
});

module.exports = router;
