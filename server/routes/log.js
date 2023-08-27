const express = require("express");
const router = express.Router();

const logInOutController = require('../controllers/logInOutController');

router.post("/in", logInOutController.handleLogIn);
router.get("/out", logInOutController.handleLogOut);

module.exports = router;