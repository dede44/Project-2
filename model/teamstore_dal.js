var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM teamstore_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(supplier_id, callback) {
    var query = 'SELECT * FROM teamstore_view WHERE teamstore_id = ?';
    var queryData = [teamstore_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO teamstore (city, distr_id, team_id) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.city, params.supplier_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(supplier_id, callback) {
    var query = 'DELETE FROM teamstore WHERE teamstore_id = ?';
    var queryData = [teamstore_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE teamstore SET city = ?, distr_name = ?, team_id = ? WHERE teamstore_id = ?';
    var queryData = [params.city, params.distr_name, params.team_name, params.supplier_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};