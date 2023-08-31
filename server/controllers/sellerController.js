const database = require("../config/database");
const multer = require('multer');
const fs = require('fs');

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
    const seller = req.body.SellerID

    database.query('SELECT * FROM products WHERE BINARY(name) = ? AND SellerID = ? AND ProductID != ?', [name,seller,id], (Verr, Vresult) => {
        if (Verr) {
            return res.send({ err: Verr });
        } 
        if (Vresult.length==0) {
            database.query('UPDATE products SET name = ?, price = ?, description = ?, quantity = ?, category = ? WHERE ProductID = ?', [name,price,description,quantity,category,id], (err, result) => {
                if (err) {
                    return res.send({ err: err });
                } else {
                    return res.send({ message: 'Product updated successfully!' });
                }
            });
        } else {
            return res.send("Product name already exists! Choose another one to update.")
        }
    });
};

const deleteProduct = (req, res) => {
    const id = req.body.id;

    database.query('SELECT imagePath FROM products WHERE ProductID = ?', id, (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            const imagePath = result[0].imagePath;

            fs.unlink(imagePath, (fileErr) => {
                if (fileErr) {
                    console.error('file delete failed', fileErr);
                } else {
                    console.log('file deleted');
                }

                database.query('DELETE FROM products WHERE ProductID = ?', id, (dbErr, dbResult) => {
                    if (dbErr) {
                        return res.send({ err: dbErr });
                    } else {
                        return res.send({ message: 'Product and file deleted successfully!' });
                    }
                });
            });
        }
    });
};

function multerMiddleware(SellerID) {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'imageUploads');
        },
        filename: (req, file, callback) => {
            const now = new Date();
            const filename = `${now.toISOString().replace(/[-:]/g, '').replace('T', '_').slice(0, -5)}_${file.originalname}`;
            callback(null, filename);
        },
    });
    return multer({ storage: storage });
}

const addProduct = async (req, res) => {
    const { name, price, description, category, quantity, dateAdded, SellerID } = req.body;
    const imagePath = req.file.path;

    database.query('SELECT * FROM products WHERE BINARY(name) = ? AND SellerID = ?', [name,SellerID], (Verr, Vresult) => {
        if (Verr) {
            return res.send({ err: Verr });
        } 
        if (Vresult.length==0) {
            database.query('INSERT INTO products (name, price, description, imagePath, category, quantity, dateAdded, SellerID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, price, description, imagePath, category, quantity, dateAdded, SellerID], (err, result) => {
                if (err) {
                    return res.send({ err: err });
                } else {
                    return res.send({ message: 'New data inserted successfully!' });
                }
            });
        } else {
            return res.send("Product name already exists! Choose another one.")
        }
    });
};

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
            FROM orders o 
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


module.exports = { allProducts, updateProduct, deleteProduct, multerMiddleware, addProduct, allOrders, updateOrderStatus }