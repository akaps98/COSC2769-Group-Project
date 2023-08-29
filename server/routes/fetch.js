const express = require('express');
const router = express.Router();

const fetchController = require('../controllers/fetchController');

router.get('/', fetchController.root);
router.get('/allProducts', fetchController.allProducts);
router.get('/allCategories', fetchController.allCategories);
router.get('/allCustomers', fetchController.allCustomers);

module.exports = router;