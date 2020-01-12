const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coupon = require('./Coupon');

const genderValues = ['Male', 'Female'];

const rankLevel = ['firstLevel', 'secondLevel', 'therdLevel'];

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
    email: String,
    age: Number,
    gender: {
      type: String,
      enum: genderValues,
    },
    img: String,
    orders: [coupon],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
