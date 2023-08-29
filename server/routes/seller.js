const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

router.post('/allProducts', sellerController.allProducts);
router.post('/updateProduct', sellerController.updateProduct);
router.post('/deleteProduct', sellerController.deleteProduct);
router.post('/addProduct', sellerController.addProduct);
router.post('/allOrders',sellerController.allOrders);
router.post('/updateOrderStatus',sellerController.updateOrderStatus);

module.exports = router;