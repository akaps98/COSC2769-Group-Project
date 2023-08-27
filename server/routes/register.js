const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/customer', registerController.handleCustomerRegister);
router.post('/seller', registerController.handleSellerRegister);

module.exports = router;