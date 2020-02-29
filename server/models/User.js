const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coupon = require('./Coupon');

const genderValues = ['Male', 'Female'];
const level = [0, 1, 2, 3];

const userSchema = new Schema(
  {
    admin: {
      type: Boolean,
      default: 0,
    },
    username: {
      type: String,
      required: [true, 'User Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
    email: String,
    telegram: Number,
    telegram_notify: Boolean,
    age: Number,
    gender: {
      type: String,
      enum: genderValues,
    },
    img: String,
    active: Boolean,
    postedCoupons: [Object],
    userLevel: {
      type: Number,
      enum: level,
      default: level[0],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
  { collection: 'users' }
);

userSchema.path('age').validate(obj => obj > 18, 'Age must be above 18!');

const User = mongoose.model('User', userSchema);
module.exports = User;
