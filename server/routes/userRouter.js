const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

const userController = require('../controllers/userController');

module.exports = router;
