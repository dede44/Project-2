var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM distributor;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(distr_id, callback) {
    var query = 'SELECT * FROM distributor WHERE distr_id = ?';
    var queryData = [distr_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO distributor (distr_name) VALUES (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.distr_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(distr_id, callback) {
    var query = 'DELETE FROM distributor WHERE distr_id = ?';
    var queryData = [distr_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE distributor set distr_name =? where distr_id = ?';
    var queryData = [params.distr_name, params.distr_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE distributor SET distr_name = ? WHERE distr_id = ?';
    var queryData = [params.distr_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};