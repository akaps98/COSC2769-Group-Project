const database = require("../config/database");

const allCategories = (req, res) => {
    database.query(
        `WITH RECURSIVE Hierarchy AS (
            SELECT 
                CategoryID, 
                name, 
                parentID, 
                JSON_ARRAY(name) AS hierarchy
            FROM categories
            WHERE parentID IS NULL
            UNION ALL
            SELECT 
                c.CategoryID, 
                c.name, 
                c.parentID, 
                JSON_ARRAY_APPEND(hierarchy, '$', c.name)
            FROM categories c
            JOIN Hierarchy ON c.parentID = Hierarchy.CategoryID
        )
        SELECT
            h.CategoryID,
            h.name,
            h.parentID,
            h.hierarchy,
            (
                SELECT COUNT(*)
                FROM fullstackdev14_db.products p
                WHERE JSON_CONTAINS(p.category, h.hierarchy, '$')
            ) AS count
        FROM Hierarchy h
        ORDER BY h.CategoryID`, (err, result) => {
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
    const parentID = req.body.parentID;
    const name = req.body.name;
    database.query('SELECT * FROM categories WHERE parentID = ? AND name = ?', [parentID, name], (Verr, Vresult) => {
        if (Verr) {
            return res.send({ err: Verr });
        } 
        if (Vresult.length==0) {
            database.query('INSERT INTO categories (name, parentID) VALUES (?,?)', [name, parentID], (err, result) => {
                if (err) {
                    return res.send({ err: err });
                } else {
                    return res.send({ message: 'New category inserted successfully!' });
                }
            });
        } else {
            return res.send("Category name already exists! Choose another one.")
        }
    });
};

const updateCategory = (req, res) => {
    const parentID = req.body.parentID;
    const CategoryID = req.body.categoryId;
    const name = req.body.name;
    database.query('SELECT * FROM categories WHERE parentID = ? AND name = ?', [parentID, name], (Verr, Vresult) => {
        if (Verr) {
            return res.send({ err: Verr });
        } 
        if (Vresult.length==0) {
            database.query('UPDATE categories SET name = ? WHERE CategoryID = ?', [name,CategoryID], (err, result) => {
                if (err) {
                    return res.send({ err: err });
                } else {
                    return res.send({ message: 'Category updated successfully!' });
                }
            });
        } else {
            return res.send("Category name already exists! Choose another one.")
        }
    });
};


const updateSellerStatus = (req, res) => {
    const SellerID = req.body.SellerID;
    const status = req.body.newStatus;
    database.query('UPDATE sellers SET status = ? WHERE SellerID = ?', [status,SellerID], (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            return res.send({ message: 'Seller status updated successfully!' });
        }
    });
}

module.exports = { allCategories, deleteCategory, createCategory, updateCategory, updateSellerStatus };