const Coupon = require('../models/Coupon');

//some function that publicRouter use;

module.exports = {
  async getAll(req, res, next) {
    Coupon.find()
      .then(coupons => {
        res.json(coupons);
      })
      .catch(err => next(err));
  },

  async getCoupon(req, res, next) {
    const { id = null } = req.params;
    console.log(id);
    const result = await Coupon.findOne({ id });

    if (result) res.json(result);
    else res.status(404).send('error: Coupon not found');
  },
};
