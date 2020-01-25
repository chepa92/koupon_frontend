const express = require('express');
const router = express.Router();

const couponController = require('../controllers/couponController');

router.get('/getAllCoupons', couponController.getAll);
router.get('/getCoupon', couponController.getCoupon);
router.get('/searchCoupons', couponController.searchCoupons);
router.put('/updateCoupon', couponController.updateCoupon);
router.delete('/delete', couponController.deleteCoupon);
router.post('/addCoupon', couponController.addCoupon); //TODO add isLoggedIn
router.put('/setCouponInactive', couponController.disableCoupon);
router.post('/likeCoupon', couponController.likeCoupon); //TODO add isLoggedIn

module.exports = router;
