const mongoose = require('mongoose');
//const User = require('./User');
const Schema = mongoose.Schema;

//TODO - move to DB
const category = [
  'Shoes',
  'Clothes',
  'Make Up',
  'Computers',
  'Phones',
  'Electronics',
  'Music',
  'Man',
  'Women',
  'Sports',
];

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
    categories: [
      {
        type: String,
        enum: category,
      },
    ],
    brand: String,
    publisher: String,
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // },
    views: Number,
    like: Number,
  },
  { collection: 'coupons' }
);

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
