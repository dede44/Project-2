var express = require('express');
var router = express.Router();
var merchSales_dal = require('../model/merchSales_dal');
var team_dal = require('../model/team_dal');


// View All merchSales
router.get('/all', function(req, res) {
    merchSales_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('merchSales/merchSalesViewAll', { 'result':result });
        }
    });

});

// View the merchSales for the given id
router.get('/', function(req, res){
    if(req.query.order_number == null) {
        res.send('number_order is null');
    }
    else {
        merchSales_dal.getById(req.query.order_number, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('merchSales/merchSalesViewById', {'result': result});
            }
        });
    }
});

// Return the add a new resume form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    merchSales_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('merchSales/merchSalesAdd', {'merchSales': result});
        }
    });
});

// insert a resume record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.resume_name == null) {
        res.send('Resume Name must be provided.');
    }
    else if(req.query.account_id == null) {
        res.send('An Account must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        resume_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resume/all');
            }
        });
    }
});

// Delete a resume for the given resume_id
router.get('/delete', function(req, res){
    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume_dal.delete(req.query.resume_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resume/all');
            }
        });
    }
});


module.exports = router;
