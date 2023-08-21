const database = require("../config/database");
const bcrypt = require("bcrypt");

const handleLogIn = (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    database.query('SELECT * FROM users WHERE BINARY(username) = ?', username, (err, result) => {
        if (err) {
            return res.send({ err: err });
        } 
        if (result.length>0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    req.session.user = result;
                    return res.send(username+' ('+result[0].role+')');
                } else {
                    return res.send({ message: "Wrong password!"});
                }
            });
        } else {
            return res.send({ message: "User does not exist!"});
        }
    });
};

const handleLogOut = (req, res) => {
    res.clearCookie('username');
    req.session.destroy();
    return res.send("Logged out successfully!");
}

module.exports = { handleLogIn, handleLogOut };