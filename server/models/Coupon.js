const mongoose = require('mongoose');
//const User = require('./User');
const Schema = mongoose.Schema;
const Category = require('./Category');

//****TODO - move to DB
const status = ['Active', 'Pending', 'Over'];

const couponSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The coupon title is required'],
    },
    couponName: {
      type: String,
      required: [true, 'The coupon name is required'],
    },
    discount: String,
    link: {
      type: String,
      required: true,
    },
    bestLink: {
      type: String,
      required: true,
    },
    categories: [Category],
    brand: String,
    publisher: Object,
    priceHistory: [Object],
    imgUrl: String,
    views: [Object],
    like: [Object],
    comments: [Object],
    notify: [Object],
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
  { collection: 'coupons' }
);

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
