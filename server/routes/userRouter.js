const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const Coupon = require('../models/Coupon');

router.post('/coupon', isLoggedIn ,(req, res, next) => {
  let { title, couponName, discount, link, categories, brand, publisher } = req.body;
  Coupon.create({ title, couponName, discount, link, categories, brand, publisher })
    .then(coupons => {
      res.json({
        success: true,
        coupons,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
