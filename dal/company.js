var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM company;',
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

exports.GetByID = function(c_id, callback) {
    console.log(c_id);
    var query_data = [c_id];
    var query = 'SELECT * FROM company WHERE c_id=?';
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

exports.GetCompanyGPAView = function(callback) {
    connection.query('SELECT * FROM company_gpa;',
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

exports.Insert = function(company_info, callback) {
    console.log(company_info);
    var dynamic_query = 'INSERT INTO company (name, address) VALUES (' +
        '\'' + company_info.name + '\', ' +
        '\'' + company_info.address + '\' ' +
        ');';
    //console.log("test");
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
    var query = 'SELECT * FROM company WHERE name = ' + name;
    connection.query(query, function(err, result){
        callback(err, result);
    });
}

exports.Update = function(company_info, callback) {
    console.log(company_info);

    var query_data = [company_info.c_id, company_info.c_id];
    console.log(query_data);

    console.log(query);
    connection.query(query, query_data, function(err, result){
        callback(err, result);
    });
}

exports.GetAddress = function(name, callback){
    console.log(name);

    var query = 'SELECT address FROM company WHERE name = ' + name;

    connection.query(query, function(err, result){
        callback(err, result);
    })
}

exports.AddAddress = function(info, callback) {
    console.log(info);

    var query_data = [info.address, info.name];
    console.log(query_data);

    var query = 'UPDATE company SET address=? WHERE name=?';

    console.log(query);
    connection.query(query, query_data, function(err, result){
        callback(err, result);
    });
}

exports.DeleteCompany = function(info, callback) {
    console.log(info);

    var query_data = [info.c_id];
    console.log(query_data);

    var query = 'DELETE from company WHERE c_id=?';

    console.log(query);

    connection.query(query, query_data, function (err, result) {
        callback(err, result);
    });
}