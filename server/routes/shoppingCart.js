const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');

router.post('/findShoppingCart', shoppingCartController.findShoppingCart);
router.post('/updateShoppingCart', shoppingCartController.updateShoppingCart);
router.post('/removeShoppingCart', shoppingCartController.removeShoppingCart);
router.post('/insertToOrder', shoppingCartController.insertToOrder);
router.post('/findQuantity', shoppingCartController.findQuantity);
router.post('/deleteShoppingCart', shoppingCartController.deleteShoppingCart);

module.exports = router;