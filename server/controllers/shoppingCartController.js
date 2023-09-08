const session = require('express-session');
const database = require("../config/database");

const findShoppingCart = (req, res) => {
    const id = req.body.id;

    database.query("SELECT * FROM shoppingcarts WHERE CustomerID = ?", [id], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
}

const updateShoppingCart = (req, res) => {
    const quantity = req.body.quantity;
    const productID = req.body.productID;
    const customerID = req.body.customerID;
    
    database.query(`UPDATE shoppingcarts SET product = JSON_SET(product, '$."${productID}"', ?) WHERE CustomerID LIKE ?`, [quantity, customerID], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
}

const removeShoppingCart = (req, res) => {
    const productID = req.body.productID;
    const customerID = req.body.customerID;
    database.query(`UPDATE shoppingcarts SET product = JSON_REMOVE(product, '$."${productID}"') WHERE CustomerID LIKE ?`, [customerID], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
}

const insertToOrder = (req, res) => {
    const CustomerID = req.body.CustomerID;
    const products = req.body.products;
    const price = req.body.price;
    const date = req.body.date;

    database.query("INSERT INTO orders (CustomerID, products, price, date) VALUES (?, ?, ?, ?)", [CustomerID, products, price, date], (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            console.log(result);
            return res.send(result);
        }
    })
}

const findQuantity = (req, res) => {
    const productID = req.body.productID
    const CustomerID = req.body.CustomerID;

    database.query(`SELECT JSON_EXTRACT(product, '$."${productID}"') FROM shoppingcarts WHERE CustomerID LIKE ?`, [CustomerID], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
}

const deleteShoppingCart = (req, res) => {
    const CustomerID = req.body.CustomerID;

    database.query("DELETE from shoppingcarts WHERE CustomerID LIKE ?", [CustomerID], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
}

module.exports = { findShoppingCart, updateShoppingCart, removeShoppingCart, insertToOrder, findQuantity, deleteShoppingCart };