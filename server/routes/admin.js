const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/allCategories', adminController.allCategories);
router.post('/deleteCategory', adminController.deleteCategory);
router.post('/createCategory', adminController.createCategory);
router.post('/updateCategory', adminController.updateCategory);
router.post('/addAttribute', adminController.addAttribute);
router.post('/deleteAttribute', adminController.deleteAttribute);
router.post('/updateAttribute', adminController.updateAttribute)
router.post('/updateSellerStatus', adminController.updateSellerStatus);

module.exports = router;