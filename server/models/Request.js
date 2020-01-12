const mongoose = require('mongoose');
const user = require('./User');
const Schema = mongoose.Schema;

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

const requestSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The request title is required'],
    },
    requestSummery: String,
    categories: [
      {
        type: String,
        enum: category,
      },
    ],
    brand: String,
    publisher: String,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    views: Number,
    like: Number,
  },
  { collection: 'requests' }
);

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
