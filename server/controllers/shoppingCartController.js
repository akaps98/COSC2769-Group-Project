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
            console.log(err)
            return res.send(err);
        } else {
            console.log(result)
            return res.send(result);
        }
    })
}

const removeShoppingCart = (req, res) => {
    const productID = req.body.productID;
    const customerID = req.body.customerID;
    database.query(`UPDATE shoppingcarts SET product = JSON_REMOVE(product, '$."${productID}"') WHERE CustomerID LIKE ?`, [customerID], (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err);
        } else {
            console.log(result)
            return res.send(result);
        }
    })
}

module.exports = { findShoppingCart, updateShoppingCart, removeShoppingCart };