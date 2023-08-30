const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'myrds.cc9rwqabneki.ap-southeast-1.rds.amazonaws.com',
    user: 'tony',
    password: 'tonypassword', // change password to yours
    database: 'fullstackdev14_db',
});

module.exports = database;