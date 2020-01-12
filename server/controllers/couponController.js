const Coupon = require('../models/Coupon');

module.exports = {
  getAllCoupons(req, res, next) {
    res.send('all Coupons');
  },
};
