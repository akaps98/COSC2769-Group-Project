const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'myrds.cc9rwqabneki.ap-southeast-1.rds.amazonaws.com',
    user: 'seongjoon',
    password: 'seongjoonpassword',
    database: 'fullstackdev14_db',
});

module.exports = database;