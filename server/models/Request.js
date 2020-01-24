const mongoose = require('mongoose');
const user = require('./User');
const Schema = mongoose.Schema;

const status = ['Awaiting', 'Closed'];
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
    // date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: status,
      default: status[0],
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    }
  },
  { collection: 'requests' }
);

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
