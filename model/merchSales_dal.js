var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM merchSales_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(order_number, callback) {
    var query = 'SELECT * FROM merchSales_view WHERE order_number = ?';
    var queryData = [order_number];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO merchSales (sale_date, distr_name, customer_id) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.sale_date, params.distr_name, params.customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(resume_id, callback) {
    var query = 'DELETE FROM merchSales WHERE order_number = ?';
    var queryData = [order_number];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};