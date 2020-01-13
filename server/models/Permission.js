const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role = ['public', 'user', 'admin'];

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: role,
    },
    path: {
      type: String,
    },
  },
  { collection: 'permissions' }
);

const Permission = mongoose.model('Permission', userSchema);
module.exports = Permission;
