const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

const publicController = require('../controllers/publicController');

router.get('/getAllCoupons', publicController.getAll);
router.get('/getCoupon', publicController.getCoupon);
router.get('/searchCoupons', publicController.searchCoupons);

// router.get('/getAllCoupons', async (req, res, next) => {
//   Coupon.find()
//     .then(coupons => {
//       res.json(coupons);
//     })
//     .catch(err => next(err));
// });

module.exports = router;

// couponRouter.get('/getCoupon', couponController.getCoupon);
// couponRouter.get('/searchCoupons', couponController.searchCoupon);

// couponRouter.post('/coupon', couponController.addCoupon);
// couponRouter.put('/editCoupon', couponController.editCoupon);
// couponRouter.put('/setCouponInactive', couponController.InactiveCoupon);
// couponRouter.delete('/coupon', couponController.deleteCoupon);

// module.exports = couponRouter;
