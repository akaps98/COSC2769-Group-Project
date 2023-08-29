const session = require('express-session');
const database = require("../config/database");

const allProducts = (req, res) => {
    const SellerID = req.body.SellerID;
    database.query("SELECT * FROM products WHERE SellerID = ?", SellerID, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
};

const updateProduct = (req, res) => {
    const id = req.body.ProductID
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const category = req.body.category;
    database.query('UPDATE products SET name = ?, price = ?, description = ?, quantity = ?, category = ? WHERE ProductID = ?', [name,price,description,quantity,category,id], (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            return res.send({ message: 'Product updated successfully!' });
        }
    });
};

const deleteProduct = (req, res) => {
    const id = req.body.id
    database.query('DELETE FROM products WHERE ProductID = ?', id, (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            return res.send({ message: 'Product deleted successfully!' });
        }
    });
};

const addProduct = (req, res) => {
    const product = req.body;
    database.query('INSERT INTO products (name,price,description,imagePath,category,quantity,dateAdded,SellerID) VALUES (?,?,?,?,?,?,?,?)', [product.name,product.price,product.description,product.imagePath,JSON.stringify(product.category),product.quantity,product.dateAdded,product.SellerID], (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            return res.send({ message: 'New data inserted successfully!' });
        }
    });
}

const allOrders = (req,res) => {
    const SellerID = req.body.SellerID;
    database.query('SELECT ProductID FROM products WHERE SellerID = ?', [SellerID], (err, productIDs)=>{
        if (err) {
            return res.send({ err: err });
        }
        const productIDsArray = productIDs.map((row)=>row.ProductID);
        database.query(`
            SELECT 
            o.OrderID, 
            o.CustomerID,
            c.username,
            c.email,
            c.phone,
            c.address,
            JSON_UNQUOTE(JSON_EXTRACT(op.product, '$[0].ProductID')) AS ProductID, 
            p.name,
            p.price,
            p.imagePath,
            JSON_UNQUOTE(JSON_EXTRACT(op.product, '$[0].quantity')) AS quantity, 
            JSON_UNQUOTE(JSON_EXTRACT(op.product, '$[1]')) AS status, 
            o.date 
            FROM TestingDB.orders o 
            JOIN JSON_TABLE(o.products, '$[*]' COLUMNS ( product JSON PATH '$' )) AS op 
            JOIN products p ON JSON_UNQUOTE(JSON_EXTRACT(op.product, '$[0].ProductID')) = p.ProductID
            JOIN customers c ON o.CustomerID = c.CustomerID
            WHERE JSON_UNQUOTE(JSON_EXTRACT(op.product, '$[0].ProductID')) IN (?)
        `, [productIDsArray], (err, orders) => {
            if (err) {
                return res.send({ err: err });
            } else {
                return res.send(orders);
            }
        });
    })
};

const updateOrderStatus = (req, res) => {
    const OrderID = req.body.orderId;
    const ProductID = req.body.productId;
    const newStatus = req.body.newStatus;
    db.query('SELECT products FROM orders WHERE OrderID = ?', [OrderID], (err, rows) => {
        if (err) {
            return res.send({ err: err });
        } else {
            const productsJson = JSON.parse(rows[0].products);
            for (const product of productsJson) {
                if (product[0].ProductID === ProductID) {
                    product[1] = newStatus;
                    break;
                }
            }
            const newProductsString = JSON.stringify(productsJson);
            db.query('UPDATE orders SET products = ? WHERE OrderID = ?', [newProductsString, OrderID], (err, result) => {
                if (err) {
                return res.send({ err: err });
                } else {
                return res.send({ message: 'Status updated successfully' });
                }
            });
        }
    });
  };


module.exports = { allProducts, updateProduct, deleteProduct, addProduct, allOrders, updateOrderStatus }