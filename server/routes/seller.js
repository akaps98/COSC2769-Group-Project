const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const upload = sellerController.multerMiddleware();

router.post('/allProducts', sellerController.allProducts);
router.post('/updateProduct', sellerController.updateProduct);
router.post('/deleteProduct', sellerController.deleteProduct);
router.post('/addProduct', upload.single('image'), sellerController.addProduct);
router.post('/allOrders',sellerController.allOrders);
router.post('/updateOrderStatus',sellerController.updateOrderStatus);

module.exports = router;