const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getAllUsers', userController.getAll);
router.get('/getUser', userController.getUser);
router.get('/getUserPub', userController.getUserPub);
router.put('/updateUser', userController.updateUser);
router.put('/suspendUser', userController.suspendUser);
router.post('/user', userController.addUser);
router.delete('/deleteUser', userController.getAll);

module.exports = router;
