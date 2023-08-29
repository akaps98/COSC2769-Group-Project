const database = require("../config/database");

const browseByTitle = (req, res) => {
    const value = req.body.value;

    const valueCondition = ("%" + value + "%");

    database.query("SELECT * FROM products WHERE name LIKE ? OR description LIKE ?", [valueCondition, valueCondition], (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const browseByCategory = (req, res) => {
    const category = req.body.category;

    database.query("SELECT * FROM products WHERE JSON_UNQUOTE(JSON_EXTRACT(category, '$[0]')) LIKE ?", category, (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

module.exports = { browseByTitle, browseByCategory };