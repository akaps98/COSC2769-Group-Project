const database = require("../config/database");

const allCategories = (req, res) => {
    database.query("SELECT * FROM categories", (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
};

const deleteCategory = (req, res) => {
    const CategoryID = req.body.categoryId;
    database.query('DELETE FROM categories WHERE CategoryID = ?', CategoryID, (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            return res.send({ message: 'category deleted successfully!' });
        }
    });
}

const createCategory = (req, res) => {
    const name = req.body.name;
    const parentID = req.body.parentID;
    database.query('INSERT INTO categories (name, parentID) VALUES (?,?)', [name, parentID], (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            return res.send({ message: 'New category inserted successfully!' });
        }
    });
}

const updateCategory = (req, res) => {
    const CategoryID = req.body.categoryId;
    const name = req.body.name;
    database.query('UPDATE categories SET name = ? WHERE ProductID = ?', [name,CategoryID], (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            return res.send({ message: 'Category updated successfully!' });
        }
    });
}


const updateSellerStatus = (req, res) => {
    const SellerID = req.body.sellerId;
    const status = req.body.status;
    database.query('UPDATE sellers SET status = ? WHERE SellerID = ?', [status,SellerID], (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            return res.send({ message: 'Seller status updated successfully!' });
        }
    });
}

module.exports = { allCategories, deleteCategory, createCategory, updateCategory, updateSellerStatus };