const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./Category');

const couponSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The coupon title is required'],
    },
    couponName: {
      type: String,
    },
    discount: {
      type: String,
      required: [true, 'The coupon discount is required'],
    },
    link: {
      type: String,
      required: true,
    },
    skuId: String,
    categories: [Category],
    brand: String,
    publisher: Object,
    publisherImg: String,
    priceHistory: [{ price: Number, url: String, date: Date, _id: false }],
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
