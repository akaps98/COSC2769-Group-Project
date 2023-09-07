const session = require('express-session');
const database = require("../config/database");

const findOrder = (req, res) => {
    const CustomerID = req.body.CustomerID;

    database.query("SELECT * FROM orders WHERE CustomerID LIKE ?", [CustomerID], (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
}

const updateOrderStatus = (req, res) => {
    const OrderID = req.body.OrderID;
    const ProductID = parseInt(req.body.ProductID,10);
    const newStatus = req.body.newStatus;
    database.query('SELECT products FROM orders WHERE OrderID = ?', [OrderID], (err, results) => {
        if (err) {
          console.error('Error fetching products:', err);
          return res.send({ err: err });
        }
        const products = JSON.parse(results[0].products);
        const updatedProducts = products.map(product => {
            if (product[0].ProductID === ProductID) {
              return [product[0], newStatus];
            }
            return product;
        });
        database.query('UPDATE orders SET products = ? WHERE OrderID = ?', [JSON.stringify(updatedProducts), OrderID], (err, results) => {
            if (err) {
              console.error('Error updating productOrders:', err);
              return res.send({ err: err });
            }
            return res.send({ message: 'Product order status updated successfully' });
        });
    });
};

module.exports = { findOrder, updateOrderStatus };