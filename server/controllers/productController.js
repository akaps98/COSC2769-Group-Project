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

    database.query("SELECT * FROM products WHERE JSON_UNQUOTE(JSON_EXTRACT(category, '$[0]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[1]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[2]')) LIKE ? || JSON_UNQUOTE(JSON_EXTRACT(category, '$[3]')) LIKE ?", [category, category, category, category], (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const filterByAlpabeticalOrder = (req, res) => {
    database.query("SELECT * FROM products ORDER BY name ASC", (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const filterByReversedAlpabeticalOrder = (req, res) => {
    database.query("SELECT * FROM products ORDER BY name DESC", (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const filterByLatestDateAdded = (req, res) => {
    database.query("SELECT * FROM products ORDER BY dateAdded ASC", (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const filterByOldestDateAdded = (req, res) => {
    database.query("SELECT * FROM products ORDER BY dateAdded DESC", (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const filterByHighPrice = (req, res) => {
    database.query("SELECT * FROM products ORDER BY price DESC", (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const filterByLowPrice = (req, res) => {
    database.query("SELECT * FROM products ORDER BY price ASC", (err,result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}

const filterPrice = (req, res) => {
    const belowPrice = req.body.belowPrice;
    const upperPrice = req.body.upperPrice;

    database.query("SELECT * FROM products WHERE price BETWEEN ? AND ?", [parseInt(belowPrice), parseInt(upperPrice)], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
}

const findProduct = (req, res) => {
    const productID = req.body.productID;

    database.query("SELECT * FROM products WHERE ProductID LIKE ?", [productID], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
}

module.exports = { browseByTitle, browseByCategory, filterByAlpabeticalOrder, filterByReversedAlpabeticalOrder, filterByLatestDateAdded, filterByOldestDateAdded, filterByHighPrice, filterByLowPrice, filterPrice, findProduct };