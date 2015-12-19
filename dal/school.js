var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM schools;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.GetByID = function(name, callback) {
    console.log(name);
    var query_data = [name];
    var query = 'SELECT * FROM schools WHERE name=?';
    console.log(query);
    connection.query(query, query_data,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(school_info, callback) {
    console.log(school_info);
    var dynamic_query = 'INSERT INTO schools (name, address) VALUES (' +
        '\'' + school_info.name + '\', ' +
        '\'' + school_info.address + '\' ' +
        ');';
    console.log(dynamic_query);
    connection.query(dynamic_query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.GetName = function(name, callback){
    console.log(name);
    var query = 'SELECT * FROM schools WHERE name = ' + name;
    connection.query(query, function(err, result){
        callback(err, result);
    });
}

exports.Update = function(school_info, callback) {
    console.log(school_info);

    var query_data = [school_info.name, school_info.name];
    console.log(query_data);

    console.log(query);
    connection.query(query, query_data, function(err, result){
        callback(err, result);
    });
}



exports.GetAddress = function(school_name, callback){
    console.log(school_name);

    var query = 'SELECT address FROM school WHERE name = ' + school_name;

    connection.query(query, function(err, result){
        callback(err, result);
    })
}

exports.AddAddress = function(info, callback) {
    console.log(info);

    var query_data = [info.address, info.name];
    console.log(query_data);
    //console.log("AddAdress");

    //var query = 'INSERT INTO account (account_id, address) VALUES (?, ?)';
    var query = 'UPDATE school SET address=? WHERE name=?';

    console.log(query);
    connection.query(query, query_data, function(err, result){
        callback(err, result);
    });
}

exports.DeleteSchool = function(info, callback) {
    console.log(info);

    var query_data = [info.name];
    console.log(query_data);

    var query = 'DELETE from school WHERE name=?';

    console.log(query);

    connection.query(query, query_data, function (err, result) {
        callback(err, result);
    });
}


