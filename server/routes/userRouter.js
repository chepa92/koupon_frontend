const express = require('express');
const { isLoggedIn, isAdmin, isPermitted } = require('../middlewares');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/getAllUsers', userController.getAll);
router.get('/user', userController.getUser);
router.put('/updateUser', userController.updateUser);
router.put('/suspendUser', userController.suspendUser);
router.post('/user', userController.addUser);
router.delete('/deleteUser', userController.getAll);

module.exports = router
