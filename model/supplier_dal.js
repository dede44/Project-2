var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM supplier;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(supplier_id, callback) {
    var query = 'SELECT * FROM supplier WHERE supplier_id = ?';
    var queryData = [supplier_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO supplier (city, supplier_name) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.city, params.supplier_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(supplier_id, callback) {
    var query = 'DELETE FROM supplier WHERE supplier_id = ?';
    var queryData = [supplier_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE supplier SET city = ?, supplier_name = ? WHERE supplier_id = ?';
    var queryData = [params.city, params.supplier_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};