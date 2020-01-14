const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const { isLoggedIn } = require('../middlewares');

const couponController = require('../controllers/couponController');

<<<<<<< HEAD:server/routes/publicRouter.js
router.get('/getAllCoupons', publicController.getAll);
router.get('/getCoupon', publicController.getCoupon);
router.get('/searchCoupons', publicController.searchCoupons);
=======
router.post('/coupon', isLoggedIn, (req, res, next) => {
  let {
    title,
    couponName,
    discount,
    link,
    categories,
    brand,
    publisher,
  } = req.body;
  Coupon.create({
    title,
    couponName,
    discount,
    link,
    categories,
    brand,
    publisher,
  })
    .then(coupons => {
      res.json({
        success: true,
        coupons,
      });
    })
    .catch(err => next(err));
});

router.get('/getAllCoupons', couponController.getAll);
router.get('/getCoupon', couponController.getCoupon);
>>>>>>> 4619ad237aa961bc5cc0ec75c51219ae62ac31e7:server/routes/couponRouter.js

// router.get('/getAllCoupons', async (req, res, next) => {
//   Coupon.find()
//     .then(coupons => {
//       res.json(coupons);
//     })
//     .catch(err => next(err));
// });

// couponRouter.get('/getCoupon', couponController.getCoupon);
// couponRouter.get('/searchCoupons', couponController.searchCoupon);

// couponRouter.post('/coupon', couponController.addCoupon);
// couponRouter.put('/editCoupon', couponController.editCoupon);
// couponRouter.put('/setCouponInactive', couponController.InactiveCoupon);
// couponRouter.delete('/coupon', couponController.deleteCoupon);

// module.exports = couponRouter;

module.exports = router;