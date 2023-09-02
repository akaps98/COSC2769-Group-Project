const session = require('express-session');
const database = require("../config/database");

const root = (req, res) => {
    return res.send('Backend Connection (MySQL)');
};
const allCustomers = (req, res) => {
    database.query("SELECT * FROM customers", (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
};
const allSellers = (req, res) => {
    database.query("SELECT * FROM sellers", (err, result) => {
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
const allOrders = (req, res) => {
    database.query("SELECT * FROM orders", (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
};
const allCategories = (req, res) => {
    database.query("SELECT * FROM categories", (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}
const allShoppingCarts = (req, res) => {
    database.query("SELECT * FROM shoppingcart", (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
}
module.exports = { root, allCustomers, allSellers, allProducts, allOrders, allCategories, allShoppingCarts }