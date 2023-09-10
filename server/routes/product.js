const express = require("express");
const router = express.Router();

const productController = require('../controllers/productController');

router.post("/browseProductBySearching", productController.browseByTitle);
router.post("/browseProductByFiltering", productController.browseByCategory);
router.post("/findProduct", productController.findProduct);

module.exports = router;