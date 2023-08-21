const database = require("../config/database");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleRegister = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const email = req.body.email;
    const phone = req.body.phone;
    const address_business = req.body.address_business
    
    database.query('SELECT * FROM users WHERE BINARY(username) = ?', username, (err, result) => {
        if (err) {
            return res.send({ err: err });
        } 
        if (result.length==0) {
            bcrypt.hash(password,saltRounds, (err, hash) => {
                if (err) {
                    console.log(err)
                }
                database.query('INSERT INTO users (username,password,role,email,phone,address_business) VALUES (?,?,?,?,?,?)', [username, hash, role, email, phone, address_business], (err, result) => {
                    if (err) {
                        return res.send({ err: err });
                    } else {
                        return res.send({ message: 'New data inserted successfully!' });
                    }
                });
            });
        } else {
            return res.send("Username already exists! Choose another one.")
        }
    });
};

module.exports = { handleRegister };