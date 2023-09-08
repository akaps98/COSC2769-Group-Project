const express = require("express");
const router = express.Router();

const productController = require('../controllers/productController');

router.post("/browseProductBySearching", productController.browseByTitle);
router.post("/browseProductByFiltering", productController.browseByCategory);
router.post("/filterByAlpabeticalOrder", productController.filterByAlpabeticalOrder);
router.post("/filterByReversedAlpabeticalOrder", productController.filterByReversedAlpabeticalOrder);
router.post("/filterByLatestDateAdded", productController.filterByLatestDateAdded);
router.post("/filterByOldestDateAdded", productController.filterByOldestDateAdded);
router.post("/filterByHighPrice", productController.filterByHighPrice);
router.post("/filterByLowPrice", productController.filterByLowPrice);
router.post("/filterPrice", productController.filterPrice);
router.post("/findProduct", productController.findProduct);

module.exports = router;