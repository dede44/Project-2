var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM customers;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(customer_id, callback) {
    var query = 'SELECT * FROM customers WHERE customer_id = ?';
    var queryData = [customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO customers (phone_number, first_name) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.phone_number, params.first_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(customer_id, callback) {
    var query = 'DELETE FROM customers WHERE customer_id = ?';
    var queryData = [customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE customers SET phone_number = ?, first_name = ? WHERE customer_id = ?';
    var queryData = [params.phone_number, params.first_name, params.customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};