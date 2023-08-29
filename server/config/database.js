const mysql = require('mysql');

{/* 
< MySQL DB Connection should be already set up in your MySQL Workbench >

< User info >
    Christina = { user: 'chris', password: 'chrispassword' }
    Seongjoon = { user: 'seongjoon', password: 'seongjoonpassword' }
    Tony = { user: 'tony', password: 'tonypassword' }
    Duy = { user: 'duy', password: 'duypassword' }

< Set Backend Connection >
    1. Edit user and password of mysql.createConnection according to the < User info > above:

After all the steps, for testng, ‘npm start’ in the client folder and ‘npm run dev’ in the server folder
*/}

const database = mysql.createConnection({
    host: 'myrds.cc9rwqabneki.ap-southeast-1.rds.amazonaws.com',
    user: 'chris', //change user to yours
    password: 'chrispassword', // change password to yours
    database: 'fullstackdev14_db',
});

module.exports = database;