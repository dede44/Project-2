var express = require('express');
var router = express.Router();
var merchSales_dal = require('../model/merchSales_dal');
//var team_dal = require('../model/team_dal');


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
        res.send('order_number is null');
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

// insert a merchSale record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.sale_date == null) {
        res.send('Sale date must be provided.');
    }
    else if(req.query.distr_name == null) {
        res.send('A distributor must be selected');
    }
    else if(req.query.customer_id == null) {
        res.send('A customer must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        merchSales_dal.insert(req.query, function(err,result) {
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

// Delete a merchSale for the given order_number
router.get('/delete', function(req, res){
    if(req.query.order_number == null) {
        res.send('order_number is null');
    }
    else {
        merchSales_dal.delete(req.query.order_number, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/merchSales/all');
            }
        });
    }
});


module.exports = router;
