const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const reqstctrl = require('../controllers/requestController');

router.get('/getAllReqst', reqstctrl.getAll);
router.get('/getReqst', reqstctrl.getReqst);
router.put('/updateRequest', reqstctrl.updateReqst);
router.delete('/deleteRequest', reqstctrl.deleteReqst);
router.post('/addRequest', reqstctrl.addReqst);
router.put('/closeRqst', reqstctrl.closeReqst);

module.exports = router;
