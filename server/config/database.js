const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'myrds.cc9rwqabneki.ap-southeast-1.rds.amazonaws.com',
    user: 'group14',
    password: 'group14password',
    database: 'fullstackdev14_db',
});

module.exports = database;