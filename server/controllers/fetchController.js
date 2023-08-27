const session = require('express-session');
const database = require("../config/database");

const root = (req, res) => {
    return res.send('Backend Connection (MySQL)');
};
const allUsers = (req, res) => {
    database.query("SELECT * FROM users", (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
};
const allProducts = (req, res) => {
    database.query("SELECT * FROM products", (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
};

module.exports = { root, allUsers, allProducts }