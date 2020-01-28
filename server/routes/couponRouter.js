const express = require('express');
const router = express.Router();

const couponController = require('../controllers/couponController');

router.get('/getAllCoupons', couponController.getAll);
router.get('/getCoupon', couponController.getCoupon);
router.get('/searchCoupons', couponController.searchCoupons);
router.put('/updateCoupon', couponController.updateCoupon);
router.delete('/deleteCoupon', couponController.deleteCoupon);
router.post('/addCoupon', couponController.addCoupon);
router.put('/setCouponInactive', couponController.disableCoupon);
router.post('/likeCoupon', couponController.likeCoupon);
router.post('/commentCoupon', couponController.commentCoupon);
router.post('/notifyCoupon', couponController.notifyCoupon);
router.get('/priceHistory', couponController.priceHistory);

module.exports = router;
