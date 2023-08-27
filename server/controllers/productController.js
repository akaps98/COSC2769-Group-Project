const database = require("../config/database");

const browseByTitle = (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    database.query("SELECT * FROM products WHERE name LIKE ?", name, (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const browseByCategory = (req, res) => {
    const sub = req.body.sub;

    database.query("SELECT JSON_SEARCH(sub, ?) FROM products", sub, (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

module.exports = { browseByTitle };