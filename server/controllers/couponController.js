const Coupon = require('../models/Coupon');
const mongoose = require('mongoose');

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
    console.log(id);
    const result = await Coupon.findOne({ _id: id });

    if (result) res.json(result);
    else res.status(404).send('error: Coupon not found');
  },

  async searchCoupons(req, res, next) {
    const text = req.query.text;
    const category = req.query.category;

    const result = await Coupon.find({
      $or: [
        { categories: { $in: [category, text] } },
        { brand: { $in: [text, category] } },
        { title: { $in: [text, category] } },
        { couponName: { $in: [text, category] } },
      ],
    });

    if (result) res.json(result);
    else res.status(404).send('error: Coupon not found');
  },

  async updateCoupon(req, res, next) {
    const id = req.query.id;
    const body = req.body;

    console.log(id);
    console.log(body);

    const result = await Coupon.updateOne({ _id: id }, body);

    if (result.ok) {
      res.json({ response: 'done' });
    } else {
      res.status(404).send('{error: "Coupon not found"}');
    }
  },

  async addCoupon(req, res, next) {
    let {
      title,
      couponName,
      discount,
      link,
      categories,
      brand,
      publisher = req.user.id,
      currentStatus,
    } = req.body;
    Coupon.create({
      title,
      couponName,
      discount,
      link,
      categories,
      brand,
      publisher,
      currentStatus,
    })
      .then(coupons => {
        res.json({
          success: true,
          coupons,
        });
      })
      .catch(err => next(err));
  },

  async deleteCoupon(req, res, next) {
    const id = req.query.id;

    const result = await Coupon.deleteOne({ _id: id });

    if (result.deletedCount) {
      res.json({ response: 'Coupon deleted' });
    } else {
      res.status(404).send('{error: "no Coupon found"}');
    }
  },

  async disableCoupon(req, res, next) {
    const id = req.query.id;

    const result = await Coupon.updateOne(
      { _id: id },
      { $set: { currentStatus: 'Over' } }
    )
      .then(coupons => {
        res.json({
          success: true,
        });
      })
      .catch(err => next(err));
  },

  async likeCoupon(req, res, next) {
    const id = req.query.id;

    const result = await Coupon.updateOne(
      { _id: id },
      { $addToSet: { like: req.user._id } }
    )
      .then(coupons => {
        res.json({
          success: true,
        });
      })
      .catch(err => next(err));
  },
};
