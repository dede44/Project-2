
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM teams;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(team_id, callback) {
    var query = 'SELECT * FROM player_view WHERE team_id = ?';
    var queryData = [team_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO teams (team_name) VALUES (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.team_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(team_id, callback) {
    var query = 'DELETE FROM teams WHERE team_id = ?';
    var queryData = [team_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE teams SET team_name = ? WHERE team_id = ?';
    var queryData = [params.team_name, params.team_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

