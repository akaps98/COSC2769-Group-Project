const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.post("/updateOrderStatus", orderController.updateOrderStatus);
router.post("/findOrder", orderController.findOrder);

module.exports = router;