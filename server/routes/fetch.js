const express = require('express');
const router = express.Router();
const fetchController = require('../controllers/fetchController');

router.get('/', fetchController.root);
router.get('/allCustomers', fetchController.allCustomers);
router.get('/allSellers', fetchController.allSellers)
router.get('/allProducts', fetchController.allProducts)
router.get('/allOrders', fetchController.allOrders)
router.get('/allCategories', fetchController.allCategories)

module.exports = router;