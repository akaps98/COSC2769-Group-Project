const mysql = require('mysql');

const database = mysql.createConnection({
    user: 'root',
    host: '127.0.0.1',
    password: 'password',
    database: 'TestingDB',
});

module.exports = database;