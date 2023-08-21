const session = require('express-session');
const database = require("../config/database");

const checkAuth = (req, res) => {
    if (req.session.user) {
        return res.send({loggedIn: true, user: req.session.user});
    } else {
        return res.send({loggedIn: false });
    }
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

module.exports = { checkAuth, allUsers };