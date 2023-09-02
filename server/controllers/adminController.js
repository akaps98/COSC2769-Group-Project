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
                FROM products p
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
    const CategoryID = req.body.CategoryID;
    database.query(`WITH RECURSIVE Hierarchy AS (
        SELECT 
            CategoryID, 
            name, 
            parentID, 
            JSON_ARRAY(CategoryID) AS hierarchy
        FROM categories
        WHERE parentID IS NULL
        UNION ALL
        SELECT 
            c.CategoryID, 
            c.name, 
            c.parentID, 
            JSON_ARRAY_APPEND(hierarchy, '$', c.CategoryID)
        FROM categories c
        JOIN Hierarchy ON c.parentID = Hierarchy.CategoryID
      )
      SELECT GROUP_CONCAT(CategoryID) As CategoryIDs
      FROM Hierarchy
      WHERE JSON_CONTAINS(hierarchy, ?)`, [CategoryID.toString()], (Verr, Vresult) => {
        if (Verr) {
            return res.send({ err: Verr });
        } 
        const categoryIDsToDelete = Vresult[0].CategoryIDs.split(',').map(Number);
        database.query('DELETE FROM categories WHERE CategoryID IN (?)', [categoryIDsToDelete], (err, result) => {
            if (err) {
              return res.send({ err: err })
            }
            return res.send({ message: "Category deleted successfully!" })
        });
    });
}

const createCategory = (req, res) => {
    const parentID = req.body.parentID;
    const name = req.body.newName;
    
    const query = parentID === null
        ? 'SELECT * FROM categories WHERE parentID IS NULL AND BINARY name = ?'
        : 'SELECT * FROM categories WHERE parentID = ? AND BINARY name = ?';
    const queryParams = parentID === null ? [name] : [parentID, name];

    database.query(query, queryParams, (Verr, Vresult) => {
        if (Verr) {
            return res.send({ err: Verr });
        } 
        if (Vresult.length === 0) {
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
    const CategoryID = req.body.CategoryID;
    const name = req.body.newName;
    database.query('SELECT * FROM categories WHERE parentID = ? AND BINARY(name) = ?', [parentID, name], (Verr, Vresult) => {
        if (Verr) {
            return res.send({ err: Verr });
        } 
        if (Vresult.length===0) {
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