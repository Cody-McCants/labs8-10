var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM skills;',
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

exports.GetByID = function(skill_id, callback) {
    console.log(skill_id);
    var query_data = [skill_id];
    var query = 'SELECT * FROM skills WHERE skill_id=?';
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

exports.Insert = function(skill_info, callback) {
    console.log(skill_info);
    var dynamic_query = 'INSERT INTO skills (skill_name, description, company) VALUES (' +
        '\'' + skill_info.skill_name + '\', ' +
        '\'' + skill_info.description + '\', ' +
        '\'' + skill_info.company + '\' ' +
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

exports.GetName = function(skill_name, callback){
    console.log(skill_name);
    var query = 'SELECT * FROM skills WHERE skill_name = ' + skill_name;
    connection.query(query, function(err, result){
        callback(err, result);
    });
}

exports.Update = function(skill_info, callback) {
    console.log(skill_info);

    var query_data = [skill_info.description, skill_info.skill_name];
    console.log(query_data);

    var query = 'UPDATE skills SET description=? WHERE skill_name=?';

    console.log(query);
    connection.query(query, query_data, function(err, result){
        callback(err, result);
    });
}



exports.GetSkill = function(skill_id, callback){
    console.log(skill_id);

    var query = 'SELECT skill_name FROM skills WHERE skill_id = ' + skill_id;

    connection.query(query, function(err, result){
        callback(err, result);
    })
}

exports.AddSkill = function(info, callback) {
    console.log(info);

    var query_data = [info.description, info.skill_name];
    console.log(query_data);

    var query = 'UPDATE skills SET description=? WHERE skill_name=?';

    console.log(query);
    connection.query(query, query_data, function(err, result){
        callback(err, result);
    });
}

exports.DeleteSkill = function(info, callback) {
    console.log(info);

    var query_data = [info.skill_id];
    console.log(query_data);

    var query = 'DELETE from skills WHERE skill_id=?';

    console.log(query);

    connection.query(query, query_data, function (err, result) {
        callback(err, result);
    });
}