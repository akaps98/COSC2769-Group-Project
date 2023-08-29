const database = require("../config/database");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleCustomerRegister = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;

    database.query('SELECT * FROM customers WHERE BINARY(email) = ?', email, (err, Eresult) => {
        if (err) {
            return res.send({ err: err });
        } 
        if (Eresult.length==0) {
            database.query('SELECT * FROM customers WHERE phone = ?', phone, (err, Presult) => {
                if (err) {
                    return res.send({ err: err });
                } 
                if (Presult.length==0) {
                    database.query('SELECT * FROM customers WHERE BINARY(username) = ?', username, (err, Nresult) => {
                        if (err) {
                            return res.send({ err: err });
                        } 
                        if (Nresult.length==0) {
                            bcrypt.hash(password,saltRounds, (err, hash) => {
                                if (err) {
                                    console.log(err)
                                }
                                database.query('INSERT INTO customers (username,email,phone,address,password) VALUES (?,?,?,?,?)', [username, email, phone, address, hash], (err, result) => {
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
                } else {
                    return res.send("Phone number already exists! Choose another one.")
                }
            });
        } else {
            return res.send("Email already exists! Choose another one.")
        }
    });
};

const handleSellerRegister = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const business = req.body.business;
    const password = req.body.password;

    database.query('SELECT * FROM sellers WHERE BINARY(email) = ?', email, (err, Eresult) => {
        if (err) {
            return res.send({ err: err });
        } 
        if (Eresult.length==0) {
            database.query('SELECT * FROM sellers WHERE phone = ?', phone, (err, Presult) => {
                if (err) {
                    return res.send({ err: err });
                } 
                if (Presult.length==0) {
                    database.query('SELECT * FROM sellers WHERE BINARY(username) = ?', username, (err, Nresult) => {
                        if (err) {
                            return res.send({ err: err });
                        } 
                        if (Nresult.length==0) {
                            bcrypt.hash(password,saltRounds, (err, hash) => {
                                if (err) {
                                    console.log(err)
                                }
                                database.query('INSERT INTO sellers (username,email,phone,business,password,status) VALUES (?,?,?,?,?,?)', [username, email, phone, business, hash, 'Pending'], (err, result) => {
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
                } else {
                    return res.send("Phone number already exists! Choose another one.")
                }
            });
        } else {
            return res.send("Email already exists! Choose another one.")
        }
    });
};

module.exports = { handleCustomerRegister, handleSellerRegister };