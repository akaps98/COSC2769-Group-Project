const database = require("../config/database");
const bcrypt = require("bcrypt");

const handleLogIn = (req,res) => {
    const type = req.body.type;
    const emailPhone = req.body.emailPhone
    const password = req.body.password;

    if (type==="customer") {
        database.query('SELECT * FROM customers WHERE BINARY(email) = ? OR phone = ?', [emailPhone, emailPhone], (err, result) => {
            if (err) {
                return res.send({ err: err });
            } 
            if (result.length>0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        return res.send(result[0].username);
                    } else {
                        return res.send({ message: "Wrong password!"});
                    }
                });
            } else {
                return res.send({ message: "Email/Phone number is not registered!"});
            }
        });
    } else {
        database.query('SELECT * FROM sellers WHERE BINARY(email) = ? OR phone = ?', [emailPhone, emailPhone], (err, result) => {
            if (err) {
                return res.send({ err: err });
            } 
            if (result.length>0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        return res.send(result[0].username);
                    } else {
                        return res.send({ message: "Wrong password!"});
                    }
                });
            } else {
                return res.send({ message: "Email/Phone number is not registered!"});
            }
        });

    }
};

const handleLogOut = (req, res) => {
    res.clearCookie('username');
    req.session.destroy();
    return res.send("Logged out successfully!");
}

module.exports = { handleLogIn, handleLogOut };