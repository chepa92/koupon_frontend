const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin, isPermitted } = require('../middlewares');

const couponController = require('../controllers/couponController');

router.get('/getAllCoupons', couponController.getAll);
router.get('/getCoupon', couponController.getCoupon);
router.get('/searchCoupons', couponController.searchCoupons);
router.put('/updateCoupon', couponController.updateCoupon);
router.delete('/delete', couponController.deleteCoupon);
router.post('/addCoupon', couponController.addCoupon); //TODO add isLoggedIn
router.put('/setCouponInactive', couponController.disableCoupon);

// router.post('/coupon', isLoggedIn, (req, res, next) => {
//   let {
//     title,
//     couponName,
//     discount,
//     link,
//     categories,
//     brand,
//     publisher,
//   } = req.body;
//   Coupon.create({
//     title,
//     couponName,
//     discount,
//     link,
//     categories,
//     brand,
//     publisher,
//   })
//     .then(coupons => {
//       res.json({
//         success: true,
//         coupons,
//       });
//     })
//     .catch(err => next(err));
// });

// couponRouter.post('/coupon', couponController.addCoupon);
// couponRouter.put('/editCoupon', couponController.editCoupon);
// couponRouter.put('/setCouponInactive', couponController.InactiveCoupon);
// couponRouter.delete('/coupon', couponController.deleteCoupon);

// module.exports = couponRouter;

module.exports = router;
