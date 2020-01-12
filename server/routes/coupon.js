const { Router } = require('express');
const { couponController } = require('../controllers/couponController');

const couponRouter = new Router();

couponRouter.get('/getAllCoupons', couponController.getAllCoupons);
couponRouter.get('/getCoupon', couponController.getCoupon);
couponRouter.get('/searchCoupons', couponController.searchCoupon);

couponRouter.post('/coupon', couponController.addCoupon);
couponRouter.put('/editCoupon', couponController.editCoupon);
couponRouter.put('/setCouponInactive', couponController.InactiveCoupon);
couponRouter.delete('/coupon', couponController.deleteCoupon);

module.exports = couponRouter;
