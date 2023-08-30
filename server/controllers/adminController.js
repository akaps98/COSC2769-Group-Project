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
}

const createCategory = (req, res) => {
    const category = req.body;
}

const updateCategory = (req, res) => {
    const CategoryID = req.body.categoryId;
}


const updateSellerStatus = (req, res) => {
    const SellerID = req.body.sellerId;
}

module.exports = { allCategories, deleteCategory, createCategory, updateCategory, updateSellerStatus };