//copy code from school_routes.js and change where says school to supplier
//do the same
var express = require('express');
var router = express.Router();
var supplier_dal = require('../model/supplier_dal');


// View All companies
router.get('/all', function(req, res) {
    supplier_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('supplier/supplierViewAll', { 'result':result });
        }
    });

});

// View the supplier for the given id
router.get('/', function(req, res){
    if(req.query.supplier_id == null) {
        res.send('supplier_id is null');
    }
    else {
        supplier_dal.getById(req.query.supplier_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('supplier/supplierViewById', {'result': result});
            }
        });
    }
});

// Return the add a new supplier form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    supplier_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('supplier/supplierAdd', {'supplier': result});
        }
    });
});

// insert a supplier record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.city == null) {
        res.send('City name must be provided.');
    }
    else if(req.query.supplier_name == null) {
        res.send('A name must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        supplier_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/supplier/all');
            }
        });
    }
});

// Delete a supplier for the given supplier_id
router.get('/delete', function(req, res){
    if(req.query.supplier_id == null) {
        res.send('supplier_id is null');
    }
    else {
        supplier_dal.delete(req.query.supplier_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/supplier/all');
            }
        });
    }
});

//Update a team for the given team_id
router.get('/edit2', function(req, res) {
    if (req.query.supplier_id == null) {
        res.send('supplier_id is null in update');
    }
    else {
        supplier_dal.getById(req.query.supplier_id, function (err, supplier) {

            res.render('supplier/supplierUpdate', {supplier: supplier[0]});
        });
    }
});

router.get('/update', function(req, res) {
    supplier_dal.update(req.query, function(err, result){
        res.redirect(302, '/supplier/all');
    });
});


module.exports = router;



