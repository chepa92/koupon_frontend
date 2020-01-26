const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryName = [
  'Shoes',
  'Phones',
  'Home Automation & Security',
  'Headphones',
  'TVs',
  'Portable & Wireless Speakers',
  'PlayStation 4',
  'Laptops',
  'iPad and Tablets',
  'Desktop Computers',
  'Fitness',
  'Clothes',
  'Cameras',
];

var Category = new Schema(
  {
    name: {
      type: String,
      enum: categoryName,
    },
    id: String,
  },
  { collection: 'categories' }
);

module.exports = Category;
