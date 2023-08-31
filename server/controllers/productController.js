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

    const test = database.query("SELECT * FROM products WHERE JSON_UNQUOTE(JSON_EXTRACT(category, '$[0]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[1]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[2]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[3]')) LIKE ?", [category, category, category, category]);
    console.log(test);

    database.query("SELECT * FROM products WHERE JSON_UNQUOTE(JSON_EXTRACT(category, '$[0]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[1]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[2]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[3]')) LIKE ?", [category, category, category, category], (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

module.exports = { browseByTitle, browseByCategory };