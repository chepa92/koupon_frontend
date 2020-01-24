const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const reqstctrl = require('../controllers/requestController');


router.get('/getAllReqst', reqstctrl.getAll);
router.get('/getReqst', reqstctrl.getReqst);
// router.get('/searchCoupons', reqstctrl.searchReqst);
// router.put('/', reqstctrl.updateReqst);
// router.delete('/delete', reqstctrl.deleteReqst);
router.post('/', reqstctrl.addReqst); 
// router.put('/closeRqst', reqstctrl.closeReqst);

module.exports = router;
