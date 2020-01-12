const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coupon = require('./Coupon');

const genderValues = ['Male', 'Female'];

const rankLevel = ['firstLevel', 'secondLevel', 'therdLevel'];

const userSchema = new Schema(
  {
    admin: {
      type: Boolean,
      default: 0,
    },
    username: {
      type: String,
      required: [true, 'User Name is required'],
      index: 1,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
    email: String,
    age: Number,
    gender: {
      type: String,
      enum: genderValues,
    },
    img: String,
    starsLevel: {
      type: String,
      enum: rankLevel,
      default: rankLevel[0],
    },
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

userSchema.path('age').validate(obj => obj > 18, 'Age must be above 18!');

const User = mongoose.model('User', userSchema);
module.exports = User;
