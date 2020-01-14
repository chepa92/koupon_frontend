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
    const id = req.query.id;

    const result = await Coupon.findOne({ _id: id });

    if (result) res.json(result);
    else res.status(404).send('error: Coupon not found');
  },

  async searchCoupons(req, res, next) {
    const text = req.query.text;
    const category = req.query.category;
    console.log(req.query.text);
    // const result = await Coupon.find({ categories: { $in: [category, text] } });
    const result = await Coupon.find({
      $or: [
        { categories: { $in: [text, category] } },
        // { title: { $regex: [text, category] } },
        { brand: { $in: [text, category] } },
        { title: { $in: [text, category] } },
        { couponName: { $in: [text, category] } },
      ],
    });

    if (result) res.json(result);
    else res.status(404).send('error: Coupon not found');
  },
};
