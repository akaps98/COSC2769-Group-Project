const express = require('express');
const router = express.Router();

const fetchController = require('../controllers/fetchController');

router.get('/', fetchController.root);
router.get('/allUsers', fetchController.allUsers);

module.exports = router;